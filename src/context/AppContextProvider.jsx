import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [allCourses] = useState(dummyCourses);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Calculate rating
  const calculateRating = (course) => {
    if (!course.courseRatings || course.courseRatings.length === 0) {
      return 0;
    }

    let totalRating = 0;

    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });

    return totalRating / course.courseRatings.length;
  };

  // Calculate course duration
  const calculateCourseDuration = (course) => {
    let time = 0;

    course.courseContent?.forEach((chapter) => {
      chapter.chapterContent?.forEach((lecture) => {
        time += lecture.lectureDuration;
      });
    });

    return humanizeDuration(time * 60 * 1000, {
      units: ["h", "m"],
    });
  };

  // Student count
  const calculateStudentCount = (course) => {
    return course.enrolledStudents?.length || 0;
  };

  // Chapter count
  const calculateChapterCount = (course) => {
    return course.courseContent?.length || 0;
  };

  // Lecture count
  const calculateLectureCount = (course) => {
    return (
      course.courseContent?.reduce(
        (total, chapter) =>
          total + (chapter.chapterContent?.length || 0),
        0
      ) || 0
    );
  };

  // Discounted price
  const calculateDiscountedPrice = (course) => {
    return (
      course.coursePrice -
      (course.coursePrice * (course.discount || 0)) / 100
    );
  };

  const fetchUserEnrolledCourses = async () => {
    setEnrolledCourses(dummyCourses);
  };

  useEffect(() => {
    fetchUserEnrolledCourses();
  }, []);

  const value = {
    currency,
    allCourses,
    navigate,

    calculateRating,
    calculateCourseDuration,
    calculateStudentCount,
    calculateChapterCount,
    calculateLectureCount,
    calculateDiscountedPrice,

    isEducator,
    setIsEducator,
    enrolledCourses,
    fetchUserEnrolledCourses,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

