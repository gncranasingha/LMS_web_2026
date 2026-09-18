import Companies from "../../components/student/Companies"
import Hero from "../../components/student/Hero"


const Home = () => {
  return (
    <div className="flex flex-col items-center space-y-7" >
      <Hero/>
      <Companies/>
    </div>
  )
}

export default Home