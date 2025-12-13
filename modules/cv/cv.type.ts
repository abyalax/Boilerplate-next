export type Education = {
  name: string;
  major: string;
};

export type Experience = {
  role: string;
  company: string;
  description?: string;
  start?: string;
  end?: string;
};

export type Project = {
  title: string;
  description: string;
};

export type Certificate = {
  title: string;
  issuer: string;
  year?: number;
  url?: string;
};

export type CV = {
  id: number;
  name: string;
  user_id: number;
  email: string;
  address: string;
  about: string;
  linkedin: string;
  interest: string[];
  skill: string[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  certificate: Certificate[];
};
