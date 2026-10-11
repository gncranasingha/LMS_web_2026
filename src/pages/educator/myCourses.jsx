import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/AppContext"
import Loading from "../../components/student/Loading"

const MyCourses = () => {

  const { currency, allCourses } = useContext(AppContext)

  const [courses, setCourses] = useState(null)

  const fetchEducatorCourses = async () => {
    setCourses(allCourses)
  }

  console.log("All Courses:", allCourses)

  useEffect(() => {
    fetchEducatorCourses()
  }, [])

  return courses ? (
    <div className="min-h-screen w-full bg-slate-50 px-4 py-8 sm:px-6 md:px-8">

      <div className="mx-auto w-full max-w-7xl">

        
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
            My Courses
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Manage your courses and monitor student enrolments and earnings.
          </p>
        </div>

        <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
            <h2 className="text-lg font-semibold text-slate-800">
              All Courses
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Review your published courses and their performance.
            </p>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[650px] table-auto text-left text-sm">

              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-semibold sm:px-6">
                    Course
                  </th>
                  <th className="px-5 py-4 font-semibold sm:px-6">
                    Earnings
                  </th>
                  <th className="px-5 py-4 font-semibold sm:px-6">
                    Students
                  </th>
                  <th className="px-5 py-4 font-semibold sm:px-6">
                    Published On
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-slate-600">
                {
                  courses.map((course) => (
                    <tr
                      key={course._id}
                      className="transition-colors duration-200 hover:bg-blue-50/40"
                    >

                      <td className="px-5 py-4 sm:px-6">
                        <div className="flex min-w-0 items-center gap-4">
                          <img
                            src={course.courseThumbnail}
                            alt="Course"
                            className="h-14 w-20 shrink-0 rounded-lg border border-slate-200 bg-slate-100 object-cover"
                          />

                          <span className="max-w-xs truncate font-semibold text-slate-800">
                            {course.courseTitle}
                          </span>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 font-semibold text-emerald-600 sm:px-6">
                        {currency} {Math.floor(
                          course.enrolledStudents.length *
                          (
                            course.coursePrice -
                            course.discount * course.coursePrice / 100
                          )
                        )}
                      </td>

                      <td className="px-5 py-4 sm:px-6">
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                          {course.enrolledStudents.length} Students
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-slate-500 sm:px-6">
                        {new Date(course.createdAt).toLocaleDateString()}
                      </td>

                    </tr>
                  ))
                }
              </tbody>

            </table>
          </div>

          <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6">
            <p className="text-sm text-slate-500">
              Total courses: <span className="font-semibold text-slate-700">
                {courses.length}
              </span>
            </p>
          </div>

        </div>
      </div>
    </div>
  ) : <Loading />
}

export default MyCourses

