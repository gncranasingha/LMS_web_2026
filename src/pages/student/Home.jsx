import CallToAction from "../../components/student/CallToAction"
import Companies from "../../components/student/Companies"
import CoursesSection from "../../components/student/CoursesSection"
import Hero from "../../components/student/Hero"
import TstimonialsSection from "../../components/student/TstimonialsSection"

const Home = () => {
  return (
    <div className="flex flex-col items-center space-y-7" >
      <Hero/>
      <Companies/>
      <CoursesSection/>
      <TstimonialsSection/>
      <CallToAction/>
    </div>
  )
}

export default Home