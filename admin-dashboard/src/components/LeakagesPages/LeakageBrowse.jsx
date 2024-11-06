import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
Chart.register(ArcElement, Tooltip, Legend);
const LeakageBrowse = () => {
    const chartData = {
        
        datasets: [
          {
            data: [40, 20, 15, 10, 15],
            backgroundColor: ['#4CAF50', '#FF9800', '#2196F3', '#F44336', '#9C27B0'],
          },
        ],
        labels: ['3a', '3c', '1a', '1b', '3a'],
        
      };

  return (
    <div className="p-6">
      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b pb-2">
        {['General', '2a', '3c', '1a', '1b', '3a'].map((tab, index) => (
          <button key={index} className="text-gray-500 hover:text-black">
            {tab}
          </button>
        ))}
      </div>

      {/* Statistics and Chart Section */}
      <div className="flex flex-row mt-6">
        {/* Statistics */}
        <div className='flex px-10 flex-col w-1/5'>
        <section className='flex text-center flex-col'>
            <p className="text-3xl font-semibold text-blue-800">752</p>
            <p className="text-gray-600">Total Leakages</p>
            </section>

            <section className='flex text-center flex-col'>
            <p className="text-2xl font-semibold text-blue-800">400</p>
            <p className="text-gray-600">Open</p>
            </section>

                        <section className='flex text-center flex-col'>
            <p className="text-2xl font-semibold text-blue-800">352</p>
            <p className="text-gray-600">Closed</p>
            </section>
        </div>

        <div className='w-1/5'>
        <section className='flex text-center flex-col'>
            <p className="text-2xl font-semibold text-blue-800">327.390€</p>
            <p className="text-gray-600">Potential Savings</p>
            </section>

            <section className='flex text-center flex-col'>
            <p className="text-2xl font-semibold text-blue-800">27.390€</p>
            <p className="text-gray-600">Pending Savings</p>  
            </section>

            <section className='flex text-center flex-col'>
            <p className="text-2xl font-semibold text-blue-800">32.390€</p>
            <p className="text-gray-600">Actual Savings</p>
            </section>
        </div>

        <div className='w-1/5'>
        <Pie data={chartData} />
        </div>

      </div>

      {/* Top Auditors Section */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold">Top Auditors:</h2>
        <div className="space-y-4 mt-4">
          {[
            { name: 'Louis Sasu', role: 'Motor Appraiser', openClaims: 17, totalAudited: 258, totalLeakage: '2.897€' },
            { name: 'Bruno Márcio', role: 'Home Appraiser', openClaims: 17, totalAudited: 258, totalLeakage: '2.897€' }
          ].map((auditor, index) => (
            <div key={index} className="flex items-center space-x-4">
              <img src={`https://via.placeholder.com/40`} alt={auditor.name} className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold">{auditor.name}</p>
                <p className="text-gray-500 text-sm">{auditor.role}</p>
              </div>
              <div className="ml-auto flex space-x-6">
                <div className="text-center border bg-slate-300 p-1 ">
                  <p className="font-semibold">{auditor.openClaims}</p>
                  <p className="text-gray-500 text-sm">Open Claims</p>
                </div>
                <div className="text-center border bg-slate-300 p-1 ">
                  <p className="font-semibold">{auditor.totalAudited}</p>
                  <p className="text-gray-500 text-sm">Total Audited</p>
                </div>
                <div className="text-center border bg-slate-300 p-1 ">
                  <p className="font-semibold text-blue-600">{auditor.totalLeakage}</p>
                  <p className="text-gray-500 text-sm">Total Leakage</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeakageBrowse;
