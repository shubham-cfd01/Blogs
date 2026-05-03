import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Profile',
  description:
    'Senior Battery Modeling Engineer at Nunam Technologies — battery modeling, thermal management, and CFD for EV and BESS applications.',
};

const summary =
  'Senior Battery Modeling Engineer at Nunam Technologies India Pvt. Ltd. My work focuses on battery modeling, thermal management, and computational fluid dynamics (CFD) for electric-vehicle (EV) and battery energy storage system (BESS) applications.';

const experience = [
  {
    company: 'Nunam Technologies India Pvt. Ltd.',
    location: 'Bengaluru, India',
    role: 'Battery Modeling and Thermal Engineer',
    period: 'March 2023 — Present',
    bullets: [
      'Battery parameter estimation using Equivalent Circuit Models (ECM)',
      'Battery SOC and SOH estimation',
      'Remaining Useful Life (RUL) prediction',
      'Predictive and proactive maintenance frameworks built on field data from BESS and EV systems',
      'Thermal simulation of battery packs and design recommendations',
    ],
  },
  {
    company: 'IIT Kharagpur × Tata Motors',
    location: 'IIT Kharagpur, India',
    role: 'Battery Pack Developer for Hybrid Electric Vehicle',
    period: 'Jan 2018 — 2020',
    bullets: [
      'Developed an air-cooled battery pack for hybrid EV applications',
      'Performed cell- and pack-level experiments for heat-generation measurement',
      'Provided thermal-management solutions for the pack',
    ],
  },
  {
    company: 'IIT Kharagpur',
    location: 'Kharagpur, India',
    role: 'Research Scholar',
    period: 'Jan 2018 — Present',
    bullets: [
      'Analysed, interpreted, and documented research findings',
      'Operated laboratory equipment effectively and safely',
      'Presented research at conferences and seminars; published findings',
      'Teaching-assistant duty for undergraduate and postgraduate lab classes',
    ],
  },
  {
    company: 'MNNIT Allahabad',
    location: 'Prayagraj, India',
    role: 'Assistant Professor (Contractual), Department of Mechanical Engineering',
    period: 'Jun 2017 — Jan 2018',
    bullets: [
      'Developed curricula and delivered course material',
      'Trained and mentored teaching assistants; ran undergraduate labs',
      'Conducted research and fieldwork; wrote up reports',
      'Reviewed teaching methods and recommended improvements',
    ],
  },
];

const projects = [
  {
    title: 'Air-Cooled Battery Pack',
    sub: 'IIT Kharagpur × Tata Motors',
    supervisor: 'Prof. Subhransu Roy',
    period: 'Jan 2018 — Jun 2023',
    bullets: [
      'CAD design of an air-cooled hybrid-EV battery pack',
      'Developed and optimised the air-cooling system using CFD',
      'Manufactured an indigenous battery pack',
      'Steady and unsteady turbulence modelling using k–ε, k–ω, and LES',
      'Investigated effect of air flow rate, fin size, and heat-generation rate',
    ],
  },
  {
    title: 'Battery Pack Heat-Generation Measurement Setup',
    sub: 'IIT Kharagpur',
    supervisor: 'Prof. Subhransu Roy',
    period: 'Jan 2018 — Jun 2020',
    bullets: [
      'Calibrated heat-flux sensor against a constant DC power supply',
      'LabVIEW + NI-DAQ for calibration and data acquisition',
      'Environmental chamber and battery cycler for heat characterisation across temperatures and C-rates',
    ],
  },
  {
    title: 'Passive Cooling for Battery Packs using Phase-Change Material',
    sub: 'IIT Kharagpur',
    supervisor: 'Prof. Subhransu Roy, Prof. Anandaroop Bhattacharya',
    period: 'Jan 2018 — Jun 2023',
    bullets: [
      'Conjugate heat-transfer model for a battery pack with PCM in OpenFOAM',
      'Modelled fluctuating heat generation with solidification / melting source terms',
      'Numerically and experimentally validated PCM with embedded wire mesh for higher effective thermal conductivity',
    ],
  },
  {
    title: 'Battery Electrical and Thermal Modeling',
    sub: 'Nunam Technologies, Bengaluru',
    supervisor: '',
    period: 'Mar 2023 — Present',
    bullets: [
      'ECM-based cell parameter-estimation framework',
      'EKF and SKPF SOC algorithms; deployed in customer systems',
      'Predictive and proactive maintenance based on field data',
      'Pack-level SOH and RUL estimation for EV and BESS using real-world data',
      'Battery-pack thermal simulations and design suggestions',
    ],
  },
];

const education = [
  {
    institution: 'Indian Institute of Technology Kharagpur',
    degree: 'Research Scholar',
    grade: '',
    period: 'Jan 2018 — Jun 2020',
  },
  {
    institution: 'Indian Institute of Technology (BHU), Varanasi',
    degree: 'M.Tech in Thermal and Fluid Engineering',
    grade: 'CGPA 8.10',
    period: 'Jul 2014 — May 2016',
  },
  {
    institution: 'Government Engineering College, Rewa',
    degree: 'B.E. in Mechanical Engineering',
    grade: '73.5%',
    period: 'Jul 2008 — May 2012',
  },
];

