import * as k8sapi from '@kubernetes/client-node'

const kc = new k8sapi.KubeConfig();
kc.loadFromDefault();


export const k8sCoreV1Api = kc.makeApiClient(k8sapi.CoreV1Api);
