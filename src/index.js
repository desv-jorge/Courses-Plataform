const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const port = 3001;


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

app.listen(port, ()=> {
    try{
        mongoose.connect('mongodb+srv://JORGE:dnwEOBcWfowp3ti3@users.eex4ctv.mongodb.net/?retryWrites=true&w=majority&appName=Users')
    }catch(erro){
        console.log(erro)
    }
    console.log("tá rodando")})