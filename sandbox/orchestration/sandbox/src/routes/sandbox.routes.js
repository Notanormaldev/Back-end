import { Router } from "express";
import { createPod } from "../kubernetes/pod.js";
import { createService, createSandboxIngress } from "../kubernetes/service.js";
import { v7 as uuid } from "uuid";

const router = Router();

router.get("/health", (req, res) => {
    res.json({ message: "Sandbox API is healthy" });
});

router.post("/start", async (req, res) => {
    const sandboxId = uuid();
    const s3Bucket = process.env.S3_BUCKET;

    if (!s3Bucket) {
        return res.status(500).json({ error: "S3_BUCKET env var is not set" });
    }

    try {
        const podResult = await createPod(sandboxId, s3Bucket);
        const serviceResult = await createService(sandboxId);
        const urls = await createSandboxIngress(sandboxId);

        res.json({
            sandboxId,
            pod: podResult?.metadata?.name,
            service: serviceResult?.response?.metadata?.name,
            urls,
        });
    } catch (err) {
        console.error("Error starting sandbox:", err);
        res.status(500).json({ error: err.message });
    }
});

export default router;