interface Job {
  id: string;
  createdAt: string;
  isFeatured: boolean;
  isGuaranteed: boolean;
  jobTitle: string;
  jobTags: string[];
  jobDescription: string;
  companySlug: string;
  companyLogo: string;
  companyName: string;
  hasCompanyLogo: boolean;
  location: string;
  jobCategory: string;
  jobSalary: number;
  jobType: string;
}

export interface JobCardItemProps {
  job: Job;
}

export interface JobContentProps {
  job: Job;
}

export interface JobActionsProps {
  id: string;
  outlined?: boolean;
}

export interface JobMetaProps {
  location: string;
  jobType: string;
  jobCategory: string;
  jobSalary: number;
  jobTags: string[];
}
