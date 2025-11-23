import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const userName = "Teacher Name"; // Replace with dynamic data
  const date = new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <header className="bg-green-600 text-white p-4 shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-2xl font-bold">{t('welcome')} {userName}</div>
          <div className="text-lg">{t('todayIs')} {date} EAT</div>
        </div>
        <button onClick={() => {/* Logout logic */}} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-200">
          {t('logout')}
        </button>
      </div>
    </header>
  );
};

export default Header;