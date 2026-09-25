import { useState } from "react"
import { AppContext } from "./AppContext"
import { dummyCourses } from "../assets/assets"
import { useNavigate } from "react-router-dom"

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY

  const navigate = useNavigate()
  const [allCourses] = useState(dummyCourses)
  const [isEducator, setIsEducator] = useState(true)

  const calculateRating = (course)=>{
    if(course.courseRatings.length === 0){
      return 0
    }
    let totalRating = 0
    course.courseRatings.forEach(rating => {
      totalRating += rating.rating
    })
    return totalRating/course.courseRatings.length
  }

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}


