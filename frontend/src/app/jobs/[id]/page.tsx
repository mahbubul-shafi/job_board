import { notFound } from "next/navigation";
import api from "@/lib/api";

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  experience: string;
  company: string;
  employer_email: string;
}

export default async function JobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  // Fetch the job details from the backend
  const response = await api.get(`/jobs/${id}`);
  const job: Job = response.data;

  if (!job) {
    notFound(); // Show a 404 page if the job is not found
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <p className="text-gray-600 mb-2">{job.company}</p>
      <p className="text-gray-600 mb-2">{job.location}</p>
      <p className="text-gray-600 mb-2">{job.salary}</p>
      <p className="text-gray-600 mb-2">{job.experience}</p>
      <p className="text-gray-600 mb-2">{job.employer_email}</p>
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Job Description</h2>
        <p className="text-gray-700">{job.description}</p>
      </div>
    </div>
  );
}