interface Job {
    id: number;
    title: string;
    description: string;
    location: string;
  }
  
  const jobs: Job[] = [
    {
      id: 1,
      title: "Frontend Developer",
      description: "Join our team as a frontend developer and build amazing user interfaces.",
      location: "Remote",
    },
    {
      id: 2,
      title: "Backend Developer",
      description: "Work on scalable backend systems and APIs.",
      location: "New York, NY",
    },
    {
      id: 3,
      title: "Full Stack Developer",
      description: "Develop end-to-end solutions for our clients.",
      location: "San Francisco, CA",
    },
  ];
  
  export default function JobListings() {
    return (
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Available Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <p className="text-gray-600 mb-4">{job.description}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }