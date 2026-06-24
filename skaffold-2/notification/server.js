import express from "express";
import morgan from "morgan";


const app = express();
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("Hello, World! This is the Notification Service......");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}   );