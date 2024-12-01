"use client";
import "./index.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import Course from "../../app/model";
import { FaTrash } from "react-icons/fa";

export default function CoursesAddList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [message, setMessage] = useState<string>("");

  // Função para buscar os cursos
  const fetchCourses = () => {
    axios
      .get("https://courses-plataform.onrender.com/")
      .then((res) => {
        if (Array.isArray(res.data)) {
          const formattedCourses = res.data.map((course: any) => ({
            id: course.id || course._id, // Certifica-se de capturar o ID correto
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
      })
      .catch((error) => console.error("Erro na requisição:\n", error));
  };

  // Busca os cursos quando o componente é montado
  useEffect(() => {
    fetchCourses();
  }, []);

  // Função para deletar um curso
  const handleDelete = (id?: string) => {
    if (!id) {
      setMessage("Erro: ID não encontrado para este curso.");
      return;
    }

    axios
      .delete(`https://courses-plataform.onrender.com/${id}`)
      .then(() => {
        setMessage("Curso apagado com sucesso.");
        // Atualiza a lista após excluir
        setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
      })
      .catch((error) => {
        console.error("Erro ao excluir o curso:\n", error);
        setMessage("Erro ao apagar o curso.");
      });
  };

  if (courses.length === 0) {
    return <p style={{ color: "white" }}>Carregando cursos enviados...</p>;
  }

  return (
    <div>
      {message && (
        <p style={{ color: message.includes("sucesso") ? "green" : "red" }}>
          {message}
        </p>
      )}
      <ul>
        {courses.map((course) => {
          return (
            <li key={course.id || Math.random()}>
              <div>
                <p>
                  <span>Título:</span> {course.title} - <span>enviado por:</span> {course.author}
                </p>
                <button className="button" onClick={() => handleDelete(course.id)}>
                  <FaTrash id="icon" />
                </button>
              </div>
                <hr style={{color: "white"}} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
