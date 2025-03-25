"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import Link from "next/link";

type UserProfile = {
  _id: string;
  name: string;
  email: string;
  company?: string;
  // Add other fields you expect
};

export default function ProfileListingsPage() {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await api.get("/profiles");
        console.log("Profiles data:", response.data);
        setProfiles(response.data);
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to load profiles. Please try again.");
      }
    };
    fetchProfiles();
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!profiles.length) return <div>Loading profiles...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">User Profiles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.map((profile) => (
          <Link
            key={profile._id}
            href={`/profile/${profile._id}`}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <p>{profile.email}</p>
            {profile.company && <p>Company: {profile.company}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}
