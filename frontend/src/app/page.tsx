"use client"; // Mark this as a Client Component

import { useState, useRef, useEffect } from "react";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import JobListings from "@/components/JobListings";
import JobPostingForm from "@/components/JobPostingForm";
import api from "@/lib/api";
import { Job } from "@/types/job";

export default function Home() {
  const [activeView, setActiveView] = useState<"browseJobs" | "postJob">("browseJobs");
  const [jobs, setJobs] = useState<Job[]>([]); // State to store jobs
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading
  const [error, setError] = useState<string>(""); // State to handle errors

  // Create refs for scrolling
  const browseJobsRef = useRef<HTMLDivElement>(null);
  const postJobRef = useRef<HTMLDivElement>(null);

  // Fetch jobs from the backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/jobs");
        setJobs(response.data);
      } catch (error) {
        setError("Failed to fetch jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleBrowseJobs = () => {
    setActiveView("browseJobs");
  };

  const handlePostJob = () => {
    setActiveView("postJob");
  };

  // Use useEffect to scroll after the state has been updated
  useEffect(() => {
    if (activeView === "browseJobs" && browseJobsRef.current) {
      browseJobsRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (activeView === "postJob" && postJobRef.current) {
      postJobRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeView]);

  return (
    <main>
      <Hero onBrowseJobs={handleBrowseJobs} onPostJob={handlePostJob} />

      {activeView === "browseJobs" ? (
        <div ref={browseJobsRef} className="fade-in">
          <SearchBar />
          {loading ? (
            <p className="text-center">Loading jobs...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <JobListings jobs={jobs} />
          )}
        </div>
      ) : (
        <div ref={postJobRef} className="fade-in">
          <JobPostingForm />
        </div>
      )}
    </main>
  );
}