import 'dotenv/config'
import Redis from "ioredis";
import mongoose from "mongoose";
import morgan from "morgan";
import Usermodel from "./model/user.model.js";
import express from 'express'



// -- Mongoose
async function mongooseConnect() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}


mongooseConnect();



// -- Redis
const redis = new Redis(process.env.REDIS_URI);


redis.once("connect", () => {
    console.log("Connected to Redis");
})

redis.once("error", (err) => {
    console.log(err);
});



const app = express();
app.use(express.json())
app.use(morgan('dev'))



app.get("/user/:id", async (req, res) => {
    try {
        const usercachesdata = await redis.get(`user:${req.params.id}`)
        if (usercachesdata) {
            return res.status(200).json({ data: JSON.parse(usercachesdata), msg: "data from cache" })
        }


        const founduser = await Usermodel.findById(req.params.id);
        if (!founduser) {
            return res.status(404).json({ error: "User not found" })
        }

        await redis.set(`user:${req.params.id}`, JSON.stringify(founduser), "EX", 120)
        res.status(200).json({ data: founduser, msg: "data from db" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" })
    }

})


app.post("/createuser", async (req, res) => {
    try {
      

        const user = await Usermodel.create(req.body);

        res.status(201).json({ user })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" })
    }
})

app.get('/allusers', async (req, res) => {
    const usercachesdata = await redis.get('users')
    if (usercachesdata) {
        return res.status(200).json({ data: JSON.parse(usercachesdata), msg: "data from cache" })
    }
    const users = await Usermodel.find();
    await redis.set(`users`, JSON.stringify(users), "EX", 120)
    res.status(200).json({ users })
})

app.listen(3000, () => {
    console.log("server is running on port", 3000);
})