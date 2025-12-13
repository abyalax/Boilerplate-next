import z from 'zod';

export const educationSchema = z.object({
  name: z.string().min(3, { message: 'Please enter the name of your education, at least 3 characters' }),
  major: z.string({ message: 'Please enter the major of your education' }),
});

export const experienceSchema = z.object({
  role: z.string().min(3, { message: 'Please enter the role of your experience, at least 3 characters' }),
  company: z.string().min(3, { message: 'Please enter the company of your experience, at least 3 characters' }),
  description: z.string({ message: 'Please enter the description of your experience' }),
  start: z.string({ message: 'Please enter the start date of your experience' }),
  end: z.string({ message: 'Please enter the end date of your experience' }),
});

export const projectSchema = z.object({
  title: z.string().min(3, { message: 'Please enter the title of your project, at least 3 characters' }),
  description: z.string().min(10, { message: 'Please enter the description of your project, at least 10 characters' }),
});

export const certificateSchema = z.object({
  title: z.string().min(3, { message: 'Please enter the title of your certificate, at least 3 characters' }),
  issuer: z.string().min(3, { message: 'Please enter the issuer of your certificate, at least 3 characters' }),
  year: z.number({ message: 'Please enter the year of your certificate' }),
  url: z.string({ message: 'Please enter the url of your certificate' }),
});

export const cvSchema = z.object({
  name: z.string().min(3, { message: 'Please enter your name, at least 3 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  address: z.string().min(10, { message: 'Please enter your address, at least 10 characters' }),
  linkedin: z.string().url({ message: 'Please enter a valid LinkedIn URL' }),
  about: z.string().min(10, { message: 'Please enter a brief description about yourself, at least 10 characters' }),

  interest: z.array(z.string()).min(1, { message: 'Please enter at least one interest' }),
  skill: z.array(z.string()).min(1, { message: 'Please enter at least one skill' }),

  education: z.array(educationSchema),

  experience: z.array(experienceSchema).optional(),

  projects: z.array(projectSchema).optional(),

  certificate: z.array(certificateSchema),
});

export type FormDataCV = z.infer<typeof cvSchema>;
