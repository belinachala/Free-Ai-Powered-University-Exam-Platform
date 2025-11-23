// AdminAnalytics.tsx
import React, { useState } from "react";
import { FaUsers, FaChalkboardTeacher, FaFileAlt, FaDollarSign, FaStar, FaBook } from "react-icons/fa";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar
} from "recharts";

const departments = [
  "Computer Science", "Information Technology", "Software Engineering", "Electrical Engineering",
  "Mechanical Engineering", "Civil Engineering", "Architecture", "Medicine", "Nursing",
  "Pharmacy", "Public Health", "Accounting", "Management", "Economics", "Marketing",
  "Law", "Political Science", "History", "Psychology", "Biology", "Chemistry",
  "Physics", "Mathematics", "Statistics", "Geography", "Agriculture", "Veterinary Science",
  "Education", "Social Work", "Theology"
];

// Mock data generator
const randomValue = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Student Distribution
const studentDistribution = [
  { name: "Year 1", value: 200 },
  { name: "Year 2", value: 180 },
  { name: "Year 3", value: 220 },
  { name: "Year 4", value: 160 },
  { name: "Year 5", value: 140 },
  { name: "Year 6", value: 130 },
];

// Department Students
const departmentStudentDistribution = departments.map(dep => ({
  name: dep,
  students: randomValue(50, 200),
}));

// Department Exam Performance
const departmentExamPerformance = departments.map(dep => ({
  name: dep,
  freeClass: randomValue(70, 100),
  paidClass: randomValue(70, 100),
  freeExit: randomValue(70, 100),
  paidExit: randomValue(70, 100),
}));

const revenueTrend = [
  { month: "Jan", revenue: 15000 },
  { month: "Feb", revenue: 17000 },
  { month: "Mar", revenue: 16000 },
  { month: "Apr", revenue: 18000 },
  { month: "May", revenue: 20000 },
];

const topStudents = [
  { id: 1, name: "Alice Johnson", grade: "A+", score: 98 },
  { id: 2, name: "Charlie Brown", grade: "A", score: 95 },
  { id: 3, name: "Hana Tesfaye", grade: "A", score: 93 },
];

const coursesOffered = [
  { name: "Mathematics", students: 120 },
  { name: "Physics", students: 100 },
  { name: "Chemistry", students: 110 },
  { name: "Biology", students: 90 },
  { name: "English", students: 150 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#a4de6c'];

const AdminAnalytics: React.FC = () => {
  const [filterDept, setFilterDept] = useState<string>("All");
  const [filterYear, setFilterYear] = useState<number | "All">("All");
  const [filterSemester, setFilterSemester] = useState<number | "All">("All");
  const [filterExamType, setFilterExamType] = useState<string>("All");

  // Filtered data based on selections
  const filteredDepartments = filterDept === "All"
    ? departmentExamPerformance
    : departmentExamPerformance.filter(d => d.name === filterDept);

  const filteredStudents = filterYear === "All"
    ? studentDistribution
    : studentDistribution.filter(s => s.name === `Year ${filterYear}`);

  return (
    <div className="space-y-6 p-4 md:p-6">
      <h3 className="text-3xl font-bold text-gray-800 mb-4">University Admin Analytics</h3>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
        <select
          value={filterDept}
          onChange={e => setFilterDept(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="All">All Departments</option>
          {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
        </select>

        <select
          value={filterYear}
          onChange={e => setFilterYear(e.target.value === "All" ? "All" : Number(e.target.value))}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="All">All Years</option>
          {[1,2,3,4,5,6].map(y => <option key={y} value={y}>Year {y}</option>)}
        </select>

        <select
          value={filterSemester}
          onChange={e => setFilterSemester(e.target.value === "All" ? "All" : Number(e.target.value))}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="All">All Semesters</option>
          <option value={1}>Semester 1</option>
          <option value={2}>Semester 2</option>
        </select>

        <select
          value={filterExamType}
          onChange={e => setFilterExamType(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="All">All Exam Types</option>
          <option value="freeClass">Free Class Exam</option>
          <option value="paidClass">Paid Class Exam</option>
          <option value="freeExit">Free Exit Exam</option>
          <option value="paidExit">Paid Exit Exam</option>
        </select>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Exam Performance Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md col-span-2">
          <h4 className="text-xl font-semibold mb-4">Department Exam Performance</h4>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={filteredDepartments} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end" height={120} />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              {(filterExamType === "All" || filterExamType === "freeClass") && <Bar dataKey="freeClass" fill="#8884d8" name="Free Class Exam" />}
              {(filterExamType === "All" || filterExamType === "paidClass") && <Bar dataKey="paidClass" fill="#82ca9d" name="Paid Class Exam" />}
              {(filterExamType === "All" || filterExamType === "freeExit") && <Bar dataKey="freeExit" fill="#ffc658" name="Free Exit Exam" />}
              {(filterExamType === "All" || filterExamType === "paidExit") && <Bar dataKey="paidExit" fill="#ff8042" name="Paid Exit Exam" />}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trend Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold mb-4">Revenue Trend (Paid Exams)</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueTrend} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Student Distribution */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold mb-4">Student Distribution (Years 1–6)</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={filteredStudents} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {filteredStudents.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
