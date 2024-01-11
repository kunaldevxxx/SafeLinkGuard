const express = require("express");
const {  connectToMongoDB } = require("./connect");
const urlRoute=require("./routes/url");
const app=express();
const PORT=8001;
connectToMongoDB('mongodb://0.0.0.0:27017/short-url')
.then(()=>console.log("MongoDB Connected"));
app.use(express.json());
app.use("/url",urlRoute);

app.listen(PORT,()=>console.log(`Server Started at PORT: ${PORT}`))