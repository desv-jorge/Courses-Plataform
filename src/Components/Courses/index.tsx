"use client";
import "./index.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import Course from "../../app/model";

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    axios
      .get('https://courses-plataform.onrender.com/')
      .then((res) => {
        console.log(res.data);

        if (Array.isArray(res.data)) {
          const formattedCourses = res.data.map((course: any) => ({
            ...course,
          }));
          setCourses(formattedCourses);
        } else {
          console.error("A resposta não é um array:", res.data);
        }
      })
      .catch((error) => console.error("Erro na requisição:\n", error));
  }, []);

  useEffect(()=>{
    axios.get("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5294954752211324/crossorigin?anonymous")
  })

  if (courses.length === 0) {
    return <p style={{ color: "white" }}>Carregando cursos...</p>;
  }

  return (
    <ul>
      {courses.map((course,index) => {
        return(
        <li key={index}>
          <div>
            <h1>{course.title}</h1>
            <a href={course.video} target="blank">
            <img src={course.img} alt={course.title} />
            </a>
            <p>{course.desc}</p>
          </div>
        </li>
      )})}
    </ul>
  );
}