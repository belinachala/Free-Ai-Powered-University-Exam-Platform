import React, { useState } from "react";

interface Result {
  id: number;
  studentName: string;
  examTitle: string;
  score: number; // numeric score out of 100
  status: "Pass" | "Fail" | "Absent";
  date: string; // ISO date string
}

const UniversityStudentResults: React.FC = () => {
  // Example data for demonstration, replace with actual backend data
  const [results, setResults] = useState<Result[]>([
    {
      id: 1,
      studentName: "John Doe",
      examTitle: "Programming Fundamentals Midterm",
      score: 85,
      status: "Pass",
      date: "2025-10-15",
    },
    {
      id: 2,
      studentName: "Jane Smith",
      examTitle: "Data Structures Final",
      score: 72,
      status: "Pass",
      date: "2025-11-05",
    },
    {
      id: 3,
      studentName: "Ali Mohamed",
      examTitle: "Operating Systems Midterm",
      score: 48,
      status: "Fail",
      date: "2025-10-20",
    },
    {
      id: 4,
      studentName: "Mary Johnson",
      examTitle: "Databases Midterm",
      score: 0,
      status: "Absent",
      date: "2025-10-10",
    },
  ]);

  // Helper to convert numeric score to letter grade
  const getLetterGrade = (score: number, status: string) => {
    if (status === "Absent") return "N/A";
    if (score >= 90) return "A+";
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    if (score >= 50) return "D";
    return "F";
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Student Results</h1>
      <p className="text-gray-600 mb-6">Gradebook and per-student attempt details.</p>

      <div className="overflow-y-auto max-h-[600px]">
        <table className="min-w-full border border-gray-200 table-fixed">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="border border-gray-300 py-2 px-4 w-40 text-left">Student</th>
              <th className="border border-gray-300 py-2 px-4 w-64 text-left">Exam</th>
              <th className="border border-gray-300 py-2 px-4 w-20 text-center">Score</th>
              <th className="border border-gray-300 py-2 px-4 w-24 text-center">Grade</th>
              <th className="border border-gray-300 py-2 px-4 w-24 text-center">Status</th>
              <th className="border border-gray-300 py-2 px-4 w-32 text-center">Date</th>
            </tr>
          </thead>
          <tbody>
            {results.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-500">
                  No results to display.
                </td>
              </tr>
            ) : (
              results.map((res) => (
                <tr
                  key={res.id}
                  className="even:bg-gray-50 hover:bg-gray-100 transition"
                >
                  <td className="border border-gray-300 py-2 px-4">{res.studentName}</td>
                  <td className="border border-gray-300 py-2 px-4">{res.examTitle}</td>
                  <td className="border border-gray-300 py-2 px-4 text-center">
                    {res.status === "Absent" ? "-" : res.score}
                  </td>
                  <td className="border border-gray-300 py-2 px-4 text-center">
                    {getLetterGrade(res.score, res.status)}
                  </td>
                  <td
                    className={`border border-gray-300 py-2 px-4 text-center font-semibold ${
                      res.status === "Pass"
                        ? "text-green-600"
                        : res.status === "Fail"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {res.status}
                  </td>
                  <td className="border border-gray-300 py-2 px-4 text-center">
                    {new Date(res.date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UniversityStudentResults;
