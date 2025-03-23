import Link from "next/link";
import { Job } from "@/types/job";

interface JobListingsProps {
  jobs: Job[]; // Use the Job interface
}

export default function JobListings({ jobs }: JobListingsProps) {
  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Available Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job) => (
          <Link
            key={job._id}
            href={`/jobs/${job._id}`}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
            <p className="text-gray-600 mb-4">{job.description}</p>
            <p className="text-sm text-gray-500">{job.location}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}