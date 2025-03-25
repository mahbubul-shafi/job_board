import Link from "next/link";
import { Profile } from "@/types/profile";

interface ProfileListingsProps {
  profiles: Profile[]; // Use the profile interface
}

export default function ProfileListings({ profiles }: ProfileListingsProps) {
  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Available profiles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {profiles.map((profile) => (
          <Link
            key={profile._id}
            href={`/profile/${profile._id}`}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">{profile.name}</h3>
            <p className="text-gray-600 mb-4">{profile.email}</p>
            <p className="text-sm text-gray-500">{profile.company}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}