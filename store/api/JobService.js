import { createApi } from '@reduxjs/toolkit/query/react';
import sanitizeHtml from 'sanitize-html';

import baseQuery from './BaseQuery';

const mappedData = (data) => {
  return data.map((job) => ({
    companyDescription: job.company_description,
    companyLogo: job.company_logo,
    companyName: job.company_name,
    createdAt: new Date(job.publication_date),
    hasCompanyColor: {
      color: '#ffffff',
      isActive: false,
    },
    hasCompanyLogo: Boolean(job.company_logo),
    howToApply: job.url,
    id: job.id,
    jobCategory: job.category,
    jobDescription: job.description,
    jobTags: job.tags,
    jobTitle: job.title,
    jobType: job.job_type,
    location: job.candidate_required_location,
    salary: job.salary,
  }));
};

export const JobApi = createApi({
  baseQuery,
  endpoints: (builder) => ({
    getJob: builder.query({
      query: (id) => `jobs?id=${id}`,
      transformResponse: (data) => {
        // eslint-disable-next-line prefer-destructuring
        const job = data[0];

        return {
          companyDescription: sanitizeHtml(job.company_description),
          companyLogo: job.company_logo,
          companyName: job.company_name,
          createdAt: job.publication_date,
          hasCompanyColor: {
            color: '#ffffff',
            isActive: false,
          },
          hasCompanyLogo: Boolean(job.company_logo),
          howToApply: sanitizeHtml(job.url),
          id: job.id,
          jobCategory: job.category,
          jobDescription: sanitizeHtml(job.description),
          jobTags: job.tags,
          jobTitle: job.title,
          jobType: job.job_type,
          location: job.candidate_required_location,
          salary: job.salary,
        };
      },
      validatesTags: ['Job'],
    }),
    getJobs: builder.query({
      query: () => 'jobs?_limit=100',
      transformResponse: (data) => {
        return mappedData(data);
      },
      validatesTags: ['Jobs'],
    }),
    getJobsByType: builder.query({
      query: (type) => `jobs?job_type=${type}&_limit=100`,
      transformResponse: (data) => {
        return mappedData(data);
      },
    }),
  }),
  reducerPath: 'JobApi',
  refetchOnReconnect: true,
  tagTypes: ['Jobs', 'Job'],
});

export const { useGetJobsQuery, useGetJobQuery, useGetJobsByTypeQuery } = JobApi;
