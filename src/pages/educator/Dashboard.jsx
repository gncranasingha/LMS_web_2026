import { useContext, useEffect, useState } from "react"
import { AppContext } from "../../context/AppContext"
import { assets, dummyDashboardData } from "../../assets/assets"
import Loading from "../../components/student/Loading"


const Dashboard = () => {

  const {currency} = useContext(AppContext)
  const [dashboardData, setDashboardData] = useState(null)

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData)
  }

  useEffect(() => {
    fetchDashboardData()
  },[])

  return dashboardData ? (
    <div className="min-h-screen w-full bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-start gap-8">

        <div className="w-full space-y-8">

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
              Educator Dashboard
            </h1>
            <p className="text-sm text-slate-500 sm:text-base">
              Overview of your courses, student enrolments, and earnings.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

            <div className="flex items-center gap-4 rounded-xl border border-slate-200 border-l-4 border-l-blue-500 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                <img src={assets.patients_icon} alt="patients_icon" className="h-8 w-8 object-contain"/>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">
                  {dashboardData.enrolledStudentsData.length}
                </p>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Total Enrolments
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-slate-200 border-l-4 border-l-violet-500 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-violet-50">
                <img src={assets.appointments_icon} alt="appointments_icon" className="h-8 w-8 object-contain"/>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">
                  {dashboardData.totalCourses}
                </p>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Total Courses
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-slate-200 border-l-4 border-l-emerald-500 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                <img src={assets.earning_icon} alt="earning_icon" className="h-8 w-8 object-contain"/>
              </div>
              <div>
                <p className="wrap-break-word text-2xl font-bold text-slate-800">
                  {currency}{dashboardData.totalEarnings}
                </p>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  Total Earnings
                </p>
              </div>
            </div>

          </div>

          {/* Latest Enrolments */}
          <div className="w-full">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Latest Enrolments
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  View the latest students enrolled in your courses.
                </p>
              </div>
              <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                {dashboardData.enrolledStudentsData.length} Enrolments
              </span>
            </div>

            <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-130 table-auto">
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <th className="hidden px-6 py-4 text-center sm:table-cell">#</th>
                      <th className="px-4 py-4 sm:px-6">Student Name</th>
                      <th className="px-4 py-4 sm:px-6">Course Title</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {dashboardData.enrolledStudentsData.map((item, index)=>(
                    <tr key={index} className="transition-colors duration-200 hover:bg-slate-50">
                      <td className="hidden px-6 py-4 text-center text-sm font-medium text-slate-400 sm:table-cell">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <img src={item.student.imageUrl} alt="profile" className="h-10 w-10 shrink-0 rounded-full border border-slate-200 bg-slate-100 object-cover"/>
                          <span className="max-w-55 truncate text-sm font-semibold text-slate-700">
                            {item.student.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 sm:px-6">
                        <span className="block max-w-md truncate text-sm text-slate-600">
                          {item.courseTitle}
                        </span>
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-3">
                <p className="text-xs text-slate-500">
                  Showing {dashboardData.enrolledStudentsData.length} enrolments
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  ) : <Loading/>
}

export default Dashboard

