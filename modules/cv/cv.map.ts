import { Prisma } from '~/generated/prisma/client';
import { CV } from './cv.type';

export type CVWithRelations = Prisma.CVGetPayload<{
  include: {
    interests: true;
    educations: true;
    experiences: true;
    projects: true;
    certificates: true;
    skills: {
      include: {
        skill: true;
      };
    };
  };
}>;

export const CVMapper = {
  toDTO: (cv: CVWithRelations): CV => {
    return {
      id: cv.id,
      user_id: cv.user_id,
      name: cv.name,
      email: cv.email,
      address: cv.address,
      linkedin: cv.linkedin,
      about: cv.about,

      interests: cv.interests.map((i) => ({
        name: i.name,
        description: i.description ?? undefined,
      })),

      skills: cv.skills.map((cs) => ({
        skill: {
          id: cs.skill.id,
          name: cs.skill.name,
        },
        level: cs.level ?? undefined,
        years: cs.years ?? undefined,
      })),

      educations: cv.educations.map((e) => ({
        institution: e.institution,
        degree: e.degree,
        field: e.field,
        startYear: e.startYear,
        endYear: e.endYear ?? undefined,
        description: e.description ?? undefined,
      })),

      experiences: cv.experiences.map((e) => ({
        company: e.company,
        role: e.role,
        description: e.description ?? undefined,
        startDate: e.startDate.toISOString(),
        endDate: e.endDate ? e.endDate.toISOString() : undefined,
        isCurrent: e.isCurrent,
      })),

      projects: cv.projects.map((p) => ({
        name: p.name,
        description: p.description,
        techStack: p.techStack ?? undefined,
        link: p.link ?? undefined,
      })),

      certificates: cv.certificates.map((c) => ({
        name: c.name,
        issuer: c.issuer,
        issuedYear: c.issuedYear ?? undefined,
        description: c.description ?? undefined,
      })),
    };
  },
};
