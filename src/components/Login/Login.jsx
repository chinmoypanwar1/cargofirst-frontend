import { useState } from "react";
import { useNavigate } from "react-router";
import FormInput from "../FormInput";
import { loginUser } from "../../API/userAPI";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (message) setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Basic mock validation
    if (!formData.email || formData.password.length < 6) {
      setMessage('Error: Please enter a valid email and a password of at least 6 characters.');
      return;
    }

    console.log('Login data:', formData);
    setLoading(true);

    try {
      const response = await loginUser(formData);
      navigate("/dashboard")
    } catch (error) {
      console.error('Login error:', error);

      let errorMessage = 'An unexpected error occurred. Please try again.';

      if (error) {
        errorMessage = `${error}`;
      }
      setMessage(errorMessage);

    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="max-w-md w-full text-center bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Welcome Back</h2>
      <p className="text-gray-500 mb-6">Sign in to access your customer analysis dashboard.</p>

      <form onSubmit={handleSubmit}>
        <FormInput
          id="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <FormInput
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />

        {message && (
          <div className={`mt-4 p-3 rounded-lg text-sm font-medium transition-opacity duration-300 ${message.startsWith('Login successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          className="w-full mt-6 px-8 py-3 text-lg font-semibold rounded-xl text-white transition duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-600 focus:ring-opacity-50"
          disabled={loading}
        >
          {loading ? 'Logging In...' : 'Log In'}
        </button>
      </form>

      <div className="mt-6 text-sm">
        <p className="text-gray-600">
          Don't have an account?
          <button
            type="button"
            className="text-indigo-600 hover:text-indigo-800 font-medium ml-1"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </p>
        <button
          type="button"
          className="text-gray-400 hover:text-gray-600 font-medium mt-2 text-xs"
          onClick={() => navigate("/")}
        >
          ← Back to Homepage
        </button>
      </div>
    </div>
  );
};

export default Login;
