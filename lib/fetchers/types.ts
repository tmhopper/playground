export type FetchedJob = {
  title: string;
  company: string;
  location?: string;
  workMode?: string;
  url?: string;
  description?: string;
  reqNumber?: string;
  salaryMin?: number;
  salaryMax?: number;
};

export type FetchResult = {
  jobs: FetchedJob[];
  source: string; // which adapter was used
  error?: string; // non-fatal warning
};
