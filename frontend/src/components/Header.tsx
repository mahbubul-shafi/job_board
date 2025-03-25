"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import api from "@/lib/api";

export default function Header() {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleMyProfile = async () => {
    try {
      // Get current user's data
      const response = await api.get("/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const userId = response.data._id;

      // Redirect to profile page
      router.push(`/profile/${userId}`);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  const handleLogout = () => {
    logout(); // Call the logout function from the AuthContext
    router.push("/"); // Redirect to the home page
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Job Search Platform</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-blue-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/profile" className="hover:text-blue-300">
                All users
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link href="/my-applications" className="hover:text-blue-300">
                    My Applications
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleMyProfile}
                    className="hover:text-blue-300"
                  >
                    My profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:text-blue-300"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login" className="hover:text-blue-300">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="hover:text-blue-300">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
