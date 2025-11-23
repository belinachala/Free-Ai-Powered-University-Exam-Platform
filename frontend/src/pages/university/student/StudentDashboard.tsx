import React from 'react';

const exams = [
  {
    id: 'free-exam',
    title: 'Free Exam',
    description: 'Access official unpaid academic exams like Midterms and Finals for free.',
    imageUrl: '/assets/free-exam.png', // Add corresponding image assets in public/assets
    backgroundColor: 'bg-blue-500',
    buttonColor: 'bg-blue-700 hover:bg-blue-800',
  },
  {
    id: 'paid-exam',
    title: 'Paid Exam',
    description: 'Take optional paid practice exams with AI grading and proctoring support.',
    imageUrl: '/assets/paid-exam.png',
    backgroundColor: 'bg-purple-600',
    buttonColor: 'bg-purple-800 hover:bg-purple-900',
  },
];

const StudentDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-12 text-purple-700 text-center">
        Welcome to Your Exam Dashboard
      </h1>

      {/* Promotional Section */}
      <section className="max-w-4xl mx-auto mb-16 p-6 bg-white rounded-lg shadow-lg text-center animate-fadeInUp">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Boost Your Exam Success with Our AI-Powered Platform!
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Prepare smartly with personalized AI recommendations, real-time grading,
          and secure exam proctoring. Whether you want free official exams or paid
          practice sessions, we've got you covered.
        </p>
        <button
          className="px-6 py-3 bg-purple-700 text-white rounded-lg text-lg font-semibold shadow-lg hover:bg-purple-800 transition-transform transform hover:scale-105"
          onClick={() => alert('Navigate to Learn More')}
        >
          Learn More
        </button>
      </section>

      {/* Exams Selector */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {exams.map(({ id, title, description, imageUrl, backgroundColor, buttonColor }) => (
          <div
            key={id}
            className={`rounded-lg shadow-xl p-6 flex flex-col items-center text-white cursor-pointer hover:shadow-2xl transition-all transform hover:-translate-y-2 animate-fadeIn`}
            style={{ animationDuration: '600ms' }}
          >
            {/* Colored banner */}
            <div className={`w-full rounded-t-lg p-4 ${backgroundColor} flex justify-center items-center`}>
              <img
                src={imageUrl}
                alt={`${title} illustration`}
                className="h-32 object-contain"
                loading="lazy"
              />
            </div>
            {/* Content */}
            <div className="bg-white rounded-b-lg w-full p-6 text-gray-800 text-center flex-grow flex flex-col justify-between">
              <h3 className="text-2xl font-bold mb-3">{title}</h3>
              <p className="mb-6">{description}</p>
              <button
                className={`w-full py-3 rounded text-white font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${buttonColor} shadow-lg hover:scale-105 transform transition-transform`}
                onClick={() => alert(`Start ${title}`)}
              >
                Start Exam
              </button>
            </div>
          </div>
        ))}
      </section>

      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation-name: fadeInUp;
          animation-fill-mode: both;
          animation-timing-function: ease-out;
        }
        .animate-fadeIn {
          animation: fadeInUp 0.8s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default StudentDashboard;
