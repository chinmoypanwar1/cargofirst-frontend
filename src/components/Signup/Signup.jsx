import { useState } from "react";
import { useNavigate } from "react-router";
import FormInput from "../FormInput";
import { signupUser } from "../../API/userAPI.js";

const Signup = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
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

    // Basic validation
    if (!formData.fullName || !formData.email || formData.password.length < 6) {
      setMessage('Error: Please fill out all fields and ensure the password is at least 6 characters.');
      return;
    }

    setLoading(true);
    console.log('Signup data:', formData);

    try {
      // Call the actual API function from your api.js file
      const response = await signupUser(formData);

      // Handle success: show message and redirect
      setMessage('Successfully created account! Redirecting to Login...');

      // Wait for message display before redirect
      setTimeout(() => navigate("/login"), 1500);

    } catch (error) {
      console.error('Signup error:', error);

      // Handle server-side errors from Axios
      let errorMessage = 'An unexpected error occurred. Please try again.';

      if (error) {
        errorMessage = `: ${error}`;
      }
      setMessage(errorMessage);

    } finally {
      setLoading(false); // End loading state
    }

  };

  return (
    <div className="max-w-md w-full text-center bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Create Your Account</h2>

      <form onSubmit={handleSubmit}>
        <FormInput
          id="fullName"
          label="Full Name"
          value={formData.fullName}
          onChange={handleChange}
        />
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
          <div className={`mt-4 p-3 rounded-lg text-sm font-medium transition-opacity duration-300 ${message.startsWith('Successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          className="w-full mt-6 px-8 py-3 text-lg font-semibold rounded-xl text-white transition duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-600 focus:ring-opacity-50"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Sign Up Now'}
        </button>
      </form>

      <div className="mt-6 text-sm">
        <p className="text-gray-600">
          Already have an account?
          <button
            type="button"
            className="text-indigo-600 hover:text-indigo-800 font-medium ml-1"
            onClick={() => navigate("/login")}
          >
            Log in
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

export default Signup;
