/**
 * Centralized seed/mock data for HyperMind. Pages can either keep their inline
 * mock arrays (for visual parity with the canvas mockup) or migrate to consume
 * these typed seeds via the React Query hooks in `src/lib/queries.ts`.
 */

export interface CourseSeed {
  id: string
  title: string
  category: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  rating: number
  enrolled: number
  priceUsd: number
  instructor: string
}

export interface AssessmentSeed {
  id: string
  title: string
  durationMins: number
  passScore: number
  attempts: number
  level: 'Beginner' | 'Intermediate' | 'Advanced'
}

export interface CertificateSeed {
  id: string
  course: string
  issuedOn: string
  txHash: string
}

export const COURSES: CourseSeed[] = [
  {
    id: 'c-001',
    title: 'Portrait Photography: Light & Shadow',
    category: 'Arts & Crafts',
    level: 'Intermediate',
    rating: 4.92,
    enrolled: 18420,
    priceUsd: 89,
    instructor: 'Aisha Okafor',
  },
  {
    id: 'c-002',
    title: 'Spanish A1–A2: Complete Beginner',
    category: 'Languages',
    level: 'Beginner',
    rating: 4.88,
    enrolled: 24210,
    priceUsd: 69,
    instructor: 'Tomás Herrera',
  },
  {
    id: 'c-003',
    title: 'Python for Machine Learning Engineers',
    category: 'Tech & Coding',
    level: 'Advanced',
    rating: 4.95,
    enrolled: 31760,
    priceUsd: 129,
    instructor: 'Li Wei',
  },
  {
    id: 'c-004',
    title: 'Personal Finance Masterclass 2026',
    category: 'Finance',
    level: 'Beginner',
    rating: 4.86,
    enrolled: 14920,
    priceUsd: 79,
    instructor: 'Marcus Delgado',
  },
  {
    id: 'c-005',
    title: 'Yoga for Mind & Body',
    category: 'Health',
    level: 'Beginner',
    rating: 4.91,
    enrolled: 9810,
    priceUsd: 59,
    instructor: 'Priya Sharma',
  },
]

export const ASSESSMENTS: AssessmentSeed[] = [
  {
    id: 'a-001',
    title: 'Photography Fundamentals',
    durationMins: 45,
    passScore: 70,
    attempts: 3,
    level: 'Beginner',
  },
  {
    id: 'a-002',
    title: 'Spanish CEFR Placement',
    durationMins: 30,
    passScore: 65,
    attempts: 2,
    level: 'Beginner',
  },
  {
    id: 'a-003',
    title: 'Python Data Structures',
    durationMins: 60,
    passScore: 75,
    attempts: 3,
    level: 'Intermediate',
  },
]

export const CERTIFICATES: CertificateSeed[] = [
  { id: 'cert-001', course: 'Spanish A1–A2', issuedOn: 'Mar 14, 2026', txHash: '0x7c5c…f6a2' },
  {
    id: 'cert-002',
    course: 'Personal Finance Masterclass',
    issuedOn: 'Feb 02, 2026',
    txHash: '0x9a13…81c7',
  },
]

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function fetchCourses(): Promise<CourseSeed[]> {
  await sleep(120)
  return COURSES
}

export async function fetchAssessments(): Promise<AssessmentSeed[]> {
  await sleep(120)
  return ASSESSMENTS
}

export async function fetchCertificates(): Promise<CertificateSeed[]> {
  await sleep(120)
  return CERTIFICATES
}
