"use client"; // Mark this as a Client Component

import { useState, useRef, useEffect } from "react";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import JobListings from "@/components/JobListings";
import JobPostingForm from "@/components/JobPostingForm";

export default function Home() {
  const [activeView, setActiveView] = useState<"browseJobs" | "postJob">("browseJobs");

  // Create refs for scrolling
  const browseJobsRef = useRef<HTMLDivElement>(null);
  const postJobRef = useRef<HTMLDivElement>(null);

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
          <JobListings />
        </div>
      ) : (
        <div ref={postJobRef} className="fade-in">
          <JobPostingForm />
        </div>
      )}
    </main>
  );
}