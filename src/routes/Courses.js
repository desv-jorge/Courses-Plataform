const express = require("express");
const Course = require("../models/Course"); 
const { upload } = require("../middlewares/cloudinary"); 
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar cursos" });
  }
});

router.post("/", upload.single("img"), async (req, res) => {
  try {
    let uploadedImage = req.file ? req.file.path : req.body.img; 

    const course = new Course({
      title: req.body.title,
      video: req.body.video,
      img: uploadedImage,
      desc: req.body.desc,
      author: req.body.author,
    });

    await course.save();
    return res.status(201).json(course);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar curso" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ error: "Curso não encontrado" });
    }

    if (course.img) {
      const publicId = course.img.split('/').pop().split('.')[0];  

      const result = await cloudinary.uploader.destroy(publicId);

      if (result.result !== 'ok') {
        return res.status(500).json({ error: "Erro ao deletar a imagem do Cloudinary" });
      }
    }

    await Course.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Curso e imagem deletados com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao deletar curso e imagem" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar curso" });
  }
});

module.exports = router;
