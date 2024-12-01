import React, { useEffect, useState } from "react";
import "./addCourse.scss";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { Footer } from "@/Components/Footer";
import CoursesAddList from "@/Components/ListCourses";

// Atualize a interface Course para permitir que img seja File | string | null
interface Course {
  title: string;
  video: string;
  img: File | string | null;  // Permite File, string (URL) ou null
  desc: string;
  author: string;
  id?: string;
}

export default function Teste() {
  const [formData, setFormData] = useState<Course>({
    title: "",
    video: "",
    img: null,  // inicializando como null
    desc: "",
    author: "",
  });

  const [message, setMessage] = useState<string>("");
  const [submittedData, setSubmittedData] = useState<Course[]>([]);

  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        setMessage("");
      }, 2000); 

      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  // Modificação no handleChange para lidar com o campo de imagem
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Verifica se o campo é 'img' e se o arquivo está presente
    if (name === "img" && (e.target as HTMLInputElement).files) {
      const file = (e.target as HTMLInputElement).files![0];  // Assegura que existe um arquivo
      setFormData((prev) => ({ ...prev, img: file }));  // Armazena o arquivo temporariamente no estado
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Lógica de envio de dados com imagem para o servidor
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");

    // Validação do formulário
    if (!formData.title || !formData.video || !formData.img || !formData.desc || !formData.author) {
      setMessage("Todos os campos devem ser preenchidos.");
      console.log("Campos do formulário:", formData); // Adicionando log dos campos
      return;
    }

    if (formData.desc.length < 100) {
      setMessage("A descrição deve conter no mínimo 100 caracteres.");
      console.log("Descrição muito curta:", formData.desc.length); // Log da descrição
      return;
    }

    const isDuplicate = submittedData.some(
      (data) =>
        data.title === formData.title &&
        data.video === formData.video &&
        data.img === formData.img &&
        data.desc === formData.desc &&
        data.author === formData.author
    );

    if (isDuplicate) {
      setMessage("Este conjunto de dados já foi enviado anteriormente.");
      console.log("Dados duplicados:", formData); // Log de dados duplicados
      return;
    }

    try {
      let imgUrl = "";
      // Caso tenha imagem, envie o arquivo para o servidor
      if (formData.img instanceof File) {  // Verifica se img é um File
        const formDataImg = new FormData();
        formDataImg.append("file", formData.img);
        formDataImg.append("upload_preset", "my_preset"); // Substitua por seu preset no Cloudinary

        // Envia a imagem para o Cloudinary (usar localhost:3001 no backend)
        const responseImg = await axios.post("https://api.cloudinary.com/v1_1/detpaq6iw/image/upload", formDataImg);
        imgUrl = responseImg.data.secure_url;  // URL da imagem carregada
      } else if (typeof formData.img === "string") {
        imgUrl = formData.img;  // Caso já seja uma URL, apenas use a string
      }

      const newCourse = { ...formData, img: imgUrl || null };

      // Verificando antes de enviar para a API
      console.log("Dados para enviar:", newCourse);

      // Envia os dados para a API no localhost:3001
      const response = await axios.post("https://courses-plataform.onrender.com/", newCourse);

      setSubmittedData((prev) => [...prev, newCourse]);

      setFormData({
        title: "",
        video: "",
        img: null,  // Resetando o campo de imagem para null
        desc: "",
        author: "",
      });

      setMessage("Dados enviados com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar dados:", error); // Log de erro
      setMessage("Ocorreu um erro ao enviar os dados. Tente novamente.");
    }
  };

  return (
    <div id="pageMain">
      <nav>
        <div></div>
        <h1>Cursos Tech Gratuitos</h1>
        <Link className="button" href="/">
          Ver cursos
          <FaHome id="icon" />
        </Link>
      </nav>

      <div id="mainSection">
        <section>
          <div className="divForm">
            <h2>Envie seu vídeo/curso tech aqui</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="title">Título do vídeo</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="video">Link do Vídeo</label>
                <input
                  type="text"
                  name="video"
                  value={formData.video}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="img">Imagem</label>
                <input
                  type="file" 
                  name="img"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="desc">Descrição (mínimo 100 caracteres)</label>
                <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  rows={4}
                  style={{
                    height: "150px",
                    width: "98%",
                    resize: "none",
                  }}
                ></textarea>
              </div>
              <div>
                <label htmlFor="author">Seu nome</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="button" style={{ height: "35px", width: "100px" }}>
                Enviar
              </button>
            </form>
            {message && (
              <p style={{ color: message.includes("sucesso") ? "#00ff00" : "#ff0000" }}>
                {message}
              </p>
            )}
          </div>
        </section>
        <div id="listaDiv">
          <h1>Dados dos Cursos Enviados</h1>
          <CoursesAddList />
        </div>
      </div>
      <Footer />
    </div>
  );
}
