interface HeroProps {
    onBrowseJobs: () => void;
    onPostJob: () => void;
  }
  
  export default function Hero({ onBrowseJobs, onPostJob }: HeroProps) {
    return (
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Find Your Dream Job
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Join thousands of companies and candidates on the best job board platform.
          </p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <button
              onClick={onBrowseJobs}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300"
            >
              Browse Jobs
            </button>
            <button
              onClick={onPostJob}
              className="bg-transparent border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
            >
              Post a Job
            </button>
          </div>
        </div>
      </section>
    );
  }