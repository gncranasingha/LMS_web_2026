import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";

const CourseDetails = () => {
  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);

  const {
    allCourses,
    currency,
    calculateRating,
    calculateStudentCount,
    calculateChapterCount,
    calculateLectureCount,
    calculateDiscountedPrice,
  } = useContext(AppContext);

  // Find course
  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const findCourse = allCourses.find(
        (course) => course._id === id
      );

      setCourseData(findCourse);
    }
  }, [allCourses, id]);

  // Loading
  if (!courseData) {
    return <Loading />;
  }

  // Course calculations
  const averageRating = calculateRating(courseData);
  const studentCount = calculateStudentCount(courseData);
  const chapterCount = calculateChapterCount(courseData);
  const lectureCount = calculateLectureCount(courseData);
  const discountedPrice = calculateDiscountedPrice(courseData);

  return (
    <div className="relative flex md:flex-row flex-col-reverse gap-10 items-start justify-between md:px-36 px-8 md:pt-32 pt-20 pb-20 text-left">

      
      <div className="absolute top-0 left-0 w-full h-125 -z-10 bg-linear-to-b from-cyan-100/70 to-white" />

      {/* Left Side */}
      <div className="w-full md:w-2/3">

        {/* Course label */}
        <p className="text-gray-500 mb-2">
          Course
        </p>

        {/* Course title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          {courseData.courseTitle}
        </h1>

        {/* Course description */}
        <div
          className="mt-5 text-gray-600 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: courseData.courseDescription,
          }}
        />

        {/* Course information */}
        <div className="flex flex-wrap items-center gap-5 mt-6 text-sm text-gray-600">

          {/* Rating */}
          <div className="flex items-center gap-1">
            <span className="font-semibold text-gray-800">
              {averageRating.toFixed(1)}
            </span>

            <span className="text-yellow-500">
              ★
            </span>
          </div>

          {/* Students */}
          <div>
            {studentCount} Students
          </div>

          {/* Chapters */}
          <div>
            {chapterCount} Chapters
          </div>

          {/* Lectures */}
          <div>
            {lectureCount} Lectures
          </div>
        </div>

        {/* Course content */}
        <div className="mt-10">

          <h2 className="text-2xl font-semibold text-gray-800 mb-5">
            Course Content
          </h2>

          <div className="space-y-4">

            {courseData.courseContent
              ?.sort((a, b) => a.chapterOrder - b.chapterOrder)
              .map((chapter, chapterIndex) => (

                <div
                  key={chapter.chapterId}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >

                  {/* Chapter header */}
                  <div className="bg-gray-50 px-5 py-4">
                    <h3 className="font-semibold text-gray-800">
                      Chapter {chapterIndex + 1}:{" "}
                      {chapter.chapterTitle}
                    </h3>
                  </div>

                  {/* Lectures */}
                  <div className="divide-y divide-gray-200">

                    {chapter.chapterContent
                      ?.sort(
                        (a, b) =>
                          a.lectureOrder - b.lectureOrder
                      )
                      .map((lecture, lectureIndex) => (

                        <div
                          key={lecture.lectureId}
                          className="flex items-center justify-between px-5 py-4"
                        >

                          <div className="flex items-center gap-3">

                            <span className="text-gray-500 text-sm">
                              {lectureIndex + 1}.
                            </span>

                            <div>
                              <p className="text-gray-800 text-sm md:text-base">
                                {lecture.lectureTitle}
                              </p>

                              {lecture.isPreviewFree && (
                                <span className="text-xs text-green-600">
                                  Preview available
                                </span>
                              )}
                            </div>

                          </div>

                          <span className="text-sm text-gray-500">
                            {lecture.lectureDuration} min
                          </span>

                        </div>
                      ))}
                  </div>

                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/3">

        <div className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">

          {/* Thumbnail */}
          <img
            src={courseData.courseThumbnail}
            alt={courseData.courseTitle}
            className="w-full"
          />

          <div className="p-5">

            {/* Course title */}
            <h2 className="text-xl font-semibold text-gray-800">
              {courseData.courseTitle}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">

              <span className="font-semibold">
                {averageRating.toFixed(1)}
              </span>

              <div className="text-yellow-500">
                {"★".repeat(Math.round(averageRating))}
              </div>

              <span className="text-sm text-gray-500">
                ({courseData.courseRatings?.length || 0} ratings)
              </span>

            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mt-5">

              <span className="text-3xl font-bold text-gray-800">
                {currency}
                {discountedPrice.toFixed(2)}
              </span>

              {courseData.discount > 0 && (
                <>
                  <span className="text-gray-400 line-through">
                    {currency}
                    {courseData.coursePrice.toFixed(2)}
                  </span>

                  <span className="text-green-600 text-sm font-medium">
                    {courseData.discount}% OFF
                  </span>
                </>
              )}

            </div>

            {/* Course statistics */}
            <div className="mt-6 space-y-3 text-sm text-gray-600">

              <div className="flex justify-between">
                <span>Students</span>
                <span className="font-medium text-gray-800">
                  {studentCount}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Chapters</span>
                <span className="font-medium text-gray-800">
                  {chapterCount}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Lectures</span>
                <span className="font-medium text-gray-800">
                  {lectureCount}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Status</span>

                <span
                  className={
                    courseData.isPublished
                      ? "text-green-600 font-medium"
                      : "text-red-600 font-medium"
                  }
                >
                  {courseData.isPublished
                    ? "Published"
                    : "Not Published"}
                </span>
              </div>

            </div>

            {/* Enroll button */}
            <button className="w-full mt-7 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium">
              Enroll Now
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

