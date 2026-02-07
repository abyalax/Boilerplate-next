import z from 'zod';

// ----------------- Education -----------------
export const educationSchema = z.object({
  name: z.string().min(3, { message: 'Please enter the name of your education, at least 3 characters' }),
  major: z.string().min(3, { message: 'Please enter the major of your education' }),
});

// ----------------- Experience -----------------
export const experienceSchema = z.object({
  role: z.string().min(3, { message: 'Please enter the role of your experience, at least 3 characters' }),
  company: z.string().min(3, { message: 'Please enter the company of your experience, at least 3 characters' }),
  description: z
    .string()
    .min(10, { message: 'Please enter the description of your experience, at least 10 characters' })
    .optional(),
  start: z.string().min(4, { message: 'Please enter the start date of your experience' }).optional(),
  end: z.string().min(4, { message: 'Please enter the end date of your experience' }).optional(),
});

// ----------------- Project -----------------
export const projectSchema = z.object({
  title: z.string().min(3, { message: 'Please enter the title of your project, at least 3 characters' }),
  description: z.string().min(10, { message: 'Please enter the description of your project, at least 10 characters' }),
});

// ----------------- Certificate -----------------
export const certificateSchema = z.object({
  title: z.string().min(3, { message: 'Please enter the title of your certificate, at least 3 characters' }),
  issuer: z.string().min(3, { message: 'Please enter the issuer of your certificate, at least 3 characters' }),
  year: z.number({ error: 'Please enter a valid year for your certificate' }).optional(),
  url: z.string().url({ message: 'Please enter a valid URL for your certificate' }).optional(),
});

// ----------------- CV -----------------
export const cvSchema = z.object({
  name: z.string().min(3, { message: 'Please enter your name, at least 3 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  address: z.string().min(10, { message: 'Please enter your address, at least 10 characters' }),
  linkedin: z.string().url({ message: 'Please enter a valid LinkedIn URL' }),
  about: z.string().min(10, { message: 'Please enter a brief description about yourself, at least 10 characters' }),

  interests: z.array(z.string().min(3, { message: 'Each interest must be at least 3 characters' })),
  skills: z.array(z.string().min(3, { message: 'Each skill must be at least 3 characters' })),

  educations: z.array(educationSchema).min(1, { message: 'Please enter at least one education' }),
  experiences: z.array(experienceSchema).optional(),
  projects: z.array(projectSchema).optional(),
  certificates: z.array(certificateSchema).optional(),
});

export type FormDataCV = z.infer<typeof cvSchema>;
