import Link from "next/link";

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  experience: string;
  company: string;
}

// Mock data for a single job (replace with API call later)
const job: Job = {
  id: "1",
  title: "Frontend Developer",
  description:
    "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building and maintaining user interfaces for our web applications.",
  location: "Remote",
  salary: "$80,000 - $100,000",
  experience: "2+ years",
  company: "Tech Corp",
};

export default function JobPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-4 text-blue-600">{job.title}</h1>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Company:</span> {job.company}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Location:</span> {job.location}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Salary:</span> {job.salary}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Experience:</span> {job.experience}
          </p>
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Job Description</h2>
            <p className="text-gray-700">{job.description}</p>
          </div>
          <div className="mt-8">
            <Link
              href={`/jobs/${job.id}/apply`}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 text-center block"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}