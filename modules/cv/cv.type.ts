export type Education = {
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear?: number;
  description?: string;
};

export type Experience = {
  company: string;
  role: string;
  description?: string;
  startDate: string; // ISO date
  endDate?: string; // ISO date
  isCurrent?: boolean;
};

export type Project = {
  name: string;
  description: string;
  techStack?: string;
  link?: string;
};

export type Certificate = {
  name: string;
  issuer: string;
  issuedYear?: number;
  description?: string;
};

export type Interest = {
  name: string;
  description?: string;
};

export type Skill = {
  id?: number;
  name: string;
};

export type CVSkill = {
  skill: Skill;
  level?: number; // 1–5
  years?: number;
};

export type CV = {
  id: number;
  user_id: number;

  name: string;
  email: string;
  address: string;
  linkedin: string;
  about: string;

  skills: CVSkill[];
  interests: Interest[];
  educations: Education[];
  experiences: Experience[];
  projects: Project[];
  certificates: Certificate[];
};
