import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import JobPostingView from "./JobPostingView";
import ProfileSettings from "./ProfileSettings";
import CustomerAnalysis from "./CustomerAnalysis";
import { dashboardViews } from "./constants";
import { getUserDetails, logoutUser } from "../../API/userAPI";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState(dashboardViews.PROFILE);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserDetails();
        if (!data) throw new Error("Not authenticated");
        setUser(data);
        setIsAuthenticated(true);
      } catch (err) {
        console.error(err);
        alert("You are not supposed to be here");
        navigate("/"); // redirect
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return null;


  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsAuthenticated(false);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case dashboardViews.JOB_POSTED:
        return <JobPostingView />;
      case dashboardViews.PROFILE:
        return <ProfileSettings fullName={user.fullname} email={user.email} userId={user._id} />;
      case dashboardViews.CUSTOMER_ANALYSIS:
        return <CustomerAnalysis />;
      default:
        return <ProfileSettings user={user} />;
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex w-full h-screen"> {/* full viewport height */}
      <Sidebar
        setActiveView={setActiveView}
        activeView={activeView}
        onLogout={handleLogout}
      />
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        {renderContent()}
      </main>
    </div>

  );
};

export default Dashboard;

