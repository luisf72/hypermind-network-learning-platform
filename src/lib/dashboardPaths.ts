export const ADMIN_PATHS: Record<string, string> = {
  overview: '/admin',
  courses: '/admin/courses',
  'course-categories': '/admin/course-categories',
  assessments: '/admin/assessments',
  'assessment-variables': '/admin/assessment-variables',
  'session-types': '/admin/session-types',
  users: '/admin/users',
  roles: '/admin/roles',
  permissions: '/admin/permissions',
  'role-permission': '/admin/role-permission',
  subscriptions: '/admin/subscriptions',
  transactions: '/admin/transactions',
  earnings: '/admin/earnings',
  certificates: '/admin/certificates',
  'study-groups': '/admin/study-groups',
  posts: '/admin/posts',
  reviews: '/admin/reviews',
  faqs: '/admin/faqs',
  feedbacks: '/admin/feedbacks',
  ledgers: '/admin/ledgers',
  'creator-applications': '/admin/creator-applications',
  settings: '/admin/settings',
  profile: '/admin/profile',
}

export const CREATOR_PATHS: Record<string, string> = {
  overview: '/creator',
  courses: '/creator/courses',
  assessments: '/creator/assessments',
  enrollments: '/creator/enrollments',
  reviews: '/creator/reviews',
  certificates: '/creator/certificates',
  profile: '/creator/profile',
  earnings: '/creator/earnings',
  subscription: '/creator/subscription',
  'credit-log': '/creator/credit-log',
  settings: '/creator/settings',
}

export const STUDENT_PATHS: Record<string, string> = {
  courses: '/student/courses',
  assessments: '/student/assessments',
  community: '/student/community',
  home: '/student',
}

export const ROLE_BASE: Record<string, string> = {
  admin: '/admin',
  creator: '/creator',
  evaluator: '/creator',
  student: '/student',
}

export type RoleName = 'student' | 'creator' | 'evaluator' | 'admin'

export const ROLE_PRIORITY: RoleName[] = ['student', 'creator', 'evaluator', 'admin']

export function pickCurrentRole(roles: RoleName[]): RoleName {
  for (const role of ROLE_PRIORITY) {
    if (roles.includes(role)) return role
  }
  return 'student'
}

export function getDashboardPathByRole(role: RoleName): string {
  return ROLE_BASE[role] ?? ROLE_BASE.student
}
