import React, { useEffect, useState } from "react";
import {
  FaFileUpload,
  FaSpinner,
  FaTrash,
  FaPlus,
  FaCheckCircle,
} from "react-icons/fa";

/** Types */
type Question = {
  questionText: string;
  options: string[]; // length 4 -> A,B,C,D
  correctOption: number; // 0..3
};

/** Simulated course data (replace with backend data later) */
const courseData: Record<string, Record<number, Record<string, string[]>>> = {
  "Computer Science": {
    1: {
      "First Semester": ["Intro to Computing", "Math for CS I", "Comm Skills I"],
      "Second Semester": ["Programming Fundamentals", "Math for CS II", "Digital Logic"],
    },
    2: {
      "First Semester": ["Data Structures", "Computer Architecture", "Probability"],
      "Second Semester": ["Databases", "Operating Systems", "OOP"],
    },
  },
  "Civil Engineering": {
    1: {
      "First Semester": ["Engineering Drawing I", "Basic Mechanics", "Mathematics I"],
      "Second Semester": ["Mathematics II", "Engineering Drawing II", "Intro to Civil Eng"],
    },
    2: {
      "First Semester": ["Structural Analysis I", "Fluid Mechanics", "Surveying I"],
      "Second Semester": ["Structural Analysis II", "Concrete Tech", "Surveying II"],
    },
  },
  Economics: {
    1: {
      "First Semester": ["Principles of Economics I", "Math for Economists I", "Comm Skills I"],
      "Second Semester": ["Principles of Economics II", "Math for Economists II", "Statistics I"],
    },
    2: {
      "First Semester": ["Microeconomics", "Macroeconomics", "Econometrics I"],
      "Second Semester": ["Public Finance", "Development Economics", "Econometrics II"],
    },
  },
};

/** Helper */
const emptyQuestion = (): Question => ({
  questionText: "",
  options: ["", "", "", ""],
  correctOption: -1,
});

