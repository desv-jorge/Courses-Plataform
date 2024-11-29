import React, { useEffect, useState } from "react";
import "./addCourse.scss";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import Course from "../app/model";
import CoursesAddList from "./ListCourses"
import { text } from "stream/consumers";
import { CiTextAlignCenter } from "react-icons/ci";

export default function Teste() {
    const [formData, setFormData] = useState<Course>({
      title: "",
      video: "",
      img: "",
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
    

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");

    if (!formData.title || !formData.video || !formData.img || !formData.desc || !formData.author) {
      setMessage("Todos os campos devem ser preenchidos.");
      return;
    }

    if (formData.desc.length < 100) {
      setMessage("A descrição deve conter no mínimo 100 caracteres.");
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
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/", formData);

      setSubmittedData((prev) => [...prev, formData]);

      setFormData({
        title: "",
        video: "",
        img: "",
        desc: "",
        author: "",
      });

      setMessage("Dados enviados com sucesso!");
    } catch (error) {
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
                    type="text"
                    name="img"
                    value={formData.img}
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
                <button type="submit" className="button" style={{height: "35px",width: "100px"}}>Enviar</button>
              </form>
              {message && <p style={{ color: message.includes("sucesso") ? "#00ff00" : "#ff0000" }}>{message}</p>}
          
            </div>
          </section>
            <div id="listaDiv">
                <h1>Dados dos Cursos Enviados</h1>
                <CoursesAddList/>
            </div>
      </div>
    </div>
  );
}
