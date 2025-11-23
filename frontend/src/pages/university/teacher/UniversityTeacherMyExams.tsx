import React, { useState } from "react";
import {
  FileText,
  Edit3,
  Trash2,
  Eye,
  UploadCloud,
  XCircle,
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

interface Exam {
  id: number;
  title: string;
  department: string;
  course: string;
  year: string;
  semester: string;
  examTiming: "Midterm" | "Final" | "";
  category: "Free" | "Paid";
  status: "Draft" | "Published" | "Pending Approval";
  createdAt: string;
  questions: Question[];
}

const UniversityTeacherMyExams: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([
    {
      id: 1,
      title: "Introduction to Programming Mid Exam",
      department: "Computer Science",
      course: "Programming I",
      year: "1st Year",
      semester: "1st Semester",
      examTiming: "Midterm",
      category: "Free",
      status: "Published",
      createdAt: "2025-10-05",
      questions: [
        {
          id: 1,
          question: "What is the output of 1+1 in JavaScript?",
          options: ["1", "2", "11", "Error"],
          answer: "2",
        },
        {
          id: 2,
          question: "Which HTML tag is used for headings?",
          options: ["<h1>", "<p>", "<div>", "<span>"],
          answer: "<h1>",
        },
      ],
    },
  ]);

  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      setExams((prev) => prev.filter((exam) => exam.id !== id));
    }
  };

  const handlePublishToggle = (id: number) => {
    setExams((prev) =>
      prev.map((exam) =>
        exam.id === id
          ? {
              ...exam,
              status: exam.status === "Published" ? "Draft" : "Published",
            }
          : exam
      )
    );
  };

  const openModal = (exam: Exam) => {
    setSelectedExam(exam);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedExam(null);
    setIsModalOpen(false);
  };

  const handleQuestionChange = (
    qId: number,
    field: "question" | "answer" | "options",
    value: string | string[]
  ) => {
    if (!selectedExam) return;
    const updatedQuestions = selectedExam.questions.map((q) =>
      q.id === qId
        ? {
            ...q,
            [field]: value,
          }
        : q
    );
    setSelectedExam({ ...selectedExam, questions: updatedQuestions });
  };

  const addQuestion = () => {
    if (!selectedExam) return;
    const newQuestion: Question = {
      id: Date.now(),
      question: "",
      options: ["", "", "", ""],
      answer: "",
    };
    setSelectedExam({
      ...selectedExam,
      questions: [...selectedExam.questions, newQuestion],
    });
  };

  const deleteQuestion = (qId: number) => {
    if (!selectedExam) return;
    setSelectedExam({
      ...selectedExam,
      questions: selectedExam.questions.filter((q) => q.id !== qId),
    });
  };

  const handleExamTimingChange = (value: "Midterm" | "Final" | "") => {
    if (!selectedExam) return;
    setSelectedExam({ ...selectedExam, examTiming: value });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">My Exams</h1>

      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600 text-base">
          Manage your created exams: view, edit, delete, or publish them.
        </p>
        <a
          href="/uni-teacher/create-exam"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-md transition"
        >
          + Create New Exam
        </a>
      </div>

      {exams.length === 0 ? (
        <div className="text-center py-10 text-gray-500 text-lg">
          No exams found. Start by creating one.
        </div>
      ) : (
        // Container with fixed width and hide horizontal scroll
        <div className="shadow-lg rounded-lg bg-white overflow-x-hidden w-full">
          <table className="table-fixed min-w-full border-collapse">
            <thead className="bg-blue-100 text-blue-800 uppercase text-sm font-semibold">
              <tr>
                <th className="py-3 px-4 text-left w-52">Title</th>
                <th className="py-3 px-4 text-left w-36">Department</th>
                <th className="py-3 px-4 text-left w-40">Course</th>
                <th className="py-3 px-4 text-center w-24">Year</th>
                <th className="py-3 px-4 text-center w-28">Semester</th>
                <th className="py-3 px-4 text-center w-32">Exam Timing</th>
                <th className="py-3 px-4 text-center w-28">Category</th>
                <th className="py-3 px-4 text-center w-28">Status</th>
                <th className="py-3 px-4 text-center w-32">Created</th>
                <th className="py-3 px-4 text-center w-44">Actions</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam) => (
                <tr
                  key={exam.id}
                  className="border-t hover:bg-blue-50 transition-all"
                >
                  <td className="py-3 px-4 flex items-center gap-2 text-gray-800 font-medium w-52">
                    <FileText className="text-blue-500 w-5 h-5" />
                    {exam.title}
                  </td>
                  <td className="py-3 px-4 w-36">{exam.department}</td>
                  <td className="py-3 px-4 w-40">{exam.course}</td>
                  <td className="py-3 px-4 text-center w-24">{exam.year}</td>
                  <td className="py-3 px-4 text-center w-28">{exam.semester}</td>
                  <td className="py-3 px-4 text-center w-32">
                    {exam.examTiming || "-"}
                  </td>
                  <td className="py-3 px-4 text-center w-28">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        exam.category === "Free"
                          ? "bg-green-100 text-green-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {exam.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center w-28">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        exam.status === "Published"
                          ? "bg-green-100 text-green-700"
                          : exam.status === "Pending Approval"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {exam.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center text-gray-600 w-32">
                    {exam.createdAt}
                  </td>
                  <td className="py-3 px-4 text-center space-x-2 w-44">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      title="View"
                      onClick={() => openModal(exam)}
                    >
                      <Eye className="inline-block w-5 h-5" />
                    </button>
                    <button
                      className="text-yellow-600 hover:text-yellow-800"
                      title="Edit"
                    >
                      <Edit3 className="inline-block w-5 h-5" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                      onClick={() => handleDelete(exam.id)}
                    >
                      <Trash2 className="inline-block w-5 h-5" />
                    </button>
                    <button
                      className={`${
                        exam.status === "Published"
                          ? "text-gray-600 hover:text-gray-800"
                          : "text-green-600 hover:text-green-800"
                      }`}
                      onClick={() => handlePublishToggle(exam.id)}
                      title={
                        exam.status === "Published"
                          ? "Unpublish Exam"
                          : "Publish Exam"
                      }
                    >
                      {exam.status === "Published" ? (
                        <XCircle className="inline-block w-5 h-5" />
                      ) : (
                        <UploadCloud className="inline-block w-5 h-5" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && selectedExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl p-6 shadow-lg overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-700">
                {selectedExam.title} - Questions
              </h2>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={closeModal}
              >
                ✖
              </button>
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-1">Exam Timing</label>
              <select
                value={selectedExam.examTiming}
                onChange={(e) =>
                  handleExamTimingChange(
                    e.target.value as "Midterm" | "Final" | ""
                  )
                }
                className="border rounded px-3 py-2 w-full"
              >
                <option value="">Select Exam Timing</option>
                <option value="Midterm">Midterm</option>
                <option value="Final">Final</option>
              </select>
            </div>

            <div className="space-y-4">
              {selectedExam.questions.map((q, idx) => (
                <div
                  key={q.id}
                  className="p-4 border rounded-lg bg-gray-50 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">
                      Q{idx + 1}: {q.question || "No question text"}
                    </span>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => deleteQuestion(q.id)}
                    >
                      <Trash2 className="w-5 h-5 inline-block" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {q.options.map((opt, i) => (
                      <input
                        key={i}
                        type="text"
                        value={opt}
                        placeholder={`Option ${String.fromCharCode(65 + i)}`}
                        className={`border p-2 rounded w-full ${
                          q.answer === opt ? "border-green-500" : "border-gray-300"
                        }`}
                        onChange={(e) => {
                          const newOptions = [...q.options];
                          newOptions[i] = e.target.value;
                          handleQuestionChange(q.id, "options", newOptions);
                        }}
                      />
                    ))}
                  </div>

                  <div className="mt-2">
                    <label className="text-gray-600 font-medium mr-2">
                      Correct Answer:
                    </label>
                    <select
                      value={q.answer}
                      onChange={(e) =>
                        handleQuestionChange(q.id, "answer", e.target.value)
                      }
                      className="border rounded p-2"
                    >
                      <option value="">Select Answer</option>
                      {q.options.map((opt, i) => (
                        <option key={i} value={opt}>
                          {String.fromCharCode(65 + i)}: {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-md transition"
                onClick={addQuestion}
              >
                + Add Question
              </button>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium transition"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium shadow-md transition"
                onClick={() => {
                  alert("Exam questions saved (stub for backend)!");
                  closeModal();
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default UniversityTeacherMyExams;
