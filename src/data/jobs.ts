// data/jobs.ts
export interface Job {
  id: number;
  title: string;
  categoryTag: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  match: number;
  tags: { text: string; missing?: boolean }[];
}

export const mockJobs: Job[] = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    categoryTag: "TECH",
    company: "NexusTech Solutions",
    location: "Remote, US",
    salary: "$140k - $180k",
    description: "Leading the development of next-generation enterprise SaaS platforms. Seeking deep expertise in React architecture, state management, and performance optimization.",
    match: 98,
    tags: [
      { text: "React Expert" },
      { text: "5+ yrs Experience" },
      { text: "TypeScript" }
    ]
  },
  {
    id: 2,
    title: "Full Stack Developer",
    categoryTag: "FINTECH",
    company: "Global Finance Inc.",
    location: "Hybrid, NY",
    salary: "$120k - $150k",
    description: "Join our core platform team to build secure, scalable financial tools. Requires strong knowledge of Node.js on the backend and React on the frontend.",
    match: 85,
    tags: [
      { text: "Node.js" },
      { text: "React" },
      { text: "Missing: Financial Domain", missing: true }
    ]
  }
];