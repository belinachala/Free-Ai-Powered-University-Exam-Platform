// AdminAnnouncements.tsx
import React, { useState } from 'react';
import { FaTrash, FaEdit, FaPaperPlane, FaPlus } from 'react-icons/fa';

// University users
interface User {
  id: number;
  name: string;
  type: 'Teacher' | 'Student' | 'Staff';
  year?: number; // only for students
  department?: string; // only for students
  email: string;
  phone: string;
}

interface Announcement {
  id: number;
  title: string;
  message: string;
  date: string;
  recipients: string[];
}

// Sample users
const sampleUsers: User[] = [
  { id: 1, name: 'Alice Johnson', type: 'Student', year: 1, department: 'Computer Science', email: 'alice@example.com', phone: '0911000001' },
  { id: 2, name: 'Bob Smith', type: 'Teacher', email: 'bob@example.com', phone: '0911000002' },
  { id: 3, name: 'Charlie Brown', type: 'Student', year: 3, department: 'Electrical Engineering', email: 'charlie@example.com', phone: '0911000003' },
  { id: 4, name: 'David Lee', type: 'Staff', email: 'david@example.com', phone: '0911000004' },
  { id: 5, name: 'Eve Kim', type: 'Teacher', email: 'eve@example.com', phone: '0911000005' },
  { id: 6, name: 'Fiona White', type: 'Student', year: 2, department: 'Mechanical Engineering', email: 'fiona@example.com', phone: '0911000006' },
];

const departments = [
  'Computer Science',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Architecture',
  'Business',
  'Economics',
  'Biology',
  'Chemistry',
  'Physics',
  'Mathematics',
  'English',
  'Law',
  'Nursing',
];

const AdminAnnouncements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [selectedType, setSelectedType] = useState<'All' | 'Student' | 'Teacher' | 'Staff'>('All');
  const [selectedYear, setSelectedYear] = useState<number | 'All'>('All');
  const [selectedDepartment, setSelectedDepartment] = useState<string | 'All'>('All');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter users based on type, year, department, and search term
  const filteredUsers = sampleUsers.filter(u => {
    // Filter by type
    if (selectedType !== 'All' && u.type !== selectedType) return false;

    // Filter by year (only for students)
    if (u.type === 'Student' && selectedYear !== 'All' && u.year !== selectedYear) return false;

    // Filter by department (only for students)
    if (u.type === 'Student' && selectedDepartment !== 'All' && u.department !== selectedDepartment) return false;

    // Filter by search term (name)
    if (!u.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;

    return true;
  });

  // Toggle user selection
  const toggleUser = (id: number) => {
    setSelectedUsers(prev =>
      prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
    );
  };

  // Send announcement
  const sendAnnouncement = () => {
    if (!title || !message) return alert('Title and message are required');
    if (selectedUsers.length === 0) return alert('Select at least one recipient');

    const recipients = sampleUsers
      .filter(u => selectedUsers.includes(u.id))
      .map(u => `${u.name} (${u.type}${u.year ? ` Year ${u.year}` : ''}${u.department ? ` - ${u.department}` : ''})`);

    const newAnnouncement: Announcement = {
      id: announcements.length + 1,
      title,
      message,
      date: new Date().toISOString().split('T')[0],
      recipients,
    };

    setAnnouncements(prev => [newAnnouncement, ...prev]);
    alert(`Announcement sent to:\n${recipients.join('\n')}`);

    // Clear inputs
    setTitle('');
    setMessage('');
    setSelectedUsers([]);
    setSelectedType('All');
    setSelectedYear('All');
    setSelectedDepartment('All');
    setSearchTerm('');
  };

  const removeAnnouncement = (id: number) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Create Announcement */}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <h3 className="text-xl font-semibold flex items-center">
          <FaPlus className="mr-2" /> Create Announcement
        </h3>

        <div className="flex flex-col md:flex-row gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Title"
            className="border border-gray-300 rounded-md p-2 flex-1"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Message"
            className="border border-gray-300 rounded-md p-2 flex-1"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </div>

        {/* User Selection */}
        <div className="space-y-2">
          <p className="font-semibold">Select Recipients:</p>
          <div className="flex flex-col md:flex-row gap-4 flex-wrap">
            <select
              className="border border-gray-300 rounded-md p-2"
              value={selectedType}
              onChange={e => setSelectedType(e.target.value as any)}
            >
              <option value="All">All Users</option>
              <option value="Student">Students</option>
              <option value="Teacher">Teachers</option>
              <option value="Staff">Staff</option>
            </select>

            {/* Year filter only for students */}
            {selectedType === 'Student' && (
              <select
                className="border border-gray-300 rounded-md p-2"
                value={selectedYear}
                onChange={e => setSelectedYear(e.target.value === 'All' ? 'All' : Number(e.target.value))}
              >
                <option value="All">All Years</option>
                {[1,2,3,4,5,6].map(year => (
                  <option key={year} value={year}>Year {year}</option>
                ))}
              </select>
            )}

            {/* Department filter only for students */}
            {selectedType === 'Student' && (
              <select
                className="border border-gray-300 rounded-md p-2"
                value={selectedDepartment}
                onChange={e => setSelectedDepartment(e.target.value)}
              >
                <option value="All">All Departments</option>
                {departments.map(dep => (
                  <option key={dep} value={dep}>{dep}</option>
                ))}
              </select>
            )}

            <input
              type="text"
              placeholder="Search user"
              className="border border-gray-300 rounded-md p-2 flex-1"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2 mt-2 max-h-40 overflow-y-auto">
            {filteredUsers.map(u => (
              <button
                key={u.id}
                onClick={() => toggleUser(u.id)}
                className={`px-3 py-1 rounded-full border ${
                  selectedUsers.includes(u.id)
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-gray-100 text-gray-800 border-gray-300'
                }`}
              >
                {u.name} ({u.type}{u.year ? ` Year ${u.year}` : ''}{u.department ? ` - ${u.department}` : ''})
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={sendAnnouncement}
          className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition flex items-center"
        >
          <FaPaperPlane className="mr-2" /> Send Announcement
        </button>
      </div>

      {/* Announcements List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h4 className="text-xl font-semibold mb-4">Sent Announcements</h4>
        {announcements.length === 0 && <p className="text-gray-500">No announcements sent yet.</p>}
        <ul className="divide-y divide-gray-200">
          {announcements.map(a => (
            <li key={a.id} className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h3 className="font-semibold text-gray-800">{a.title}</h3>
                <p className="text-gray-600">{a.message}</p>
                <p className="text-sm text-gray-500">Date: {a.date}</p>
                <p className="text-sm text-gray-700 mt-1">Recipients: {a.recipients.join(', ')}</p>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button
                  onClick={() => removeAnnouncement(a.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition flex items-center"
                >
                  <FaTrash className="mr-1" /> Remove
                </button>
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition flex items-center"
                >
                  <FaEdit className="mr-1" /> Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminAnnouncements;
