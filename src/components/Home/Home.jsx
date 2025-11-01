import { Button } from "@heroui/button";
import { useNavigate } from "react-router";

function Home() {

  const navigate = useNavigate();

  const toLogin = () => {
    navigate("/login");
  }

  const toSignup = () => {
    navigate("/signup");
  }

  return (
    <div className="max-w-xl w-full text-center p-8 md:p-12 rounded-2xl">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
        The <span className="text-primary">Best Customer Analysis Software</span> to Drive Growth
      </h1>
      <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto">
        Turn raw data into actionable insights and unlock your next level of customer engagement.
      </p>
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
        <Button color="primary" variant="solid" size="lg" radius="md" onPress={toSignup}>
          Sign up
        </Button>
        <Button color="primary" variant="bordered" size="lg" radius="md" onPress={toLogin}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default Home;
