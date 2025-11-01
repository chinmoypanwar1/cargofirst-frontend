const FormInput = ({ id, label, type = 'text', value, onChange }) => (
  <div className="mb-4 text-left">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      required
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-indigo-600 focus:border-indigo-600 transition duration-150 ease-in-out"
      placeholder={`Enter your ${label.toLowerCase()}`}
    />
  </div>
);

export default FormInput;
