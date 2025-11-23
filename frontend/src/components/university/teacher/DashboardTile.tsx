import { useTranslation } from 'react-i18next';

type DashboardTileProps = {
  title: string;
  count: number;
  color: string;
  icon: string;
  onAdd?: () => void;
};

const DashboardTile: React.FC<DashboardTileProps> = ({ title, count, color, icon, onAdd }) => {
  const { t } = useTranslation();
  return (
    <div className={`bg-${color}-500 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-between h-32`}>
      <div className="text-2xl">{count}</div>
      <div className="text-sm">{t(title)}</div>
      <div className={`text-4xl ${icon}`}></div>
      {onAdd && <button onClick={onAdd} className="bg-white text-black p-1 rounded mt-2">➕</button>}
    </div>
  );
};

export default DashboardTile;