"use client";
import Course from "@/app/model";
import "./index.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";


export default function CoursesAddList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [message, setMessage] = useState<string>("");

  const fetchCourses = async () => {
    try {
      const res = await axios.get("https://courses-plataform.onrender.com/");
      if (Array.isArray(res.data)) {
        const formattedCourses = res.data.map((course: any) => ({
          id: course.id || course._id, 
          title: course.title,
          video: course.video,
          img: course.img,
          desc: course.desc,
          author: course.author,
        }));
        setCourses(formattedCourses);
      } else {
        console.error("A resposta não é um array:", res.data);
      }
    } catch (error) {
      console.error("Erro na requisição:\n", error);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) {
      setMessage("Erro: ID não encontrado para este curso.");
      return;
    }

    try {
      await axios.delete(`https://courses-plataform.onrender.com/${id}`);
      setMessage("Curso apagado com sucesso.");

      setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
    } catch (error) {
      console.error("Erro ao excluir o curso:\n", error);
      setMessage("Erro ao apagar o curso.");
    }
  };

  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  useEffect(() => {
    fetchCourses();
  }, []);

  if (courses.length === 0) {
    return <p style={{ color: "white" }}>Carregando cursos enviados...</p>;
  }

  return (
    <div>
      {message && (
        <p style={{ color: message.includes("sucesso") ? "#00ff00" : "#ff0000" }}>
          {message}
        </p>
      )}
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <div>
              <p>
                <span>Título:</span> {course.title} - <span>enviado por:</span>{" "}
                {course.author}
              </p>
              <button
                className="button"
                style={{
                  background: "transparent",
                  color: "white",
                  padding: "0.2rem",
                }}
                onClick={() => handleDelete(course.id)}
              >
                <FaTrash id="icon" />
              </button>
            </div>
            <hr style={{ color: "white" }} />
          </li>
        ))}
      </ul>
    </div>
  );
}
