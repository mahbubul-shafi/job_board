import Link from 'next/link';

export default function Header() {
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
              <Link href="/jobs" className="hover:text-blue-300">
                Jobs
              </Link>
            </li>
            <li>
              <Link href="/post-job" className="hover:text-blue-300">
                Post a Job
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}