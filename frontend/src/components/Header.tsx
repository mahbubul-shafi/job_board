'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

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
            {isLoggedIn ? (
              <li>
                <button onClick={handleLogout} className="hover:text-blue-300">
                  Logout
                </button>
              </li>
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