const skills: { label: string; items: string[] }[] = [
  { label: 'Programming', items: ['C', 'C++', 'Python', 'R'] },
  { label: 'Simulation', items: ['Ansys Fluent', 'OpenFOAM', 'MATLAB', 'STAR-CCM+', 'COMSOL'] },
  { label: 'Meshing', items: ['SnappyHexMesh', 'ICEM CFD', 'Fluent Meshing', 'HyperMesh', 'Workbench Meshing'] },
  { label: 'CAD', items: ['SolidWorks', 'CATIA', 'Design Modeler', 'SpaceClaim'] },
  { label: 'Post-processing', items: ['Fluent', 'ParaView', 'Tecplot', 'EnSight', 'MATLAB', 'GnuPlot', 'Inkscape'] },
  { label: 'Experimental', items: ['Sensor Calibration', 'LabVIEW', 'NI-DAQ Data Acquisition'] },
];

const achievements = [
  'GATE 2014 — All-India Rank 927',
  'MHRD institute scholarship for two academic years during M.Tech',
  'MHRD institute scholarship during PhD',
];

const contactLinkClass =
  'text-gray-700 underline-offset-2 transition-colors hover:text-indigo-600 hover:underline dark:text-gray-300 dark:hover:text-indigo-400';
const sectionTitleClass =
  'text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400';

export default function ProfilePage() {
  return (
    <div className="space-y-14">
      <header>
        <p className={sectionTitleClass}>Profile</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          Shubham Mishra
        </h1>
        <p className="mt-3 text-xl text-gray-600 dark:text-gray-400 sm:text-2xl">
          Senior Battery Modeling Engineer · Nunam Technologies
        </p>
        <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500 dark:text-gray-500">
          <li>Bengaluru, India</li>
          <li aria-hidden>·</li>
          <li>
            <a className={contactLinkClass} href="mailto:mishrashubhamrewa@gmail.com">
              mishrashubhamrewa@gmail.com
            </a>
          </li>
          <li aria-hidden>·</li>
          <li>
            <a className={contactLinkClass} href="tel:+917987990814">
              +91&nbsp;79879&nbsp;90814
            </a>
          </li>
          <li aria-hidden>·</li>
          <li>
            <Link
              className={contactLinkClass}
              href="/resume/Shubham_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download résumé (PDF)
            </Link>
          </li>
        </ul>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {summary}
        </p>
      </header>

      <section>
        <h2 className={sectionTitleClass}>Experience</h2>
        <ol className="mt-6 space-y-10">
          {experience.map((e) => (
            <li key={e.company + e.role}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 sm:text-2xl">
                  {e.company}
                </h3>
                <time className="shrink-0 text-sm tabular-nums text-gray-500">{e.period}</time>
              </div>
              <p className="mt-1 text-base text-gray-600 dark:text-gray-400">
                {e.role} <span className="text-gray-400">·</span>{' '}
                <span className="text-gray-500">{e.location}</span>
              </p>
              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-base text-gray-700 marker:text-indigo-500 dark:text-gray-300">
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className={sectionTitleClass}>Selected Projects</h2>
        <ol className="mt-6 space-y-10">
          {projects.map((p) => (
            <li key={p.title}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 sm:text-xl">
                  {p.title}
                </h3>
                <time className="shrink-0 text-sm tabular-nums text-gray-500">{p.period}</time>
              </div>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {p.sub}
                {p.supervisor && (
                  <>
                    {' '}
                    <span className="text-gray-400">·</span>{' '}
                    <span className="text-gray-500">Supervisor: {p.supervisor}</span>
                  </>
                )}
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-base text-gray-700 marker:text-indigo-500 dark:text-gray-300">
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className={sectionTitleClass}>Education</h2>
        <ol className="mt-6 space-y-6">
          {education.map((ed) => (
            <li key={ed.institution + ed.degree}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {ed.institution}
                </h3>
                <time className="shrink-0 text-sm tabular-nums text-gray-500">{ed.period}</time>
              </div>
              <p className="mt-1 text-base text-gray-600 dark:text-gray-400">
                {ed.degree}
                {ed.grade && (
                  <>
                    {' '}
                    <span className="text-gray-400">·</span>{' '}
                    <span className="text-gray-500">{ed.grade}</span>
                  </>
                )}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className={sectionTitleClass}>Skills</h2>
        <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-[max-content_1fr]">
          {skills.map((s) => (
            <div key={s.label} className="contents">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 sm:pt-0.5">
                {s.label}
              </dt>
              <dd className="text-base text-gray-800 dark:text-gray-200">
                {s.items.join(' · ')}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2 className={sectionTitleClass}>Achievements</h2>
        <ul className="mt-6 list-disc space-y-1.5 pl-5 text-base text-gray-700 marker:text-indigo-500 dark:text-gray-300">
          {achievements.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
