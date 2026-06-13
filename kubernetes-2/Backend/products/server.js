import express from "express";
import morgan from "morgan";


const app = express();
app.use(morgan("dev"));

app.get("/products", async (req, res) => {
    const response = await axios.get('http://main-server-service/');
    res.json(response.data);
});
   

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});