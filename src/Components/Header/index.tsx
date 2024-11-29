import "./index.scss"
import { IoAddCircleSharp } from "react-icons/io5";
import Link from "next/link";

export default function Header(){
    return(
        <nav>
            <div></div>
            <h1>Cursos Tech Gratuitos</h1>
            <Link id="button" href="/addCourse">
            Adicionar cursos<IoAddCircleSharp id="icon"/>
            </Link>
        </nav>
    )
}

