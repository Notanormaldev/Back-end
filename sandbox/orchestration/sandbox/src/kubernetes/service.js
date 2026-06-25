import { k8sApi, k8sNetworkingApi } from "./config.js";
import { NAMESPACE } from "../utils/constant.js";

export const createService = async (sandboxId) => {
    const serviceManifest = {
        metadata: {
            name: `sandbox-service-${sandboxId}`,
            namespace: NAMESPACE,
        },
        spec: {
            selector: {
                app: `sandbox-pod-${sandboxId}`,
            },
            ports: [
                {
                    name: "agent-http",
                    protocol: "TCP",
                    port: 3000,
                    targetPort: 3000,
                },
                {
                    name: "vite-http",
                    protocol: "TCP",
                    port: 5173,
                    targetPort: 5173,
                }
            ],
            type: "NodePort",
        }
    };

    try {
        const response = await k8sApi.createNamespacedService({
            namespace: NAMESPACE,
            body: serviceManifest,
        });
        return { response };
    } catch (error) {
        console.error("Error creating service:", error);
        throw error;
    }
};

export const createSandboxIngress = async (sandboxId) => {
    const previewHost = `${sandboxId}.preview.localhost`;
    const agentHost = `${sandboxId}.agent.localhost`;

    const ingressManifest = {
        metadata: {
            name: `sandbox-ingress-${sandboxId}`,
            namespace: NAMESPACE,
            annotations: {
                "nginx.ingress.kubernetes.io/proxy-read-timeout": "3600",
                "nginx.ingress.kubernetes.io/proxy-send-timeout": "3600",
                "nginx.ingress.kubernetes.io/proxy-http-version": "1.1",
            },
        },
        spec: {
            ingressClassName: "nginx",
            rules: [
                // Vite preview
                {
                    host: previewHost,
                    http: {
                        paths: [
                            {
                                pathType: "Prefix",
                                path: "/",
                                backend: {
                                    service: {
                                        name: `sandbox-service-${sandboxId}`,
                                        port: { number: 5173 },
                                    },
                                },
                            },
                        ],
                    },
                },
                // Comm agent + Socket.io
                {
                    host: agentHost,
                    http: {
                        paths: [
                            {
                                pathType: "Prefix",
                                path: "/",
                                backend: {
                                    service: {
                                        name: `sandbox-service-${sandboxId}`,
                                        port: { number: 3000 },
                                    },
                                },
                            },
                        ],
                    },
                },
            ],
        },
    };

    try {
        await k8sNetworkingApi.createNamespacedIngress({
            namespace: NAMESPACE,
            body: ingressManifest,
        });
        return {
            previewUrl: `http://${previewHost}`,
            agentUrl: `http://${agentHost}`,
        };
    } catch (err) {
        console.error("Error creating ingress:", err);
        throw err;
    }
};