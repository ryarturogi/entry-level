import Head from '@/components/partials/Head';
import { POST_JOB_SELECTION_OPTIONS } from '@/constants/index';

import generateDescription from '@/lib/openai';
import { useId, useState } from 'react';
import Select from 'react-select';

const NewJobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    jobLink: '',
    categories: '',
    skills: '',
    companyName: '',
    companyDescription: '',
    companyWebsite: '',
    companyLogo: '',
    companyEmail: '',
    companyHQ: '',
    worldwide: false,
  });
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const id = useId();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerateDescription = async (e, field) => {
    e.preventDefault();
    try {
      setIsGeneratingDescription(true);

      let prompt;
      if (field === 'jobDescription') {
        prompt = `${formData.jobTitle} - Job Description:`;
      } else if (field === 'companyDescription') {
        prompt = `${formData.companyName} - Company Description:`;
      }

      const description = await generateDescription(prompt);
      setFormData({
        ...formData,
        [field]: description,
      });
      setIsGeneratingDescription(false);
    } catch (error) {
      console.error(error);
      setIsGeneratingDescription(false);
    }
  };

  const handleCategorySelect = (selectedOption) => {
    setFormData({
      ...formData,
      categories: selectedOption.value,
    });
  };

  const handleSkillSelect = (selectedOption) => {
    setFormData({
      ...formData,
      skills: selectedOption.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Submit form data to server
    const response = await fetch('/api/jobs', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    // Handle server response
    if (response.ok) {
      // Form submitted successfully
    } else {
      // Form submission failed
    }
  };

  return (
    <div className="max-w-6xl min-h-screen p-8 mx-auto my-10 mb-20 bg-white rounded-xl">
      <Head />

      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Post a Job</h3>
            <p className="mt-1 text-sm text-gray-500">
              Welcome to the job posting form! Please fill out the following fields to post a new
              job opportunity.
            </p>
          </div>

          <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
            {/* Job Title */}
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="jobTitle">
                Job Title:
              </label>
              <div className="flex mt-1 rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 sm:text-sm">
                  Position
                </span>
                <input
                  autoComplete="new-password"
                  className="flex-1 block w-full min-w-0 border-gray-300 rounded-none rounded-r-md focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  id="job-title"
                  name="jobTitle"
                  onChange={handleChange}
                  type="text"
                  value={formData.jobTitle}
                />
              </div>
              <small className="text-gray-500">
                Example: “Senior Designer”. Titles must describe one position.
              </small>
            </div>

            {/* Category */}
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700" htmlFor="categories">
                Categories
              </label>
              <div className="mt-1">
                <Select
                  id="categories"
                  instanceId={id}
                  name="categories"
                  onChange={handleCategorySelect}
                  options={POST_JOB_SELECTION_OPTIONS.categories.map((category) => ({
                    value: category,
                    label: category,
                  }))}
                  value={formData.categories}
                />
                {formData.categories && (
                  <div className="mt-2">
                    <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-full">
                      {formData.categories}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700" htmlFor="skills">
                Skills
              </label>
              <div className="mt-1">
                <Select
                  id="skills"
                  instanceId={id}
                  isMulti
                  name="skills"
                  onChange={handleSkillSelect}
                  options={POST_JOB_SELECTION_OPTIONS.skills.map((skill) => ({
                    value: skill,
                    label: skill,
                  }))}
                  value={formData.skills}
                />
                {formData.skills && (
                  <div className="mt-2">
                    <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-full">
                      {formData.skills}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Open-World-Wide */}
            <div className="sm:col-span-3">
              <div className="space-y-4">
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      id="worldwide"
                      name="worldwide"
                      onChange={handleChange}
                      type="checkbox"
                      value={formData.worldwide}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="font-medium text-gray-700" htmlFor="worldwide">
                      Is This Role Open Worldwide?
                    </label>
                    <p className="text-gray-500">
                      Selecting &apos;Yes&apos; means your future hire can work anywhere in the
                      world without any location or time zone restrictions!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700" htmlFor="jobType">
                Job Type
              </label>
              <div className="mt-1">
                {/* radio input 2 options: Full-Time, Contract */}
                <div className="flex items-center">
                  <input
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    id="full-time"
                    name="jobType"
                    onChange={handleChange}
                    type="radio"
                    value="full-time"
                  />
                  <label className="ml-3" htmlFor="full-time">
                    <span className="block text-sm text-gray-700">Full-Time</span>
                  </label>

                  <input
                    className="w-4 h-4 ml-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    id="contract"
                    name="jobType"
                    onChange={handleChange}
                    type="radio"
                    value="contract"
                  />
                  <label className="ml-3" htmlFor="contract">
                    <span className="block text-sm text-gray-700">Contract</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700" htmlFor="jobDescription">
                Job Description
              </label>
              <div className="mt-1">
                <textarea
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  defaultValue={''}
                  id="job-description"
                  name="jobDescription"
                  onChange={handleChange}
                  rows={3}
                  value={formData.jobDescription}
                />
                <div className="float-right mt-2">
                  <button
                    className={`${
                      isGeneratingDescription || !formData.jobTitle || formData.jobDescription
                        ? 'bg-gray-300 text-gray-500'
                        : 'bg-blue-500 hover:bg-blue-700 text-white focus:ring-blue-500 cursor-pointer '
                    } px-4 py-2 font-medium text-sm rounded-md
                      inline-flex justify-center ml-3 border border-transparent shadow-sm focus:outline-none focus:ring-2  focus:ring-offset-2
                      `}
                    disabled={
                      isGeneratingDescription || !formData.jobTitle || formData.jobDescription
                    }
                    onClick={(e) => handleGenerateDescription(e, 'jobDescription')}
                    type="button"
                  >
                    {(!isGeneratingDescription && <span>Generate Job Description</span>) || (
                      <div className="flex items-center space-x-2">
                        <svg
                          className="w-5 h-5 mr-3 -ml-1 text-blue-500 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            d="M4 12a8 8 0 018-8v8z"
                            fill="currentColor"
                          />
                        </svg>
                        Generating description...
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Application Link or Email ●
             */}
            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700" htmlFor="applicationLink">
                Application Link or Email
              </label>
              <div className="mt-1">
                <input
                  autoComplete="new-password"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  id="application-link"
                  name="applicationLink"
                  onChange={handleChange}
                  type="text"
                  value={formData.applicationLink}
                />
              </div>
            </div>
          </div>

          <div className="pt-8">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Tell Us More About Your Company
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                <strong>Posted before?</strong> Just enter your <strong>email</strong>, all other
                info will be pulled in from your last position!
              </p>
            </div>
            <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700" htmlFor="companyName">
                  Company name
                </label>
                <div className="mt-1">
                  <input
                    autoComplete="new-password"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    id="company-name"
                    name="companyName"
                    onChange={handleChange}
                    type="text"
                    value={formData.companyName}
                  />
                </div>
                <small className="text-gray-500">Enter your company or organization’s name.</small>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700" htmlFor="companyHQ">
                  Company HQ
                </label>
                <div className="mt-1">
                  <input
                    autoComplete="new-password"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    id="company-hq"
                    name="companyHQ"
                    onChange={handleChange}
                    type="text"
                    value={formData.companyHQ}
                  />
                </div>
                <small className="text-gray-500">
                  Where your company is officially headquartered.
                </small>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    autoComplete="new-password"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    type="email"
                    value={formData.email}
                  />
                </div>
                <small className="text-gray-500">
                  We’ll send your receipt and confirmation email here.
                </small>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700" htmlFor="companyWebsite">
                  Company&apos;s Website URL
                </label>
                <div className="mt-1">
                  <input
                    autoComplete="new-password"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    id="company-website"
                    name="companyWebsite"
                    onChange={handleChange}
                    type="text"
                    value={formData.companyWebsite}
                  />
                </div>
                <small className="text-gray-500">Example: https://mybusiness.com/</small>
              </div>

              {/* Company Description */}
              <div className="sm:col-span-6">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="companyDescription"
                >
                  Company Description
                </label>
                <div className="mt-1">
                  <textarea
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    defaultValue={''}
                    id="company-description"
                    name="companyDescription"
                    onChange={handleChange}
                    rows={3}
                    value={formData.companyDescription}
                  />
                  <div className="float-right mt-2">
                    <button
                      className={`${
                        isGeneratingDescription ||
                        !formData.companyName ||
                        formData.companyDescription
                          ? 'bg-gray-300 text-gray-500'
                          : 'bg-blue-500 hover:bg-blue-700 text-white focus:ring-blue-500 cursor-pointer '
                      } px-4 py-2 font-medium text-sm rounded-md
                      inline-flex justify-center ml-3 border border-transparent shadow-sm focus:outline-none focus:ring-2  focus:ring-offset-2
                      `}
                      disabled={
                        isGeneratingDescription ||
                        !formData.companyName ||
                        formData.companyDescription
                      }
                      onClick={(e) => handleGenerateDescription(e, 'companyDescription')}
                      type="button"
                    >
                      {(!isGeneratingDescription && <span>Generate Company Description</span>) || (
                        <div className="flex items-center space-x-2">
                          <svg
                            className="w-5 h-5 mr-3 -ml-1 text-blue-500 animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              d="M4 12a8 8 0 018-8v8z"
                              fill="currentColor"
                            />
                          </svg>
                          Generating description...
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              type="button"
            >
              Cancel
            </button>
            <button
              className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={handleSubmit}
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewJobForm;
