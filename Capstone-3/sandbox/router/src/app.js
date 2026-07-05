import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import morgan from "morgan";

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(morgan("dev"))
app.get("/api/router/health",(req,res)=>{
    res.send("Router API is running")
})

const proxies={}
function getproxy(sandboxid){
    const target=`http://sandbox-service-${sandboxid}`

    if(!proxies[sandboxid]){
        proxies[sandboxid]=createProxyMiddleware({
            target,
            changeOrigin:true,
            ws:true
        })
    }
    return proxies[sandboxid]
}

app.use((req, res, next) => {
    const host = req.headers.host

    const sandboxid = host.split('.')[0]


    if(host.split('.')[1]=="agent"){
        // return getagentproxy(sandboxid)(req,res,next);
    }else{

        return getproxy(sandboxid)(req,res,next);
    }

})



export default app;