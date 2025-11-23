// AdminExamManagement.tsx
import React, { useState } from 'react';
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa';

interface Exam {
  id: number;
  title: string;
  subject: string;
  teacher: string;
  date: string;
  duration: string;
  type: 'Free' | 'Paid';
  category: 'Mid' | 'Final' | 'Exit';
  year: 1 | 2 | 3 | 4 | 5 | 6;
  department: string;
  active: boolean;
}

// Mock data
const mockExams: Exam[] = [
  { id: 1, title: 'Math Midterm', subject: 'Mathematics', teacher: 'Dr. Abebe', date: '2025-11-15', duration: '60 min', type: 'Free', category: 'Mid', year: 1, department: 'Computer Science', active: true },
  { id: 2, title: 'Physics Quiz', subject: 'Physics', teacher: 'Dr. Alem', date: '2025-11-20', duration: '30 min', type: 'Paid', category: 'Final', year: 2, department: 'Electrical Engineering', active: false },
  { id: 3, title: 'Chemistry Exit', subject: 'Chemistry', teacher: 'Dr. Mesfin', date: '2025-12-05', duration: '90 min', type: 'Free', category: 'Exit', year: 3, department: 'Biology', active: true },
  { id: 4, title: 'English Midterm', subject: 'English', teacher: 'Dr. Hana', date: '2025-11-10', duration: '60 min', type: 'Paid', category: 'Mid', year: 4, department: 'English Literature', active: true },
  { id: 5, title: 'Programming Final', subject: 'Computer Science', teacher: 'Dr. Bekele', date: '2025-12-12', duration: '120 min', type: 'Free', category: 'Final', year: 2, department: 'Computer Science', active: false },
];

// More comprehensive Ethiopian university departments
const departments = [
  'Computer Science',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Biology',
  'Chemistry',
  'Physics',
  'Mathematics',
  'English Literature',
  'Economics',
  'Business Administration',
  'Law',
  'Medicine',
  'Pharmacy',
  'Nursing',
  'Architecture',
  'Agriculture',
  'Geology',
  'Political Science',
  'Sociology',
  'History',
  'Psychology',
  'Education',
  'Environmental Science',
  'Statistics',
];

const AdminExamManagement: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>(mockExams);
  const [filterYear, setFilterYear] = useState<1 | 2 | 3 | 4 | 5 | 6 | 'All'>('All');
  const [filterDepartment, setFilterDepartment] = useState<string>('All');

  const filteredExams = exams.filter(
    exam =>
      (filterYear === 'All' || exam.year === filterYear) &&
      (filterDepartment === 'All' || exam.department === filterDepartment)
  );

  const toggleActive = (id: number) => {
    setExams(prev => prev.map(e => (e.id === id ? { ...e, active: !e.active } : e)));
  };

  const deleteExam = (id: number) => {
    setExams(prev => prev.filter(e => e.id !== id));
  };

  const getExamsByTypeAndCategory = (type: 'Free' | 'Paid', category: 'Mid' | 'Final' | 'Exit') =>
    filteredExams.filter(e => e.type === type && e.category === category);

  // Summary stats
  const totalFree = exams.filter(e => e.type === 'Free').length;
  const totalPaid = exams.filter(e => e.type === 'Paid').length;
  const totalActive = exams.filter(e => e.active).length;
  const totalInactive = exams.filter(e => !e.active).length;

  return (
    <div className="space-y-6 p-6">
      <h3 className="text-3xl font-bold text-gray-800">Admin Exam Management</h3>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md">
          <p className="font-semibold">Total Free Exams</p>
          <p className="text-2xl font-bold">{totalFree}</p>
        </div>
        <div className="bg-green-600 text-white p-4 rounded-lg shadow-md">
          <p className="font-semibold">Total Paid Exams</p>
          <p className="text-2xl font-bold">{totalPaid}</p>
        </div>
        <div className="bg-purple-600 text-white p-4 rounded-lg shadow-md">
          <p className="font-semibold">Total Active Exams</p>
          <p className="text-2xl font-bold">{totalActive}</p>
        </div>
        <div className="bg-yellow-600 text-white p-4 rounded-lg shadow-md">
          <p className="font-semibold">Total Inactive Exams</p>
          <p className="text-2xl font-bold">{totalInactive}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap mb-6">
        <select
          value={filterYear}
          onChange={e => setFilterYear(e.target.value === 'All' ? 'All' : parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="All">All Years</option>
          {[1,2,3,4,5,6].map(y => <option key={y} value={y}>Year {y}</option>)}
        </select>

        <select
          value={filterDepartment}
          onChange={e => setFilterDepartment(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="All">All Departments</option>
          {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
        </select>
      </div>

      {/* Tables by type & category */}
      {['Free', 'Paid'].map(type => (
        <div key={type} className="space-y-4">
          <h4 className="text-2xl font-semibold">{type} Exams</h4>
          {['Mid', 'Final', 'Exit'].map(category => {
            const examsList = getExamsByTypeAndCategory(type as 'Free' | 'Paid', category as 'Mid' | 'Final' | 'Exit');
            return (
              <div key={category} className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
                <h5 className="text-xl font-semibold mb-2">{category} Exams</h5>
                {examsList.length === 0 ? (
                  <p className="text-gray-500">No exams found.</p>
                ) : (
                  <table className="min-w-full table-auto border border-gray-200">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Title</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Subject</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Teacher</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Year</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Department</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Duration</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {examsList.map(exam => (
                        <tr key={exam.id} className="border-t border-gray-200 hover:bg-gray-50 transition">
                          <td className="px-4 py-2 text-sm text-gray-600">{exam.id}</td>
                          <td className="px-4 py-2 text-sm text-gray-800">{exam.title}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{exam.subject}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{exam.teacher}</td>
                          <td className="px-4 py-2 text-sm text-gray-600">{exam.year}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{exam.department}</td>
                          <td className="px-4 py-2 text-sm text-gray-600">{exam.date}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{exam.duration}</td>
                          <td className="px-4 py-2 text-sm">
                            {exam.active ? <span className="text-green-600 font-semibold">Active</span> : <span className="text-yellow-600 font-semibold">Inactive</span>}
                          </td>
                          <td className="px-4 py-2 text-sm flex gap-2 flex-wrap">
                            <button onClick={() => toggleActive(exam.id)} className="bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700 transition flex items-center">
                              <FaCheck className="mr-1" /> Toggle
                            </button>
                            <button onClick={() => deleteExam(exam.id)} className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700 transition flex items-center">
                              <FaTrash className="mr-1" /> Delete
                            </button>
                            <button className="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition flex items-center">
                              <FaEdit className="mr-1" /> Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default AdminExamManagement;
