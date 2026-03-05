import { prisma } from '~/db/prisma';
import { mockCVs } from '../data';

export async function cvSeeder() {
  console.log('⚡ Seeding deterministic cv...');

  // --- Insert CV (mockCVs imported) ---
  for (const cv of mockCVs) {
    await prisma.cV.create({
      data: {
        user_id: cv.user_id,
        name: cv.name,
        email: cv.email,
        address: cv.address,
        linkedin: cv.linkedin,
        about: cv.about,

        // ---- Interests
        interests: {
          create: cv.interest.map((name) => ({
            name,
            description: name,
          })),
        },

        // ---- Skills (pivot + master)
        skills: {
          create: cv.skill.map((skillName) => ({
            skill: {
              connectOrCreate: {
                where: { name: skillName },
                create: { name: skillName },
              },
            },
          })),
        },

        // ---- Education
        educations: {
          create: cv.education.map((edu) => ({
            institution: edu.institution,
            degree: edu.degree,
            major: edu.major,
            startYear: edu.startYear,
            endYear: edu.endYear,
            description: edu.description,
          })),
        },

        // ---- Experience
        experiences: {
          create: cv.experience.map((exp) => ({
            company: exp.company,
            role: exp.role,
            description: exp.description,
            startDate: new Date(exp.startDate),
            endDate: exp.endDate ? new Date(exp.endDate) : null,
            isCurrent: exp.isCurrent ?? false,
          })),
        },

        // ---- Projects
        projects: {
          create: cv.projects.map((project) => ({
            name: project.name,
            description: project.description,
            techStack: project.techStack,
            link: project.link,
          })),
        },

        // ---- Certificates
        certificates: {
          create: cv.certificates.map((cert) => ({
            name: cert.name,
            issuer: cert.issuer,
            issuedYear: cert.issuedYear,
            description: cert.description,
          })),
        },
      },
    });
  }
  console.log('✅ Seeding cv done!');
}

cvSeeder()
  .then(() => {
    console.log('CV Seeds Done');
    prisma.$disconnect();
    process.exit(1);
  })
  .catch((e) => {
    console.log(e);
    prisma.$disconnect();
    process.exit(1);
  });
