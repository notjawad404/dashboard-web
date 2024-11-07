import { FaClock } from 'react-icons/fa';

export default function DashboardScreen() {
    const stats = [
        { label: "Open Claims", value: "1227" },
        { label: "Average Time", value: "23 days" },
        { label: "Average Cost", value: "1.097€" },
        { label: "Loss Ratio", value: "64%" }
      ];
    
      return (
        <main className="flex-1 p-6 bg-gray-50">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow flex flex-col items-center"
              >
               <FaClock size={30}  style={{ fill: 'none', stroke: 'black', strokeWidth: 30 }}/>
                <h2 className="text-xl font-semibold pt-5">{stat.value}</h2>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </main>
      );
}
