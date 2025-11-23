// AdminResults.tsx
import React, { useState } from "react";
import { FaSearch, FaFileExport, FaTrash } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

type ExamType = "Free" | "Paid";
type ExamCategory = "Class" | "Exit";

interface Result {
  id: number;
  studentName: string;
  examTitle: string;
  department: string;
  year: number;
  semester: number;
  examType: ExamType;
  examCategory: ExamCategory;
  score: number;
  date: string;
}

const departments = [
  "Computer Science", "Information Technology", "Software Engineering", "Electrical Engineering",
  "Mechanical Engineering", "Civil Engineering", "Architecture", "Medicine", "Nursing",
  "Pharmacy", "Public Health", "Accounting", "Management", "Economics", "Marketing",
  "Law", "Political Science", "History", "Psychology", "Biology", "Chemistry",
  "Physics", "Mathematics", "Statistics", "Geography", "Agriculture", "Veterinary Science",
  "Education", "Social Work", "Theology"
];

const initialResults: Result[] = [
  { id: 1, studentName: "Alice Johnson", examTitle: "Programming Fundamentals", department: "Computer Science", year: 1, semester: 1, examType: "Free", examCategory: "Class", score: 88, date: "2025-11-15" },
  { id: 2, studentName: "Dawit Mulu", examTitle: "Introduction to Law", department: "Law", year: 3, semester: 2, examType: "Free", examCategory: "Class", score: 72, date: "2025-10-10" },
  { id: 3, studentName: "Hana Tesfaye", examTitle: "Data Structures", department: "Software Engineering", year: 2, semester: 2, examType: "Paid", examCategory: "Class", score: 94, date: "2025-12-05" },
  { id: 4, studentName: "Lidya Mekonnen", examTitle: "Anatomy II", department: "Medicine", year: 4, semester: 2, examType: "Paid", examCategory: "Class", score: 81, date: "2025-11-21" },
  { id: 5, studentName: "Eleni Gebre", examTitle: "Agriculture Exit Exam", department: "Agriculture", year: 6, semester: 2, examType: "Free", examCategory: "Exit", score: 92, date: "2025-08-12" },
  { id: 6, studentName: "Samuel Tesfaye", examTitle: "Law Exit Exam", department: "Law", year: 6, semester: 2, examType: "Paid", examCategory: "Exit", score: 87, date: "2025-10-22" },
  { id: 7, studentName: "Maggie Kidane", examTitle: "Engineering Exit Exam", department: "Mechanical Engineering", year: 6, semester: 2, examType: "Paid", examCategory: "Exit", score: 77, date: "2025-09-10" },
];

