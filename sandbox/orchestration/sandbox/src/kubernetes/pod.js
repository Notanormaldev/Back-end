import { k8sApi } from "./config.js";
import { NAMESPACE } from "../utils/constant.js";

export const createPod = async (sandboxId, s3Bucket) => {
    const podManifest = {
        metadata: {
            name: `sandbox-pod-${sandboxId}`,
            namespace: NAMESPACE,
            labels: {
                app: `sandbox-pod-${sandboxId}`,
            },
        },
        spec: {
            // ── Init container: block Vite + agent until /app is populated ──
            // Problem: sync-sidecar and main containers start simultaneously.
            // emptyDir wipes /app, so Vite would start with no files.
            // This init container polls until sync-sidecar seeds /app, then exits.
            initContainers: [
                // ── Step 1: seed /app from S3 or template, then exit ──────────
                // Runs BEFORE Vite and agent start — no deadlock
                {
                    name: `sync-init-${sandboxId}`,
                    image: "sandbox-sync:latest",
                    imagePullPolicy: "IfNotPresent",
                    command: [ "node", "seed.js" ],   // separate script, just seeds and exits
                    volumeMounts: [ { name: "code-volume", mountPath: "/app" } ],
                    env: [
                        { name: "SANDBOX_ID", value: sandboxId },
                        { name: "S3_BUCKET", value: s3Bucket },
                        { name: "AWS_DEFAULT_REGION", value: "ap-southeast-1" },
                        {
                            name: "AWS_ACCESS_KEY_ID",
                            valueFrom: { secretKeyRef: { name: "aws-credentials", key: "AWS_ACCESS_KEY_ID" } }
                        },
                        {
                            name: "AWS_SECRET_ACCESS_KEY",
                            valueFrom: { secretKeyRef: { name: "aws-credentials", key: "AWS_SECRET_ACCESS_KEY" } }
                        },
                    ],
                    resources: {
                        limits: { cpu: "200m", memory: "256Mi" },
                        requests: { cpu: "100m", memory: "128Mi" },
                    },
                }
            ],
            containers: [
                // ── Vite preview ──────────────────────────────────────────────
                {
                    name: `sandbox-container-${sandboxId}`,
                    image: "template:latest",
                    imagePullPolicy: "IfNotPresent",
                    command: [ "npm", "run", "dev" ],
                    ports: [ { containerPort: 5173 } ],
                    volumeMounts: [ { name: "code-volume", mountPath: "/workspace" } ],
                    resources: {
                        limits: { cpu: "500m", memory: "512Mi" },
                        requests: { cpu: "250m", memory: "256Mi" },
                    },
                },
                // ── Comm agent — NO AWS creds ─────────────────────────────────
                {
                    name: `sandbox-agent-${sandboxId}`,
                    image: "sandbox-agent:latest",
                    imagePullPolicy: "IfNotPresent",
                    command: [ "node", "server.js" ],
                    ports: [ { containerPort: 3000 } ],
                    volumeMounts: [ { name: "code-volume", mountPath: "/workspace" } ],
                    resources: {
                        limits: { cpu: "500m", memory: "512Mi" },
                        requests: { cpu: "250m", memory: "256Mi" },
                    },
                },
                // ── Sync watcher — AWS creds ONLY here ───────────────────────
                {
                    name: `sync-sidecar-${sandboxId}`,
                    image: "sandbox-sync:latest",
                    imagePullPolicy: "IfNotPresent",
                    command: [ "node", "watch.js" ],  // separate script, just watches
                    volumeMounts: [ { name: "code-volume", mountPath: "/workspace" } ],
                    env: [
                        { name: "SANDBOX_ID", value: sandboxId },
                        { name: "S3_BUCKET", value: s3Bucket },
                        { name: "AWS_DEFAULT_REGION", value: "ap-southeast-1" },
                        {
                            name: "AWS_ACCESS_KEY_ID",
                            valueFrom: { secretKeyRef: { name: "aws-credentials", key: "AWS_ACCESS_KEY_ID" } }
                        },
                        {
                            name: "AWS_SECRET_ACCESS_KEY",
                            valueFrom: { secretKeyRef: { name: "aws-credentials", key: "AWS_SECRET_ACCESS_KEY" } }
                        },
                    ],
                    resources: {
                        limits: { cpu: "100m", memory: "128Mi" },
                        requests: { cpu: "50m", memory: "64Mi" },
                    },
                },
            ],
            // ── Single shared emptyDir volume ─────────────────────────────────
            // All 3 containers + init container mount this at /app
            volumes: [
                {
                    name: "code-volume",
                    emptyDir: {}
                }
            ]
        }
    };

    try {
        const response = await k8sApi.createNamespacedPod({
            namespace: NAMESPACE,
            body: podManifest,
        });
        console.log("Pod created:", response.metadata.name);
        return response;
    } catch (err) {
        console.error("Error creating pod:", err);
        throw err;
    }
};