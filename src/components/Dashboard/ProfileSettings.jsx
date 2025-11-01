
const ProfileSettings = ({fullName, email, userId}) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg h-full overflow-y-auto">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">User Profile & Settings</h3>
      <div className="space-y-6">

        {/* Account Details Card */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-4 mb-4">
            <p className="text-xl font-semibold text-gray-700">Account Information</p>
          </div>

          <div className="space-y-2 text-gray-600">
            <p><strong>Full Name:</strong> {fullName} </p>
            <p><strong>Email:</strong> {email} </p>
            <p><strong>User ID:</strong> {userId} </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileSettings;