const AdminResults: React.FC = () => {
  const [results, setResults] = useState<Result[]>(initialResults);
  const [searchTerm, setSearchTerm] = useState("");
  const [semesterFilter, setSemesterFilter] = useState<number | "all">("all");
  const [yearFilter, setYearFilter] = useState<number | "all">("all");
  const [departmentFilter, setDepartmentFilter] = useState<string | "All">("All");

  const calculateGrade = (score: number): string => {
    if (score >= 90) return "A+";
    if (score >= 85) return "A";
    if (score >= 80) return "A-";
    if (score >= 75) return "B+";
    if (score >= 70) return "B";
    if (score >= 65) return "C+";
    if (score >= 60) return "C";
    if (score >= 50) return "D";
    return "F";
  };

  const removeResult = (id: number) =>
    setResults((prev) => prev.filter((r) => r.id !== id));

  // Filter logic
  const filtered = results.filter((r) => {
    const text = `${r.studentName} ${r.examTitle} ${r.department} ${r.year}`.toLowerCase();
    const matchesSearch = text.includes(searchTerm.toLowerCase());
    const matchesSemester = semesterFilter === "all" || r.semester === semesterFilter;
    const matchesYear = yearFilter === "all" || r.year === yearFilter;
    const matchesDepartment = departmentFilter === "All" || r.department === departmentFilter;
    return matchesSearch && matchesSemester && matchesYear && matchesDepartment;
  });

  const exportResults = () => {
    if (filtered.length === 0) {
      alert("No data available to export.");
      return;
    }

    const exportData = filtered.map((r) => ({
      ID: r.id,
      Student: r.studentName,
      Department: r.department,
      Year: `Year ${r.year}`,
      Semester: r.semester,
      Exam: r.examTitle,
      ExamType: r.examType,
      Category: r.examCategory,
      Score: r.score,
      Grade: calculateGrade(r.score),
      Date: r.date,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Admin Results");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `AdminResults_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  // Separate tables
  const classFree = filtered.filter((r) => r.examCategory === "Class" && r.examType === "Free");
  const classPaid = filtered.filter((r) => r.examCategory === "Class" && r.examType === "Paid");
  const exitFree = filtered.filter((r) => r.examCategory === "Exit" && r.examType === "Free");
  const exitPaid = filtered.filter((r) => r.examCategory === "Exit" && r.examType === "Paid");

  const renderTable = (data: Result[], title: string) => (
    <div className="p-6 bg-white rounded-lg shadow-md overflow-x-auto mt-6">
      <h4 className="text-xl font-semibold mb-4 text-gray-800">{title}</h4>
      <table className="min-w-full table-auto border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 text-left">ID</th>
            <th className="px-3 py-2 text-left">Student</th>
            <th className="px-3 py-2 text-left">Department</th>
            <th className="px-3 py-2 text-left">Year</th>
            <th className="px-3 py-2 text-left">Semester</th>
            <th className="px-3 py-2 text-left">Exam</th>
            <th className="px-3 py-2 text-left">Score</th>
            <th className="px-3 py-2 text-left">Grade</th>
            <th className="px-3 py-2 text-left">Date</th>
            <th className="px-3 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={10} className="text-center p-4 text-gray-500">
                No results found.
              </td>
            </tr>
          ) : (
            data.map((r) => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="px-3 py-2 text-sm">{r.id}</td>
                <td className="px-3 py-2 text-sm">{r.studentName}</td>
                <td className="px-3 py-2 text-sm">{r.department}</td>
                <td className="px-3 py-2 text-sm">Year {r.year}</td>
                <td className="px-3 py-2 text-sm">{r.semester}</td>
                <td className="px-3 py-2 text-sm">{r.examTitle}</td>
                <td className="px-3 py-2 text-sm">{r.score}</td>
                <td className="px-3 py-2 text-sm font-semibold text-green-700">
                  {calculateGrade(r.score)}
                </td>
                <td className="px-3 py-2 text-sm">{r.date}</td>
                <td className="px-3 py-2 text-sm">
                  <button
                    onClick={() => removeResult(r.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 flex items-center"
                  >
                    <FaTrash className="mr-1" /> Remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6">
      <h3 className="text-3xl font-bold text-gray-800">Student Results (Admin)</h3>

      {/* Filters */}
      <div className="flex flex-col md:flex-row flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 flex-1 bg-white">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by student, exam, department, or year"
            className="outline-none flex-1 text-sm"
          />
        </div>

        <select
          className="border border-gray-300 rounded-md p-2"
          value={yearFilter}
          onChange={(e) =>
            setYearFilter(e.target.value === "all" ? "all" : Number(e.target.value))
          }
        >
          <option value="all">All Years</option>
          {[1, 2, 3, 4, 5, 6].map((y) => (
            <option key={y} value={y}>
              Year {y}
            </option>
          ))}
        </select>

        <select
          className="border border-gray-300 rounded-md p-2"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          <option value="All">All Departments</option>
          {departments.map((dep) => (
            <option key={dep} value={dep}>
              {dep}
            </option>
          ))}
        </select>

        <select
          className="border border-gray-300 rounded-md p-2"
          value={semesterFilter}
          onChange={(e) =>
            setSemesterFilter(e.target.value === "all" ? "all" : Number(e.target.value))
          }
        >
          <option value="all">All Semesters</option>
          <option value={1}>Semester 1</option>
          <option value={2}>Semester 2</option>
        </select>

        <button
          onClick={exportResults}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center"
        >
          <FaFileExport className="mr-2" /> Export to Excel
        </button>
      </div>

      {renderTable(classFree, "Class Exam — Free")}
      {renderTable(classPaid, "Class Exam — Paid")}
      {renderTable(exitFree, "Exit Exam — Free")}
      {renderTable(exitPaid, "Exit Exam — Paid")}
    </div>
  );
};

export default AdminResults;
