const Sidebar = ({ setActiveView, activeView, onLogout }) => {
  const dashboardViews = {
    JOB_POSTED: "JOB_POSTED",
    PROFILE: "PROFILE",
    CUSTOMER_ANALYSIS: "CUSTOMER_ANALYSIS",
  };

  const navItems = [
    { label: dashboardViews.JOB_POSTED, icon: "", name: "Job Posted" },
    { label: dashboardViews.PROFILE, icon: "", name: "Profile" },
    { label: dashboardViews.CUSTOMER_ANALYSIS, icon: "", name: "Analysis" },
  ];

  return (
    <div className="w-full md:w-64 bg-gray-800 text-white flex-shrink-0 flex flex-col p-4">
      <div className="text-2xl font-bold mb-8 text-indigo-400">CargoFirst</div>

      <nav className="flex-grow space-y-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveView(item.label)}
            className={`w-full text-left py-3 px-4 rounded-lg transition-colors duration-200 flex items-center ${
              activeView === item.label
                ? "bg-indigo-600 font-semibold shadow-md"
                : "hover:bg-gray-700"
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </button>
        ))}
      </nav>

      <div className="pt-4 border-t border-gray-700">
        <button
          onClick={onLogout}
          className="w-full text-left py-3 px-4 rounded-lg text-red-400 hover:bg-gray-700 transition-colors duration-200 flex items-center"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

