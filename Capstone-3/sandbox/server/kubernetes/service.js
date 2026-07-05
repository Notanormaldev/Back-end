import { k8sCoreV1Api } from "./config.js";

export async function createservice(sandboxid){

    const servicemanifest={
        apiVersion:"v1",
        kind:"Service",
        metadata:{
            name:`sandbox-service-${sandboxid}`,
            labels:{
                app:"sandbox",
                sandboxid:sandboxid
            }
        },
        spec:{
            selector:{
                app:"sandbox",
                sandboxid:sandboxid
            },
            ports:[
                {
                    protocol:"TCP",
                    port:80,
                    name:"http",
                    targetPort:5173,
                    
                }
            ],
            type:"ClusterIP"
        }
    }

    const res=await k8sCoreV1Api.createNamespacedService({
        namespace:"default",
        body:servicemanifest
    })

    return res

}
