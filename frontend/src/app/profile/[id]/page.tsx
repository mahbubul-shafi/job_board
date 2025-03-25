import { notFound } from "next/navigation";
import api from "@/lib/api";
import { Job } from '@/types/job'
import { Profile } from '@/types/profile'

export default async function ProfileDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  try {
    // Fetch profile and jobs in parallel
    const [profileResponse, jobsResponse] = await Promise.all([
      api.get(`/profile/${id}`),
      api.get(`/specificjobs?postedBy=${id}`) // Assuming your backend supports this filter
    ]);

    const profile: Profile = profileResponse.data;
    const jobs: Job[] = jobsResponse.data;

    if (!profile) {
      notFound();
    }

    return (
      <div className="container mx-auto p-4 flex gap-8">
        {/* Left side - Profile info */}
        <div className="w-1/3 bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-4">{profile.name}</h1>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Company:</span> {profile.company || 'Not specified'}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Email:</span> {profile.email}
          </p>
          {/* Add more profile fields as needed */}
        </div>

        {/* Right side - Posted jobs */}
        <div className="w-2/3">
          <h2 className="text-2xl font-bold mb-4">Posted Jobs ({jobs.length})</h2>
          
          {jobs.length > 0 ? (
            <div className="container mx-auto p-4 flex flex-col md:flex-row gap-8">
              {jobs.map((job) => (
                <div key={job._id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p className="text-gray-600">{job.location}</p>
                  <p className="text-gray-600">${job.salary}</p>
                  <p className="text-gray-600">{job.experience} level</p>
                  {/* Add more job fields as needed */}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">This user hasn't posted any jobs yet.</p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching profile data:", error);
    notFound();
  }
}