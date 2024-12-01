import "./index.scss"
import Courses from "../Courses"
import { Footer } from "../Footer"

export default function CoursesList(){

    
    return(
        <section>
            <ul>
                <Courses/>
            </ul>
            <Footer/>
        </section>
    )
}