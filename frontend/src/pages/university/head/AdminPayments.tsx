// AdminPayments.tsx
import React, { useState } from 'react';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';

interface Payment {
  id: number;
  studentName: string;
  email: string;
  year: number;
  department: string;
  examTitle: string;
  examCategory: 'Class Exam' | 'Exit Exam';
  amount: number;
  status: 'Pending' | 'Approved' | 'Paid' | 'Rejected';
  date: string;
}

// Full list of departments in Ethiopian universities
const departments = [
  // Engineering
  'Computer Science', 'Software Engineering', 'Information Technology', 'Electrical and Computer Engineering',
  'Mechanical Engineering', 'Civil Engineering', 'Chemical Engineering', 'Industrial Engineering',
  'Biomedical Engineering', 'Architecture', 'Environmental Engineering', 'Surveying Engineering',
  
  // Natural Sciences
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Statistics', 'Geology', 'Biotechnology',
  
  // Health Sciences
  'Medicine', 'Nursing', 'Pharmacy', 'Public Health', 'Medical Laboratory Science', 'Dentistry',
  
  // Business and Economics
  'Accounting and Finance', 'Economics', 'Business Administration', 'Management', 'Marketing Management',
  'Logistics and Supply Chain Management', 'Tourism and Hospitality Management',
  
  // Social Sciences & Humanities
  'Law', 'Political Science', 'Sociology', 'Psychology', 'Social Work', 'Geography', 'History',
  'English Language and Literature', 'Amharic Language and Literature', 'Journalism and Communication',
  'Civics and Ethical Studies',
  
  // Education & Agriculture
  'Educational Planning and Management', 'Curriculum and Instruction', 'Agricultural Engineering',
  'Plant Science', 'Animal Science', 'Natural Resource Management', 'Rural Development and Agricultural Extension'
];

// Mock payments (mixed Class & Exit exams)
const mockPayments: Payment[] = [
  { id: 1, studentName: 'Alice Johnson', email: 'alice.johnson@example.com', year: 1, department: 'Computer Science', examTitle: 'Semester 1 Class Exam', examCategory: 'Class Exam', amount: 1800, status: 'Pending', date: '2025-11-01' },
  { id: 2, studentName: 'Bob Smith', email: 'bob.smith@example.com', year: 2, department: 'Civil Engineering', examTitle: 'Semester 2 Class Exam', examCategory: 'Class Exam', amount: 2000, status: 'Approved', date: '2025-10-28' },
  { id: 3, studentName: 'Charlie Brown', email: 'charlie.brown@example.com', year: 3, department: 'Law', examTitle: 'Exit Exam', examCategory: 'Exit Exam', amount: 2500, status: 'Paid', date: '2025-10-25' },
  { id: 4, studentName: 'Hana Alem', email: 'hana.alem@example.com', year: 4, department: 'Medicine', examTitle: 'Semester 2 Class Exam', examCategory: 'Class Exam', amount: 2200, status: 'Rejected', date: '2025-11-05' },
  { id: 5, studentName: 'Samuel Tesfaye', email: 'samuel.tesfaye@example.com', year: 5, department: 'Software Engineering', examTitle: 'Exit Exam', examCategory: 'Exit Exam', amount: 2700, status: 'Pending', date: '2025-10-22' },
];

const AdminPayments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [filterYear, setFilterYear] = useState<number | 'All'>('All');
  const [filterDepartment, setFilterDepartment] = useState<string | 'All'>('All');

  const approvePayment = (id: number) => {
    setPayments(prev => prev.map(p => (p.id === id ? { ...p, status: 'Approved' } : p)));
  };

  const markPaid = (id: number) => {
    setPayments(prev => prev.map(p => (p.id === id ? { ...p, status: 'Paid' } : p)));
  };

  const rejectPayment = (id: number) => {
    setPayments(prev => prev.map(p => (p.id === id ? { ...p, status: 'Rejected' } : p)));
  };

  const removePayment = (id: number) => {
    setPayments(prev => prev.filter(p => p.id !== id));
  };

  // Filtering logic
  const filteredPayments = payments.filter(p =>
    (filterYear === 'All' || p.year === filterYear) &&
    (filterDepartment === 'All' || p.department === filterDepartment)
  );

  const classExamPayments = filteredPayments.filter(p => p.examCategory === 'Class Exam');
  const exitExamPayments = filteredPayments.filter(p => p.examCategory === 'Exit Exam');

  const renderTable = (title: string, data: Payment[]) => (
    <div className="p-6 bg-white rounded-lg shadow-md overflow-x-auto">
      <h4 className="text-xl font-semibold mb-4">{title}</h4>
      <table className="min-w-full table-auto border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Student Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Year</th>
            <th className="px-4 py-2 text-left">Department</th>
            <th className="px-4 py-2 text-left">Exam</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map(payment => (
              <tr key={payment.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{payment.id}</td>
                <td className="px-4 py-2">{payment.studentName}</td>
                <td className="px-4 py-2">{payment.email}</td>
                <td className="px-4 py-2">{payment.year}</td>
                <td className="px-4 py-2">{payment.department}</td>
                <td className="px-4 py-2">{payment.examTitle}</td>
                <td className="px-4 py-2">{payment.amount}</td>
                <td className="px-4 py-2">
                  {payment.status === 'Approved' && <span className="text-green-600 font-semibold">{payment.status}</span>}
                  {payment.status === 'Pending' && <span className="text-yellow-600 font-semibold">{payment.status}</span>}
                  {payment.status === 'Paid' && <span className="text-blue-600 font-semibold">{payment.status}</span>}
                  {payment.status === 'Rejected' && <span className="text-red-600 font-semibold">{payment.status}</span>}
                </td>
                <td className="px-4 py-2">{payment.date}</td>
                <td className="px-4 py-2 flex gap-2 flex-wrap">
                  {payment.status === 'Pending' && (
                    <>
                      <button onClick={() => approvePayment(payment.id)} className="bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700 flex items-center">
                        <FaCheck className="mr-1" /> Approve
                      </button>
                      <button onClick={() => rejectPayment(payment.id)} className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700 flex items-center">
                        <FaTimes className="mr-1" /> Reject
                      </button>
                    </>
                  )}
                  {payment.status === 'Approved' && (
                    <button onClick={() => markPaid(payment.id)} className="bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700 flex items-center">
                      <FaCheck className="mr-1" /> Mark Paid
                    </button>
                  )}
                  <button onClick={() => removePayment(payment.id)} className="bg-gray-600 text-white px-2 py-1 rounded-md hover:bg-gray-700 flex items-center">
                    <FaTrash className="mr-1" /> Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} className="text-center p-4 text-gray-500">No payments found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-3xl font-bold text-gray-800">Payment Management (University Admin)</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="border border-gray-300 rounded-md p-2"
          value={filterYear}
          onChange={e => setFilterYear(e.target.value === 'All' ? 'All' : Number(e.target.value))}
        >
          <option value="All">All Years</option>
          {[1, 2, 3, 4, 5, 6].map(y => <option key={y} value={y}>Year {y}</option>)}
        </select>

        <select
          className="border border-gray-300 rounded-md p-2"
          value={filterDepartment}
          onChange={e => setFilterDepartment(e.target.value)}
        >
          <option value="All">All Departments</option>
          {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
        </select>
      </div>

      {/* Separate Tables */}
      {renderTable('Class Exams (Mid + Final)', classExamPayments)}
      {renderTable('Exit Exams', exitExamPayments)}
    </div>
  );
};

export default AdminPayments;
