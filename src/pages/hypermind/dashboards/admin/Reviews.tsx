import AdminShell from '../_shared/AdminShell'
import AdminTable, { Pill, Mono, UserCell, type Column, type Tone } from '../_shared/AdminTable'
import { Download, Star } from 'lucide-react'

interface ReviewRow {
  id: string
  student_name: string
  student_email: string
  student_initials: string
  course_title: string
  course_cat: string
  rating: 1 | 2 | 3 | 4 | 5
  body: string
  status: 'visible' | 'pending' | 'flagged' | 'hidden'
  posted_at: string
}

const ROWS: ReviewRow[] = [
  {
    id: 'rv-001',
    student_name: 'Mei Chen',
    student_email: 'mei.chen@stu.io',
    student_initials: 'MC',
    course_title: 'Watercolor Foundations',
    course_cat: 'Arts & Crafts',
    rating: 5,
    body: 'Sarah breaks down each technique with such warmth. I finally understand wet-on-wet washes!',
    status: 'visible',
    posted_at: '2h ago',
  },
  {
    id: 'rv-002',
    student_name: 'Jordan Reeves',
    student_email: 'jordan@reeves.dev',
    student_initials: 'JR',
    course_title: 'Acoustic Guitar Mastery',
    course_cat: 'Music',
    rating: 5,
    body: "The chord transition exercises are gold. Twelve weeks in and I'm playing songs I never thought I could.",
    status: 'visible',
    posted_at: 'Yesterday',
  },
  {
    id: 'rv-003',
    student_name: 'Lina Pereira',
    student_email: 'lina.p@trav.studio',
    student_initials: 'LP',
    course_title: 'Spanish for Travelers',
    course_cat: 'Languages',
    rating: 5,
    body: 'Used this before my Madrid trip — every conversation we practiced came up. Magic.',
    status: 'visible',
    posted_at: '4h ago',
  },
  {
    id: 'rv-004',
    student_name: 'Diego Marquez',
    student_email: 'diego@marquez.io',
    student_initials: 'DM',
    course_title: 'Watercolor Foundations',
    course_cat: 'Arts & Crafts',
    rating: 5,
    body: 'The colour-mixing module alone is worth the price. My palette finally makes sense.',
    status: 'visible',
    posted_at: '1d ago',
  },
  {
    id: 'rv-005',
    student_name: 'Aiko Tanaka',
    student_email: 'aiko@tnk.co',
    student_initials: 'AT',
    course_title: 'Acoustic Guitar Mastery',
    course_cat: 'Music',
    rating: 5,
    body: 'Best fingerpicking lessons on the platform. The slow-mo overlays are a game changer.',
    status: 'visible',
    posted_at: '2d ago',
  },
  {
    id: 'rv-006',
    student_name: 'Priya Singh',
    student_email: 'priya@singh.dev',
    student_initials: 'PS',
    course_title: 'Watercolor Foundations',
    course_cat: 'Arts & Crafts',
    rating: 4,
    body: 'Loved the pacing. Wish there was a bit more on portrait skin tones — otherwise excellent.',
    status: 'visible',
    posted_at: '3d ago',
  },
  {
    id: 'rv-007',
    student_name: 'Marcus Webb',
    student_email: 'marcus@webb.studio',
    student_initials: 'MW',
    course_title: 'Acoustic Guitar Mastery',
    course_cat: 'Music',
    rating: 4,
    body: 'Solid foundations course. Could use more practice tracks for the advanced module.',
    status: 'visible',
    posted_at: '5d ago',
  },
  {
    id: 'rv-008',
    student_name: 'Hanna Müller',
    student_email: 'hanna@muellerlab.de',
    student_initials: 'HM',
    course_title: 'Spanish for Travelers',
    course_cat: 'Languages',
    rating: 5,
    body: "I'm not a natural with languages but Sarah makes it feel doable. Onto the next level!",
    status: 'pending',
    posted_at: '1w ago',
  },
  {
    id: 'rv-009',
    student_name: 'Carlos Mendoza',
    student_email: 'carlos.m@hypermind.io',
    student_initials: 'CM',
    course_title: 'Cognitive Load 101',
    course_cat: 'Psychology',
    rating: 2,
    body: "Felt rushed in the second half. Some examples didn't match what was promised in the syllabus.",
    status: 'flagged',
    posted_at: '1w ago',
  },
  {
    id: 'rv-010',
    student_name: 'Sophia Chen',
    student_email: 'sophia@chen.dev',
    student_initials: 'SC',
    course_title: 'Spanish for Travelers',
    course_cat: 'Languages',
    rating: 1,
    body: 'Spam — please remove, this user posted irrelevant promotional content as a review.',
    status: 'hidden',
    posted_at: '2w ago',
  },
]

const statusTone = (s: ReviewRow['status']): Tone =>
  s === 'visible' ? 'success' : s === 'pending' ? 'warning' : s === 'flagged' ? 'danger' : 'neutral'

const ratingTone = (r: ReviewRow['rating']): Tone =>
  r >= 4 ? 'success' : r === 3 ? 'warning' : 'danger'

function StarRating({ value }: { value: ReviewRow['rating'] }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-3 w-3"
          style={{
            color: i < value ? 'var(--hm-accent, #F4636E)' : 'var(--hm-border-strong)',
            fill: i < value ? 'var(--hm-accent, #F4636E)' : 'transparent',
          }}
        />
      ))}
      <span
        className="hm-mono text-[10.5px] ml-1.5"
        style={{ color: 'var(--hm-text-muted)', letterSpacing: '0.06em' }}
      >
        {value}.0
      </span>
    </span>
  )
}

const COLUMNS: Column<ReviewRow>[] = [
  {
    header: 'Student',
    render: (r) => (
      <UserCell name={r.student_name} email={r.student_email} initials={r.student_initials} />
    ),
  },
  {
    header: 'Course',
    render: (r) => (
      <div className="min-w-0">
        <p
          className="text-[12.5px] truncate"
          style={{ color: 'var(--hm-text)' }}
          title={r.course_title}
        >
          {r.course_title}
        </p>
        <p
          className="hm-mono text-[10px] mt-0.5"
          style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.10em' }}
        >
          {r.course_cat.toUpperCase()}
        </p>
      </div>
    ),
  },
  {
    header: 'Rating',
    render: (r) => (
      <div className="flex items-center gap-2">
        <StarRating value={r.rating} />
        <Pill tone={ratingTone(r.rating)} dot={false}>
          {r.rating}★
        </Pill>
      </div>
    ),
  },
  {
    header: 'Review',
    render: (r) => (
      <span
        className="block truncate max-w-[360px] text-[12px]"
        style={{ color: 'var(--hm-text-muted)' }}
        title={r.body}
      >
        "{r.body}"
      </span>
    ),
  },
  { header: 'Status', render: (r) => <Pill tone={statusTone(r.status)}>{r.status}</Pill> },
  { header: 'Posted', align: 'right', render: (r) => <Mono>{r.posted_at}</Mono> },
]

export default function Reviews() {
  return (
    <AdminShell activeId="reviews">
      <AdminTable
        eyebrow="Engagement"
        title="Student reviews"
        subtitle="Course reviews and ratings posted by learners across the catalog."
        primaryAction={{ label: 'Export CSV', icon: Download }}
        searchPlaceholder="Search by student, course or text…"
        filters={['Rating', 'Course', 'Status']}
        columns={COLUMNS}
        rows={ROWS}
        totalCount={1284}
        pageInfo={{ current: 1, total: 64 }}
      />
    </AdminShell>
  )
}