/** Component */
const UniversityTeacherCreateExam: React.FC = () => {
  // Exam meta
  const [examTitle, setExamTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState<number | "ExitExam" | "">("");
  const [semester, setSemester] = useState("");
  const [courses, setCourses] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [examTiming, setExamTiming] = useState<"Midterm" | "Final" | "">("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [examCategory, setExamCategory] = useState<"Free" | "Paid">("Free");

  // file / extraction states
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractionDone, setExtractionDone] = useState(false);

  // questions
  const [questions, setQuestions] = useState<Question[]>([]);

  // validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Determine if Exit Exam is selected
  const isExitExam = year === "ExitExam";

  // Update courses when department/year/semester change (excluding Exit Exam)
  useEffect(() => {
    if (department && year && !isExitExam && semester) {
      const avail = courseData[department]?.[Number(year)]?.[semester] || [];
      setCourses(avail);
      setSelectedCourse("");
    } else {
      setCourses([]);
      setSelectedCourse("");
    }
  }, [department, year, semester, isExitExam]);

  // Simulated AI extraction from uploaded file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setUploading(true);
    setProgress(0);
    setExtractionDone(false);
    setQuestions([]); // reset

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.floor(Math.random() * 8) + 3;
      });
    }, 300);

    setTimeout(() => {
      const extracted: Question[] = [
        {
          questionText: "What is the result of 2 + 2?",
          options: ["1", "2", "3", "4"],
          correctOption: 3,
        },
        {
          questionText: "Which city is the capital of Ethiopia?",
          options: ["Nairobi", "Addis Ababa", "Kigali", "Cairo"],
          correctOption: 1,
        },
      ];
      setQuestions(extracted);
      setUploading(false);
      setExtractionDone(true);
      setProgress(100);
    }, 3600);
  };

  const addQuestion = () => setQuestions((q) => [...q, emptyQuestion()]);
  const updateQuestionText = (idx: number, text: string) =>
    setQuestions((prev) => {
      const copy = [...prev];
      copy[idx].questionText = text;
      return copy;
    });
  const updateOption = (qIdx: number, optIdx: number, text: string) =>
    setQuestions((prev) => {
      const copy = [...prev];
      copy[qIdx].options[optIdx] = text;
      return copy;
    });
  const updateCorrectOption = (qIdx: number, optIdx: number) =>
    setQuestions((prev) => {
      const copy = [...prev];
      copy[qIdx].correctOption = optIdx;
      return copy;
    });
  const deleteQuestion = (idx: number) =>
    setQuestions((prev) => prev.filter((_, i) => i !== idx));

  // Validation
  const validateAll = () => {
    const e: Record<string, string> = {};
    if (!examTitle.trim()) e.examTitle = "Exam title is required.";
    if (!department) e.department = "Department is required.";
    if (!year) e.year = "Year is required.";

    // Semester, course, and exam timing required unless Exit Exam
    if (!isExitExam) {
      if (!semester) e.semester = "Semester is required.";
      if (!selectedCourse) e.course = "Course is required.";
      if (!examTiming) e.examTiming = "Please select whether exam is Midterm or Final.";
    }

    if (!startTime) e.startTime = "Start time is required.";
    if (!endTime) e.endTime = "End time is required.";
    if (startTime && endTime && new Date(startTime) >= new Date(endTime))
      e.time = "Start time must be before end time.";

    if (questions.length === 0) e.questions = "At least one question is required (upload a file or add manually).";

    questions.forEach((q, idx) => {
      if (!q.questionText.trim()) e[`q-${idx}`] = `Question ${idx + 1}: text required.`;
      for (let i = 0; i < 4; i++) {
        if (!q.options[i] || !q.options[i].trim()) e[`q-${idx}-opt-${i}`] = `Q${idx + 1} Option ${String.fromCharCode(65 + i)} is required.`;
      }
      if (q.correctOption < 0 || q.correctOption > 3) e[`q-${idx}-correct`] = `Q${idx + 1}: select the correct option (A-D).`;
    });

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Jump alert for exit exam
  const handleJumpToNextActivity = () => {
    alert("Exit Exam selected — skipping semester/course and exam timing selection, moving to next activity.");
    setSemester("");
    setSelectedCourse("");
    setExamTiming("");
  };

  // Submit
  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validateAll()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const payload = {
      examTitle,
      department,
      year,
      semester: isExitExam ? "" : semester,
      course: isExitExam ? "" : selectedCourse,
      examTiming: isExitExam ? "" : examTiming,
      startTime,
      endTime,
      examCategory,
      fileName,
      questions,
    };

    console.log("Submitting exam payload:", payload);
    alert("Exam submitted for admin approval!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto bg-white border border-blue-100 rounded-2xl shadow-lg p-6">
        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Create New Exam</h1>
          <p className="text-gray-600 mt-1">Fill exam info, upload a document for AI extraction, then edit questions as needed.</p>
        </div>

        {/* Error Top */}
        {Object.keys(errors).length > 0 && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-100 text-red-700">
            <strong>Please fix the following:</strong>
            <ul className="pl-4 list-disc mt-2">
              {Object.entries(errors).map(([k, v]) => (
                <li key={k}>{v}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Exam Details */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-blue-700 mb-3">Exam Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Exam Title</label>
              <input
                value={examTitle}
                onChange={(e) => setExamTitle(e.target.value)}
                className={`mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.examTitle ? "border-red-300 focus:ring-red-300" : "border-blue-200 focus:ring-blue-300"
                }`}
                placeholder="e.g., Programming Fundamentals Midterm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Exam Type</label>
              <select
                value={examCategory}
                onChange={(e) => setExamCategory(e.target.value as "Free" | "Paid")}
                className="mt-1 w-full rounded-lg border border-blue-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className={`mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.department ? "border-red-300 focus:ring-red-300" : "border-blue-200 focus:ring-blue-300"
                }`}
              >
                <option value="">Select Department</option>
                {Object.keys(courseData).map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Year</label>
              <select
                value={year}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "ExitExam") {
                    setYear("ExitExam");
                    handleJumpToNextActivity();
                  } else {
                    setYear(val ? Number(val) : "");
                  }
                }}
                className={`mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
                  errors.year ? "border-red-300 focus:ring-red-300" : "border-blue-200 focus:ring-blue-300"
                }`}
              >
                <option value="">Select Year</option>
                {[1, 2, 3, 4, 5, 6].map((y) => (
                  <option key={y} value={y}>Year {y}</option>
                ))}
                <option value="ExitExam">Exit Exam</option>
              </select>
            </div>

            {/* Conditionally render Semester, Course, and Exam Timing unless Exit Exam */}
            {!isExitExam && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Semester</label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className={`mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
                      errors.semester ? "border-red-300 focus:ring-red-300" : "border-blue-200 focus:ring-blue-300"
                    }`}
                  >
                    <option value="">Select Semester</option>
                    <option value="First Semester">First Semester</option>
                    <option value="Second Semester">Second Semester</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Course</label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className={`mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
                      errors.course ? "border-red-300 focus:ring-red-300" : "border-blue-200 focus:ring-blue-300"
                    }`}
                    disabled={!courses.length}
                  >
                    <option value="">
                      {courses.length ? "Select Course" : "Select Dept/Year/Semester first"}
                    </option>
                    {courses.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Is exam Midterm or Final?</label>
                  <select
                    value={examTiming}
                    onChange={(e) => setExamTiming(e.target.value as "Midterm" | "Final" | "")}
                    className={`mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
                      errors.examTiming ? "border-red-300 focus:ring-red-300" : "border-blue-200 focus:ring-blue-300"
                    }`}
                  >
                    <option value="">Select Exam Timing</option>
                    <option value="Midterm">Midterm</option>
                    <option value="Final">Final</option>
                  </select>
                </div>
              </>
            )}

            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className={`mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
                    errors.startTime || errors.time ? "border-red-300 focus:ring-red-300" : "border-blue-200 focus:ring-blue-300"
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Time</label>
                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className={`mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${
                    errors.endTime || errors.time ? "border-red-300 focus:ring-red-300" : "border-blue-200 focus:ring-blue-300"
                  }`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* File Upload */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-blue-700 mb-3">Upload Material (optional)</h2>
          <label
            htmlFor="file"
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer transition ${
              uploading ? "bg-blue-50 border-blue-300" : "hover:bg-blue-50"
            }`}
          >
            <input id="file" type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt" onChange={handleFileChange} className="hidden" />
            <FaFileUpload className="text-4xl text-blue-600 mb-2" />
            <div className="text-sm text-gray-700">
              {fileName || "Click to upload (PDF, DOCX, PPT). AI will extract MCQs with options A–D."}
            </div>

            {/* Progress */}
            {uploading && (
              <div className="w-full max-w-lg mt-4">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full transition-all" style={{ width: `${Math.min(progress, 100)}%` }} />
                </div>
                <div className="mt-2 text-sm text-blue-600 flex items-center gap-2">
                  <FaSpinner className="animate-spin" /> Extracting questions... {Math.min(progress, 100)}%
                </div>
              </div>
            )}

            {!uploading && extractionDone && (
              <div className="mt-4 text-green-600 flex items-center gap-2">
                <FaCheckCircle /> Extraction complete — review questions below.
              </div>
            )}
          </label>
        </section>

        {/* Questions Editor */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-blue-700">Questions</h2>
            <div className="flex items-center gap-2">
              <button type="button" onClick={addQuestion} className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition">
                <FaPlus /> Add Question
              </button>
            </div>
          </div>

          {questions.length === 0 ? (
            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-100 text-yellow-700">
              No questions yet. Upload a document or click "Add Question" to create manually.
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((q, qi) => (
                <div key={qi} className="p-4 rounded-lg border bg-white shadow-sm">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">Question {qi + 1}</label>
                      <textarea
                        value={q.questionText}
                        onChange={(e) => updateQuestionText(qi, e.target.value)}
                        className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
                          errors[`q-${qi}`] ? "border-red-300 focus:ring-red-300" : "border-blue-200 focus:ring-blue-300"
                        }`}
                        rows={2}
                      />
                      {errors[`q-${qi}`] && <p className="text-sm text-red-600 mt-1">{errors[`q-${qi}`]}</p>}
                    </div>

                    <div className="flex-shrink-0">
                      <button type="button" onClick={() => deleteQuestion(qi)} className="text-red-600 hover:text-red-800 p-2">
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                    {[0, 1, 2, 3].map((optIdx) => (
                      <div key={optIdx}>
                        <label className="text-sm font-medium text-gray-700">Option {String.fromCharCode(65 + optIdx)}</label>
                        <input
                          value={q.options[optIdx]}
                          onChange={(e) => updateOption(qi, optIdx, e.target.value)}
                          className={`mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
                            errors[`q-${qi}-opt-${optIdx}`] ? "border-red-300 focus:ring-red-300" : "border-blue-200 focus:ring-blue-300"
                          }`}
                        />
                        {errors[`q-${qi}-opt-${optIdx}`] && <p className="text-sm text-red-600 mt-1">{errors[`q-${qi}-opt-${optIdx}`]}</p>}
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700">Correct Option</label>
                    <select
                      value={q.correctOption >= 0 ? q.correctOption : ""}
                      onChange={(e) => updateCorrectOption(qi, Number(e.target.value))}
                      className={`rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
                        errors[`q-${qi}-correct`] ? "border-red-300 focus:ring-red-300" : "border-blue-200 focus:ring-blue-300"
                      }`}
                    >
                      <option value="">Select A–D</option>
                      <option value={0}>A</option>
                      <option value={1}>B</option>
                      <option value={2}>C</option>
                      <option value={3}>D</option>
                    </select>
                    {errors[`q-${qi}-correct`] && <p className="text-sm text-red-600">{errors[`q-${qi}-correct`]}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Submit */}
        <section className="mt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="text-sm text-gray-600">
              After publishing the exam will be sent for admin approval. Ensure all details and questions are correct.
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition shadow"
              >
                <FaCheckCircle /> Publish / Submit for Approval
              </button>
              <button
                type="button"
                onClick={() => {
                  const ok = validateAll();
                  if (ok) alert("All inputs look good — ready to submit.");
                  else window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                Validate
              </button>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default UniversityTeacherCreateExam;
