import { HeroUIProvider } from "@heroui/system"
import { Routes, Route } from "react-router"
import HomePage from "./pages/HomePage"
import DashboardPage from "./pages/DashboardPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"

function App() {

  return (
    <div className="h-screen w-screen">
      <HeroUIProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </HeroUIProvider>
    </div>
  )
}

export default App
