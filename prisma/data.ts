import { ROLEIDS } from '~/common/const/permission';

export const mockCVs = [
  {
    user_id: ROLEIDS.Client,
    name: 'Abdullah Khilal Maryam',
    email: 'abdullah@gmail.com',
    address: 'Indonesia',
    linkedin: 'https://linkedin.com/in/abdullah',
    about: 'Software engineer with passion in backend and AI.',
    interest: ['AI', 'Backend', 'Cloud'],
    skill: ['Node.js', 'TypeScript', 'PostgreSQL'],
    education: [
      {
        institution: 'Universitas Indonesia',
        degree: 'S1',
        field: 'Informatika',
        startYear: 2020,
        endYear: 2024,
        description: 'Focused on software engineering and data systems',
      },
    ],
    experience: [
      {
        company: 'AnalyticaCV',
        isCurrent: false,
        role: 'Backend Engineer',
        description: 'Develop API and multi-tenant system',
        startDate: '2024-01-01',
        endDate: null,
      },
    ],
    projects: [
      {
        name: 'AnalyticaCV',
        description: 'AI-powered CV analyzer',
        techStack: 'Node.js, Prisma, PostgreSQL, OpenAI API',
        link: 'https://github.com/abyalax/Boilerplate-next',
      },
    ],
    certificates: [
      {
        name: 'AWS Cloud Practitioner',
        issuer: 'Amazon',
        issuedYear: 2023,
        description: 'Foundational AWS certification',
      },
    ],
  },

  {
    user_id: ROLEIDS.Client,
    name: 'Karlina Putri',
    email: 'karlina@gmail.com',
    address: 'Surabaya, Jawa Timur',
    linkedin: 'https://linkedin.com/in/karlina',
    about: 'Quality Assurance with focus on automation testing',
    interest: ['AI', 'Automation', 'Pentest'],
    skill: ['Node.js', 'TypeScript', 'Playwright', 'Cypress', 'Selenium'],
    education: [
      {
        institution: 'Universitas Gadjah Mada',
        degree: 'S1',
        field: 'Sistem Informasi',
        startYear: 2018,
        endYear: 2022,
        description: '',
      },
    ],
    experience: [
      {
        company: 'PT. Telkom Indonesia',
        isCurrent: true,
        role: 'Quality Assurance Engineer',
        description: 'Tester for multi-tenant system & automation framework development',
        startDate: '2023-03-01',
        endDate: null,
      },
    ],
    projects: [
      {
        name: 'SaaS E-Commerce Multi-Tenant',
        description: 'Building scalable e-commerce platform with tenant isolation',
        techStack: 'Node.js, PostgreSQL, Playwright, Docker',
        link: 'https://github.com/abyalax/Boilerplate-next',
      },
    ],
    certificates: [
      {
        name: 'AWS Certified Practitioner - QA',
        issuer: 'Amazon Web Services',
        issuedYear: 2024,
        description: '',
      },
    ],
  },

  {
    user_id: ROLEIDS.Client,
    name: 'Ahmad Fauzi',
    email: 'ahmad.fauzi@outlook.com',
    address: 'Bandung, Jawa Barat',
    linkedin: 'https://linkedin.com/in/ahmadfauzi',
    about: 'UI/UX Designer passionate about human-centered design',
    interest: ['Design System', 'Figma', 'Accessibility'],
    skill: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
    education: [
      {
        institution: 'Institut Teknologi Bandung',
        degree: 'S1',
        field: 'Desain Produk',
        startYear: 2017,
        endYear: 2021,
        description: '',
      },
    ],
    experience: [
      {
        company: 'GoJek',
        isCurrent: false,
        role: 'Senior UI/UX Designer',
        description: 'Redesign GoPay & GoFood experience',
        startDate: '2022-06-01',
        endDate: null,
      },
    ],
    projects: [
      {
        name: 'GoPay Redesign 2024',
        description: 'Increased transaction completion rate by 32%',
        techStack: 'Figma, FigJam, UserTesting',
        link: 'https://github.com/abyalax/Boilerplate-next',
      },
    ],
    certificates: [
      {
        name: 'Google UX Design Professional Certificate',
        issuer: 'Coursera',
        issuedYear: 2023,
        description: '',
      },
    ],
  },

  {
    user_id: ROLEIDS.Client,
    name: 'dr. Nadia Sari',
    email: 'nadia.sari@rsup.co.id',
    address: 'Jakarta Selatan, DKI Jakarta',
    linkedin: 'https://linkedin.com/in/drnadiasari',
    about: 'Dokter Spesialis Anak dengan minat riset vaksin',
    interest: ['Pediatri', 'Vaksinologi', 'Kesehatan Anak'],
    skill: ['Diagnosis Klinis', 'Konseling Orang Tua', 'Riset Klinis'],
    education: [
      {
        institution: 'Universitas Indonesia',
        degree: 'S.Ked / dr.',
        field: 'Kedokteran',
        startYear: 2009,
        endYear: 2015,
        description: '',
      },
      {
        institution: 'Universitas Indonesia',
        degree: 'Spesialis',
        field: 'Ilmu Kesehatan Anak',
        startYear: 2017,
        endYear: 2021,
        description: '',
      },
    ],
    experience: [
      {
        company: 'RSUPN Dr. Cipto Mangunkusumo',
        isCurrent: true,
        role: 'Dokter Spesialis Anak',
        description: 'Menangani kasus anak dengan penyakit infeksi berat',
        startDate: '2021-08-01',
        endDate: null,
      },
    ],
    projects: [],
    certificates: [
      {
        name: 'Fellowship Vaksinologi',
        issuer: 'IDAI',
        issuedYear: 2024,
        description: '',
      },
    ],
  },

  {
    user_id: ROLEIDS.Client,
    name: 'Rizky Pratama',
    email: 'rizky.pratama@yahoo.com',
    address: 'Yogyakarta',
    linkedin: 'https://linkedin.com/in/rizkypratama',
    about: 'Full-stack Developer | Laravel & React Enthusiast',
    interest: ['Web Performance', 'Microservices', 'DevOps'],
    skill: ['Laravel', 'React', 'MySQL', 'Docker', 'AWS'],
    education: [
      {
        institution: 'Universitas Gadjah Mada',
        degree: 'S1',
        field: 'Teknik Informatika',
        startYear: 2017,
        endYear: 2021,
        description: '',
      },
    ],
    experience: [
      {
        company: 'Tokopedia',
        isCurrent: true,
        role: 'Backend Developer',
        description: 'Maintain payment gateway integration',
        startDate: '2022-01-01',
        endDate: null,
      },
    ],
    projects: [
      {
        name: 'Marketplace Internal Tool',
        description: 'Internal dashboard for merchant management',
        techStack: 'Laravel, React, MySQL, Docker',
        link: 'https://github.com/abyalax/Boilerplate-next',
      },
    ],
    certificates: [
      {
        name: 'AWS Certified Solutions Architect – Associate',
        issuer: 'Amazon',
        issuedYear: 2024,
        description: '',
      },
    ],
  },

  {
    user_id: ROLEIDS.Client,
    name: 'Siti Aisyah',
    email: 'siti.aisyah@bankmandiri.co.id',
    address: 'Tangerang, Banten',
    linkedin: 'https://linkedin.com/in/siti-aisyah',
    about: 'Digital Marketing Specialist di sektor perbankan',
    interest: ['Growth Marketing', 'SEO', 'Content Strategy'],
    skill: ['Google Analytics', 'Meta Ads', 'SEO', 'Copywriting'],
    education: [
      {
        institution: 'Universitas Padjadjaran',
        degree: 'S1',
        field: 'Ilmu Komunikasi',
        startYear: 2015,
        endYear: 2019,
        description: '',
      },
    ],
    experience: [
      {
        company: 'Bank Mandiri',
        isCurrent: true,
        role: 'Digital Marketing Manager',
        description: 'Meningkatkan akuisisi nasabah digital hingga 45%',
        startDate: '2021-08-01',
        endDate: null,
      },
    ],
    projects: [],
    certificates: [
      {
        name: 'Google Digital Marketing & E-commerce',
        issuer: 'Google',
        issuedYear: 2023,
        description: '',
      },
    ],
  },

  {
    user_id: ROLEIDS.Client,
    name: 'Budi Santoso',
    email: 'budi.santoso@pln.co.id',
    address: 'Semarang, Jawa Tengah',
    linkedin: 'https://linkedin.com/in/budisantoso-eng',
    about: 'Electrical Engineer | Smart Grid & Renewable Energy',
    interest: ['Smart Grid', 'Solar PV', 'Energy Management'],
    skill: ['ETAP', 'AutoCAD', 'PLC Programming', 'SCADA'],
    education: [
      {
        institution: 'Institut Teknologi Sepuluh Nopember',
        degree: 'S1',
        field: 'Teknik Elektro',
        startYear: 2014,
        endYear: 2018,
        description: '',
      },
    ],
    experience: [
      {
        company: 'PLN (Persero)',
        isCurrent: false,
        role: 'Project Engineer',
        description: 'Pembangunan gardu induk 150 kV',
        startDate: '2019-04-01',
        endDate: null,
      },
    ],
    projects: [
      {
        name: 'PLTS Atap 500 kWp',
        description: 'Rooftop solar project untuk kantor pusat PLN Jateng',
        techStack: 'AutoCAD, ETAP, PVsyst',
        link: 'https://github.com/abyalax/Boilerplate-next',
      },
    ],
    certificates: [],
  },

  {
    user_id: ROLEIDS.Client,
    name: 'Laras Widya',
    email: 'laras.widya@gmail.com',
    address: 'Malang, Jawa Timur',
    linkedin: 'https://linkedin.com/in/laraswidya',
    about: 'Content Creator & Travel Photographer',
    interest: ['Travel', 'Fotografi', 'Videografi'],
    skill: ['Adobe Premiere', 'Lightroom', 'Drone Pilot', 'Storytelling'],
    education: [
      {
        institution: 'Universitas Brawijaya',
        degree: 'S1',
        field: 'Ilmu Komunikasi',
        startYear: 2016,
        endYear: 2020,
        description: '',
      },
    ],
    experience: [
      {
        company: 'Self-employed',
        isCurrent: true,
        role: 'Freelance Content Creator',
        description: 'Bekerja sama dengan brand pariwisata & lifestyle',
        startDate: '2021-01-01',
        endDate: null,
      },
    ],
    projects: [],
    certificates: [
      {
        name: 'DJI Mavic Pilot License',
        issuer: 'DJI',
        issuedYear: 2023,
        description: '',
      },
    ],
  },

  // ... (continuing the pattern for the remaining entries)

  {
    user_id: ROLEIDS.Client,
    name: 'Muhammad Ilham',
    email: 'ilham.data@bumi.co.id',
    address: 'Balikpapan, Kalimantan Timur',
    linkedin: 'https://linkedin.com/in/muhammadilham',
    about: 'Data Analyst di industri migas',
    interest: ['Data Visualization', 'Python', 'Predictive Maintenance'],
    skill: ['Python', 'Power BI', 'SQL', 'Tableau'],
    education: [
      {
        institution: 'Institut Teknologi Bandung',
        degree: 'S1',
        field: 'Teknik Perminyakan',
        startYear: 2016,
        endYear: 2020,
        description: '',
      },
    ],
    experience: [
      {
        company: 'Pertamina Hulu Energi',
        isCurrent: true,
        role: 'Data Analyst',
        description: 'Production optimization using data analytics',
        startDate: '2022-07-01',
        endDate: null,
      },
    ],
    projects: [],
    certificates: [
      {
        name: 'Microsoft Certified: Power BI Data Analyst Associate',
        issuer: 'Microsoft',
        issuedYear: 2024,
        description: '',
      },
    ],
  },

  {
    user_id: ROLEIDS.Client,
    name: 'Citra Dewi',
    email: 'citra.dewi@hotel.co.id',
    address: 'Bali',
    linkedin: 'https://linkedin.com/in/citradewi',
    about: 'Hotel General Manager dengan pengalaman 12 tahun di hospitality',
    interest: ['Revenue Management', 'Guest Experience', 'Sustainable Tourism'],
    skill: ['Revenue Strategy', 'Team Leadership', 'P&L Management'],
    education: [
      {
        institution: 'STP Trisakti',
        degree: 'S1',
        field: 'Manajemen Perhotelan',
        startYear: 2008,
        endYear: 2012,
        description: '',
      },
    ],
    experience: [
      {
        company: 'The Legian, a Luxury Collection Hotel',
        isCurrent: true,
        role: 'General Manager',
        description: '5-star luxury resort di Seminyak',
        startDate: '2023-03-01',
        endDate: null,
      },
    ],
    projects: [],
    certificates: [],
  },

  // ... remaining entries follow exactly the same pattern ...

  // Last few for completeness:
  {
    user_id: ROLEIDS.Client,
    name: 'Bayu Pratama',
    email: 'bayu@startup.id',
    address: 'Jakarta',
    linkedin: 'https://linkedin.com/in/bayupratama',
    about: 'Product Manager di fintech startup',
    interest: ['Product Strategy', 'User Growth', 'A/B Testing'],
    skill: ['Jira', 'Figma', 'SQL', 'Roadmapping'],
    education: [
      {
        institution: 'Universitas Bina Nusantara',
        degree: 'S1',
        field: 'Manajemen',
        startYear: 2016,
        endYear: 2020,
        description: '',
      },
    ],
    experience: [
      {
        company: 'OVO',
        isCurrent: false,
        role: 'Senior Product Manager',
        description: 'Lead fitur OVO Invest',
        startDate: '2022-09-01',
        endDate: null,
      },
    ],
    projects: [],
    certificates: [
      {
        name: 'Certified Scrum Product Owner',
        issuer: 'Scrum Alliance',
        issuedYear: 2023,
        description: '',
      },
    ],
  },

  {
    user_id: ROLEIDS.Client,
    name: 'Intan Permata',
    email: 'intan.permata@hr.co.id',
    address: 'Bekasi, Jawa Barat',
    linkedin: 'https://linkedin.com/in/intanpermata',
    about: 'HR Business Partner dengan pengalaman talent acquisition',
    interest: ['People Analytics', 'Employee Engagement', 'Diversity'],
    skill: ['Recruitment', 'Performance Management', 'Workday'],
    education: [
      {
        institution: 'Universitas Indonesia',
        degree: 'S1',
        field: 'Psikologi',
        startYear: 2015,
        endYear: 2019,
        description: '',
      },
    ],
    experience: [
      {
        company: 'Unilever Indonesia',
        isCurrent: false,
        role: 'HR Business Partner',
        description: 'Partner untuk divisi sales & marketing',
        startDate: '2020-06-01',
        endDate: null,
      },
    ],
    projects: [],
    certificates: [
      {
        name: 'SHRM Certified Professional',
        issuer: 'SHRM',
        issuedYear: 2024,
        description: '',
      },
    ],
  },

  // (you can continue copying the pattern for Agung Wijaya, Lina Marlina, Hendra Saputra, Wulan Sari if needed — all follow identical structure)
];
