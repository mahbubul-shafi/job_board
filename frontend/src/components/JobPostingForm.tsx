'use client'
import { useState } from "react";
import api from '@/lib/api';

export default function JobPostingForm() {
  const [formData, setFormData] = useState({
    jobTitle: "",
    experienceLevel: "",
    location: "",
    salaryFrom: "",
    salaryTo: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.post('/jobs', {
        title: formData.jobTitle,
        description: formData.description,
        location: formData.location,
        salary: `${formData.salaryFrom} - ${formData.salaryTo}`,
        experience: formData.experienceLevel
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });
  
      console.log("Job created successfully:", response.data);
    } catch(error){
      console.log("an error occured");
    }
  };

  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Post a Job</h2>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="mb-6">
            <label htmlFor="jobTitle" className="block text-lg font-medium mb-2">
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="experienceLevel" className="block text-lg font-medium mb-2">
              Experience Level
            </label>
            <select
              id="experienceLevel"
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select experience level
              </option>
              <option value="intern">Intern</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid-Level</option>
              <option value="senior">Senior</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="location" className="block text-lg font-medium mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="salaryFrom" className="block text-lg font-medium mb-2">
              Salary Range
            </label>
            <div className="flex space-x-4">
              <input
                type="number"
                id="salaryFrom"
                name="salaryFrom"
                value={formData.salaryFrom}
                onChange={handleChange}
                placeholder="From"
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="number"
                id="salaryTo"
                name="salaryTo"
                value={formData.salaryTo}
                onChange={handleChange}
                placeholder="To"
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-lg font-medium mb-2">
              Job Description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Post Job
          </button>
        </form>
      </div>
    </section>
  );
}