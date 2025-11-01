import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

// --- Acquisition Chart Component ---
const AcquisitionChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return; // Guard
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    if (chartInstance.current) chartInstance.current.destroy();

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "New Customers",
            data: [120, 190, 300, 50, 200, 300],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: "Customer Acquisition (Last 6 Months)",
            padding: 10,
          },
        },
        scales: { y: { beginAtZero: true } },
      },
    });

    return () => chartInstance.current?.destroy();
  }, []);

  return (
    <div className="h-64">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

// --- Revenue Chart Component ---
const RevenueChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return; // Guard
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    if (chartInstance.current) chartInstance.current.destroy();

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Enterprise", "SMB", "Individual"],
        datasets: [
          {
            label: "Revenue Share",
            data: [65, 25, 10],
            backgroundColor: ["#4f46e5", "#10b981", "#f59e0b"],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Revenue Distribution by Segment",
            padding: 10,
          },
        },
      },
    });

    return () => chartInstance.current?.destroy();
  }, []);

  return (
    <div className="h-64">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

// --- Main Dashboard Component ---
const CustomerAnalysis = () => {
  const kpis = [
    { title: "Total Customers", value: "4,521", change: "+12.5%", color: "indigo", icon: "" },
    { title: "Avg. Revenue/User", value: "$189.50", change: "-2.1%", color: "green", icon: "" },
    { title: "Churn Rate", value: "1.8%", change: "-0.5%", color: "red", icon: "" },
    { title: "Active Jobs Posted", value: "84", change: "+25%", color: "yellow", icon: "" },
  ];

  const colorMap = {
    indigo: "border-indigo-500",
    green: "border-green-500",
    red: "border-red-500",
    yellow: "border-yellow-500",
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto p-2">
      <h3 className="text-3xl font-extrabold text-gray-900 mb-6">
        Customer Analytics Dashboard
      </h3>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi) => (
          <div
            key={kpi.title}
            className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${colorMap[kpi.color]} transition duration-300 hover:shadow-xl`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">{kpi.title}</p>
              <span className="text-2xl">{kpi.icon}</span>
            </div>
            <div className="mt-1">
              <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
              <div className="flex items-center mt-2">
                <span
                  className={`text-sm font-semibold ${kpi.change.startsWith("+") ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {kpi.change}
                </span>
                <span className="ml-2 text-xs text-gray-500">Since last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <AcquisitionChart />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <RevenueChart />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg lg:col-span-2">
          <h4 className="text-xl font-semibold text-gray-700 mb-4">
            Job Posting Activity Over Time
          </h4>
          <p className="text-gray-500">
            This is a placeholder for a future chart (e.g., a Line Chart showing weekly job posting
            volume).
          </p>
        </div>
      </div>

      <p className="mt-8 text-sm text-gray-400 text-center">
        *Mock Data Notice: All figures and charts are based on dummy data for demonstration.*
      </p>
    </div>
  );
};

export default CustomerAnalysis;

