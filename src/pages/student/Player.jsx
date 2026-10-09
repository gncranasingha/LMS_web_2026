import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import Rating from "../../components/student/Rating";

const Player = () => {
  const {
    enrolledCourses,
    calculateRating,
    calculateStudentCount,
    calculateChapterCount,
    calculateLectureCount,
  } = useContext(AppContext);

  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);
  

  useEffect(() => {
    if (enrolledCourses && enrolledCourses.length > 0) {
      const course = enrolledCourses.find(
        (course) => course._id === courseId
      );

      setCourseData(course);
    }
  }, [enrolledCourses, courseId]);

  // Prevent reading properties from null
  if (!courseData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading course...</p>
      </div>
    );
  }

  // Calculate course information
  const averageRating = calculateRating(courseData);
  const studentCount = calculateStudentCount(courseData);
  const chapterCount = calculateChapterCount(courseData);
  const lectureCount = calculateLectureCount(courseData);

  return (
    <div className="p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36">

      {/* Left column */}
      <div className="text-gray-800">

        <h1 className="text-xl font-semibold">
          Course Structure
        </h1>

        <div className="w-full">

          <p className="text-sm text-cyan-600 font-medium mb-3 mt-6">
            Course
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
            {courseData.courseTitle}
          </h1>

         <div
            className="text-gray-600 mt-5 leading-relaxed prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription,
            }}
          />


            <span className="flex items-center py-3">
              {/* ⭐
              <span className="font-medium text-gray-800">
                {averageRating.toFixed(1)}
              </span>

              ({courseData.courseRatings?.length || 0} ratings) */}
              <h1 className="text-xl font-bold" >Rate this Course:</h1>
              <Rating initialRating={0} />
            </span>

           <div className="flex flex-wrap items-center gap-5 mt-7 text-sm text-gray-600">

            <span className="flex items-center gap-1">
              👨‍🎓
              <span className="font-medium text-gray-800">
                {studentCount}
              </span>
              Students
            </span>

            <span className="flex items-center gap-1">
              📚
              <span className="font-medium text-gray-800">
                {chapterCount}
              </span>
              Chapters
            </span>

            <span className="flex items-center gap-1">
              🎥
              <span className="font-medium text-gray-800">
                {lectureCount}
              </span>
              Lectures
            </span>
          </div>

          <div className="mt-10">

            <h2 className="text-2xl font-semibold text-gray-800 mb-5">
              Course Content
            </h2>

            <p className="text-sm text-gray-500 mb-5">
              {chapterCount} chapters • {lectureCount} lectures
            </p>

            <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">

              {courseData.courseContent
                ?.sort(
                  (a, b) => a.chapterOrder - b.chapterOrder
                )
                .map((chapter) => (

                  <div
                    key={chapter.chapterId}
                    className="border-b last:border-b-0 border-gray-200"
                  >

                    <div className="bg-gray-50 px-5 py-4">

                      <div className="flex items-center justify-between">

                        <div>

                          <p className="text-xs text-cyan-600 font-medium">
                            Chapter {chapter.chapterOrder}
                          </p>

                          <h3 className="text-lg font-semibold text-gray-800">
                            {chapter.chapterTitle}
                          </h3>

                        </div>

                        <span className="text-sm text-gray-500">
                          {chapter.chapterContent?.length || 0} lectures
                        </span>

                      </div>

                    </div>

                    <div>

                      {chapter.chapterContent
                        ?.sort(
                          (a, b) =>
                            a.lectureOrder - b.lectureOrder
                        )
                        .map((lecture) => (

                          <div
                            key={lecture.lectureId}
                            className="flex items-center justify-between gap-4 px-5 py-4 border-t border-gray-100 hover:bg-gray-50"
                          >

                            <div className="flex items-center gap-3">

                              <div className="w-9 h-9 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600">
                                ▶
                              </div>

                              <div>

                                <p className="text-sm font-medium text-gray-800">
                                  {lecture.lectureOrder}.{" "}
                                  {lecture.lectureTitle}
                                </p>

                                <p className="text-xs text-gray-500 mt-1">
                                  {lecture.lectureDuration} minutes
                                </p>

                              </div>

                            </div>

                            <div className="flex items-center gap-3">

                              {lecture.isPreviewFree && (
                                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                                  Preview
                                </span>
                              )}

                              <a
                                href={lecture.lectureUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                              >
                                Watch
                              </a>

                            </div>

                          </div>

                        ))}

                    </div>

                  </div>

                ))}

            </div>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="w-full">

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">

          <img
            src={courseData.courseThumbnail}
            alt={courseData.courseTitle}
            className="w-full"
          />

          <div className="p-5">

            <h2 className="text-xl font-semibold text-gray-800">
              {courseData.courseTitle}
            </h2>

            

          </div>
        </div>

      </div>
    </div>
  );
};

export default Player;