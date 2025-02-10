export type Job = {
  id: string;
  jobTitle: string;
  jobDescription: string;
  companySlug: string;
  companyLogo: string;
  companyName: string;
  location: string;
  jobCategory: string;
  jobSalary: number;
  jobType: string;
  createdAt: string;
  isFeatured: boolean;
  isGuaranteed: boolean;
  jobTags: string[];
  hasCompanyLogo: boolean;
};

export interface JobsByCompanyProps {
  jobs: Job[];
  error: string | null;
}
