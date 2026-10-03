import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);

  const { allCourses } = useContext(AppContext);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const findCourse = allCourses.find(
        (course) => course._id === id
      );

      setCourseData(findCourse);
    }
  }, [allCourses, id]);

  if (!courseData) {
    return <Loading />;
  }

  // average rating
  const averageRating =
    courseData.courseRatings?.length > 0
      ? (
          courseData.courseRatings.reduce(
            (total, rating) => total + rating.rating,
            0
          ) / courseData.courseRatings.length
        ).toFixed(1)
      : "0.0";

  // Number of students
  const studentCount = courseData.enrolledStudents?.length || 0;

  // Number of chapters
  const chapterCount = courseData.courseContent?.length || 0;

  // Number of lectures
  const lectureCount =
    courseData.courseContent?.reduce(
      (total, chapter) =>
        total + (chapter.chapterContent?.length || 0),
      0
    ) || 0;

  // Calculate discounted 
  const discountedPrice =
    courseData.coursePrice -
    (courseData.coursePrice * courseData.discount) / 100;

  return (
    <div className="relative flex md:flex-row flex-col-reverse gap-10 items-start justify-between md:px-36 px-8 md:pt-32 pt-20 pb-20 text-left">

      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-125 -z-10 bg-linear-to-b from-cyan-100/70 to-white" />

      {/*  LEFT COLUMN  */}
      <div className="w-full md:w-2/3">

        <p className="text-sm text-cyan-600 font-medium mb-3">
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

        {/*  COURSE INFORMATION  */}
        <div className="flex flex-wrap items-center gap-5 mt-7 text-sm text-gray-600">

          <span className="flex items-center gap-1">
            ⭐
            <span className="font-medium text-gray-800">
              {averageRating}
            </span>
            ({courseData.courseRatings?.length || 0} ratings)
          </span>

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

        {/*  COURSE CONTENT  */}
        <div className="mt-10">

          <h2 className="text-2xl font-semibold text-gray-800 mb-5">
            Course Content
          </h2>

          <p className="text-sm text-gray-500 mb-5">
            {chapterCount} chapters • {lectureCount} lectures
          </p>

          <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">

            {courseData.courseContent
              ?.sort((a, b) => a.chapterOrder - b.chapterOrder)
              .map((chapter, chapterIndex) => (

                <div
                  key={chapter.chapterId}
                  className="border-b last:border-b-0 border-gray-200"
                >

                  {/* Chapter Header */}
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

                  {/* Lectures */}
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

      {/*  RIGHT COLUMN  */}
      <div className="w-full md:w-1/3">

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden sticky top-24">

         <img
            src={courseData.courseThumbnail}
            alt={courseData.courseTitle}
            className="w-full h-56 object-cover"
          />

          <div className="p-6">

            <h2 className="text-xl font-semibold text-gray-800">
              {courseData.courseTitle}
            </h2>

            <div className="flex items-center gap-2 mt-3">

              <span className="text-yellow-500">
                ⭐
              </span>

              <span className="font-medium text-gray-800">
                {averageRating}
              </span>

              <span className="text-sm text-gray-500">
                ({courseData.courseRatings?.length || 0} ratings)
              </span>

            </div>

             <div className="flex items-center gap-3 mt-5">

              <span className="text-3xl font-bold text-gray-800">
                $
                {discountedPrice.toFixed(2)}
              </span>

              {courseData.discount > 0 && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    ${courseData.coursePrice.toFixed(2)}
                  </span>

                  <span className="text-sm font-medium text-green-600">
                    {courseData.discount}% OFF
                  </span>
                </>
              )}

            </div>

             <div className="mt-6 space-y-3 text-sm text-gray-600">

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
                <span>Students</span>
                <span className="font-medium text-gray-800">
                  {studentCount}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Status</span>

                <span
                  className={`font-medium ${
                    courseData.isPublished
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {courseData.isPublished
                    ? "Published"
                    : "Not Published"}
                </span>
              </div>

            </div>

            <button
              className="w-full mt-6 bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-3 rounded-lg transition duration-200"
            >
              Enroll Now
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              30-day money-back guarantee
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

