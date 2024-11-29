require('dotenv').config(); // No início do arquivo

const port = process.env.PORT || 3001;
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI).then(() => {
    console.log("MongoDB connected");
}).catch((error) => {
    console.log("Error connecting to MongoDB: ", error);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


const Course = mongoose.model('Courses', {
    title: String,
    video: String,
    img: String,
    desc: String,
    author : String
})

app.get("/", async(req, res)=>{
    const courses = await Course.find();
    return res.send(courses)
})

app.post("/", async(req, res)=>{
    const course = new Course({
        title: req.body.title,
        video: req.body.video,
        img: req.body.img,
        desc: req.body.desc,
        author : req.body.author

    })
    await course.save();
    return res.send(course)
})

app.delete("/:id", async(req,res)=>{
    const course = await Course.findByIdAndDelete(req.params.id);
    return res.send(course)
})

app.put("/:id", async(req, res)=>{
    const course = await Course.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        video: req.body.video,
        img: req.body.img,
        desc: req.body.desc,
        author : req.body.author
    })
    return res.send(course)
})