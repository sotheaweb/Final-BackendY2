import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

const transactionData = [
  { month: "Jan", income: 3200, expense: 2100 },
  { month: "Feb", income: 2800, expense: 1700 },
  { month: "Mar", income: 3500, expense: 1900 },
  { month: "Apr", income: 4000, expense: 2200 },
  { month: "May", income: 3000, expense: 2500 },
  { month: "Jun", income: 4500, expense: 2400 },
  { month: "Jul", income: 3800, expense: 2000 },
  { month: "Aug", income: 4200, expense: 2100 },
  { month: "Sep", income: 3700, expense: 2300 },
  { month: "Oct", income: 3900, expense: 1900 },
  { month: "Nov", income: 4100, expense: 2000 },
  { month: "Dec", income: 4300, expense: 2200 },
];


const income = 3000;
const expense = 1500;
const balance = income - expense;

const pieData = [
  { name: "ចំណូល", value: income },
  { name: "ចំណាយ", value: expense }
];

const COLORS = ["#00C49F", "#FF8042"];

export default function AnalystPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">ទំព័រ វិភាគហិរញ្ញវត្ថុ</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold">ចំណូលសរុប</h2>
          <p className="text-green-500 text-2xl font-bold">${income}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold">ចំណាយសរុប</h2>
          <p className="text-red-500 text-2xl font-bold">${expense}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold">សមតុល្យ</h2>
          <p className="text-blue-500 text-2xl font-bold">${balance}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">Pie Chart</h2>
          <PieChart width={300} height={300}>
            <Pie data={pieData} dataKey="value" outerRadius={100} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">Bar Chart (Month)</h2>
          <BarChart width={400} height={300} data={transactionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#00C49F" />
            <Bar dataKey="expense" fill="#FF8042" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
