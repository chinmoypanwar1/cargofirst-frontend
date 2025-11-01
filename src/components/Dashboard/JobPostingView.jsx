import { useState, useEffect } from 'react';
import FormInput from '../FormInput';
import { getJobsAPI, postJobAPI } from '../../API/jobAPI';

const JobPostingView = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    jobDescription: '',
    lastDate: '',
  });
  const [postedJobs, setPostedJobs] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch jobs on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobsAPI();
        // Map backend response to frontend-friendly structure
        const jobs = response.map(job => ({
          id: job._id,
          title: job.title,
          companyName: job.companyName,
          date: new Date(job.createdAt).toISOString().split('T')[0],
          lastDate: new Date(job.lastDate).toISOString().split('T')[0],
          description: job.description,
          status: new Date(job.lastDate) < new Date() ? 'Expired' : 'Active',
        }));
        setPostedJobs(jobs);
      } catch (err) {
        setMessage(err.message || 'Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newJobPayload = {
        title: formData.jobTitle,
        companyName: formData.companyName,
        description: formData.jobDescription,
        lastDate: formData.lastDate,
      };
      const response = await postJobAPI(newJobPayload);

      const newJob = {
        id: response._id,
        title: response.title,
        companyName: response.companyName,
        date: new Date(response.createdAt).toISOString().split('T')[0],
        lastDate: new Date(response.lastDate).toISOString().split('T')[0],
        description: response.description,
        status: new Date(response.lastDate) < new Date() ? 'Expired' : 'Active',
      };

      setPostedJobs([newJob, ...postedJobs]);
      setMessage('Job successfully submitted!');
      setFormData({ jobTitle: '', companyName: '', jobDescription: '', lastDate: '' });
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.message || 'Failed to submit job');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) return <div>Loading jobs...</div>;

  return (
    <div className="flex flex-col h-full overflow-y-auto space-y-8">

      {/* Job Posting Form */}
      <div className="p-6 bg-white rounded-xl shadow-lg flex-shrink-0">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Post a New Job</h3>
        {message && (
          <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput id="jobTitle" label="Job Title" value={formData.jobTitle} onChange={handleChange} />
          <FormInput id="companyName" label="Company Name" value={formData.companyName} onChange={handleChange} />
          <div className="text-left">
            <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Job Description
            </label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              required
              rows="4"
              value={formData.jobDescription}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-indigo-600 focus:border-indigo-600 transition duration-150 ease-in-out"
              placeholder="Detail the job responsibilities and requirements..."
            ></textarea>
          </div>
          <FormInput id="lastDate" label="Last Date for Application" value={formData.lastDate} onChange={handleChange} type="date" />
          <button type="submit" className="w-full px-8 py-3 text-lg font-semibold rounded-xl text-white bg-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-600 focus:ring-opacity-50">
            Submit Job Posting
          </button>
        </form>
      </div>

      {/* Posted Jobs List */}
      <div className="p-6 bg-white rounded-xl shadow-lg flex-grow">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Your Posted Jobs ({postedJobs.length})</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {postedJobs.map((job) => (
                <tr key={job.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.companyName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {postedJobs.length === 0 && (
          <p className="p-4 text-center text-gray-500 italic">No jobs posted yet.</p>
        )}
      </div>
    </div>
  );
};

export default JobPostingView;

