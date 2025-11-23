import React from "react";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaClipboardList,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      title: "Total Students",
      value: 3420,
      icon: <FaUserGraduate className="text-xl sm:text-2xl text-white" />,
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Total Teachers",
      value: 132,
      icon: <FaChalkboardTeacher className="text-xl sm:text-2xl text-white" />,
      color: "from-green-500 to-green-700",
    },
    {
      title: "Active Exams",
      value: 58,
      icon: <FaClipboardList className="text-xl sm:text-2xl text-white" />,
      color: "from-yellow-500 to-yellow-700",
    },
    {
      title: "Revenue (ETB)",
      value: "178,500",
      icon: <FaMoneyCheckAlt className="text-xl sm:text-2xl text-white" />,
      color: "from-purple-500 to-purple-700",
    },
  ];

  const examsData = [
    { month: "Jan", free: 10, paid: 6 },
    { month: "Feb", free: 12, paid: 10 },
    { month: "Mar", free: 15, paid: 9 },
    { month: "Apr", free: 13, paid: 11 },
    { month: "May", free: 18, paid: 15 },
    { month: "Jun", free: 20, paid: 14 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 15000 },
    { month: "Feb", revenue: 20000 },
    { month: "Mar", revenue: 17000 },
    { month: "Apr", revenue: 22000 },
    { month: "May", revenue: 28000 },
    { month: "Jun", revenue: 30000 },
  ];

  const teachers = [
    { name: "Dr. Alemu T.", department: "Engineering", examsCreated: 14, avgScore: 82 },
    { name: "Prof. Hiwot G.", department: "Medicine", examsCreated: 10, avgScore: 88 },
    { name: "Mr. Tesfaye B.", department: "ICT", examsCreated: 8, avgScore: 91 },
  ];

  const students = [
    { name: "Abel W.", year: 2, avgScore: 87 },
    { name: "Rahel M.", year: 3, avgScore: 93 },
    { name: "Kalkidan S.", year: 1, avgScore: 80 },
    { name: "Brook D.", year: 4, avgScore: 89 },
  ];

  const announcements = [
    { date: "2025-10-28", title: "Semester II Exams Released", type: "Exams" },
    { date: "2025-10-25", title: "New Courses Added: Data Science, AI", type: "Academics" },
    { date: "2025-10-22", title: "Tuition Payment Deadline Extended", type: "Finance" },
    { date: "2025-10-20", title: "Workshop: Digital Education in Ethiopia", type: "Event" },
  ];

  return (
    <div className="overflow-x-hidden max-w-full space-y-6 px-3 sm:px-6 py-4">
      {/* Overview Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 sm:p-6 bg-gradient-to-r ${stat.color} rounded-xl shadow-md hover:shadow-lg transition-all`}
          >
            <div>
              <p className="text-white text-xs sm:text-sm">{stat.title}</p>
              <p className="text-white text-2xl sm:text-3xl font-bold mt-1">{stat.value}</p>
            </div>
            <div className="bg-white/20 p-2 sm:p-3 rounded-full">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Exam Chart */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm sm:shadow-md">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
            Free vs Paid Exams per Month
          </h3>
          <div className="w-full h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={examsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="free" fill="#60a5fa" name="Free Exams" />
                <Bar dataKey="paid" fill="#7c3aed" name="Paid Exams" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm sm:shadow-md">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
            Monthly Revenue Trend
          </h3>
          <div className="w-full h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Performance Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Teachers */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
          <h4 className="text-base sm:text-lg font-semibold mb-3 text-gray-700">
            Top Performing Teachers
          </h4>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-2 py-1 sm:px-3 sm:py-2 text-left">Name</th>
                  <th className="px-2 py-1 sm:px-3 sm:py-2 text-left">Department</th>
                  <th className="px-2 py-1 sm:px-3 sm:py-2 text-left">Exams</th>
                  <th className="px-2 py-1 sm:px-3 sm:py-2 text-left">Avg Score</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((t, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td className="px-2 py-1 sm:px-3 sm:py-2">{t.name}</td>
                    <td className="px-2 py-1 sm:px-3 sm:py-2">{t.department}</td>
                    <td className="px-2 py-1 sm:px-3 sm:py-2">{t.examsCreated}</td>
                    <td className="px-2 py-1 sm:px-3 sm:py-2 text-green-600 font-medium">
                      {t.avgScore}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Students */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
          <h4 className="text-base sm:text-lg font-semibold mb-3 text-gray-700">
            Top Performing Students
          </h4>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-2 py-1 sm:px-3 sm:py-2 text-left">Name</th>
                  <th className="px-2 py-1 sm:px-3 sm:py-2 text-left">Year</th>
                  <th className="px-2 py-1 sm:px-3 sm:py-2 text-left">Avg Score</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td className="px-2 py-1 sm:px-3 sm:py-2">{s.name}</td>
                    <td className="px-2 py-1 sm:px-3 sm:py-2">{s.year}</td>
                    <td className="px-2 py-1 sm:px-3 sm:py-2 text-blue-600 font-medium">
                      {s.avgScore}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
        <h4 className="text-base sm:text-lg font-semibold mb-3 text-gray-700">
          Recent University Updates
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-2 py-1 sm:px-3 sm:py-2 text-left">Date</th>
                <th className="px-2 py-1 sm:px-3 sm:py-2 text-left">Title</th>
                <th className="px-2 py-1 sm:px-3 sm:py-2 text-left">Type</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((a, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="px-2 py-1 sm:px-3 sm:py-2 text-gray-600">{a.date}</td>
                  <td className="px-2 py-1 sm:px-3 sm:py-2">{a.title}</td>
                  <td className="px-2 py-1 sm:px-3 sm:py-2 text-gray-500">{a.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
