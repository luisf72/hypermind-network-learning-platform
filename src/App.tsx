import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useThemeStore } from '@/stores/themeStore'
import { useAuthStore, type Role, type User } from '@/stores/authStore'
import { getDashboardPathByRole, pickCurrentRole, type RoleName } from '@/lib/dashboardPaths'

/* Public */
const Landing = lazy(() => import('./pages/hypermind/Landing'))
const NotFound = lazy(() => import('./pages/NotFound'))
const CoursesListing = lazy(() => import('./pages/hypermind/CoursesListing'))
const AssessmentsListing = lazy(() => import('./pages/hypermind/AssessmentsListing'))
const Login = lazy(() => import('./pages/hypermind/Login'))
const Register = lazy(() => import('./pages/hypermind/Register'))
const ForgotPassword = lazy(() => import('./pages/hypermind/ForgotPassword'))
const ResetSent = lazy(() => import('./pages/hypermind/ResetSent'))
const ResetPassword = lazy(() => import('./pages/hypermind/ResetPassword'))

/* Admin */
const AdminDashboard = lazy(() => import('./pages/hypermind/dashboards/AdminDashboard'))
const AdminUsers = lazy(() => import('./pages/hypermind/dashboards/admin/AdminUsers'))
const AdminUserDetail = lazy(() => import('./pages/hypermind/dashboards/admin/UserDetail'))
const AdminCourses = lazy(() => import('./pages/hypermind/dashboards/admin/Courses'))
const AdminCourseDetail = lazy(() => import('./pages/hypermind/dashboards/admin/CourseDetail'))
const AdminCourseCategories = lazy(
  () => import('./pages/hypermind/dashboards/admin/CourseCategories')
)
const AdminAssessments = lazy(() => import('./pages/hypermind/dashboards/admin/Assessments'))
const AdminAssessmentDetail = lazy(
  () => import('./pages/hypermind/dashboards/admin/AssessmentDetail')
)
const AdminAssessmentVariables = lazy(
  () => import('./pages/hypermind/dashboards/admin/AssessmentVariables')
)
const AdminSessionTypes = lazy(() => import('./pages/hypermind/dashboards/admin/SessionTypes'))
const AdminRoles = lazy(() => import('./pages/hypermind/dashboards/admin/Roles'))
const AdminPermissions = lazy(() => import('./pages/hypermind/dashboards/admin/Permissions'))
const AdminRolePermission = lazy(() => import('./pages/hypermind/dashboards/admin/RolePermission'))
const AdminSubscriptions = lazy(() => import('./pages/hypermind/dashboards/admin/Subscriptions'))
const AdminTransactions = lazy(() => import('./pages/hypermind/dashboards/admin/Transactions'))
const AdminEarnings = lazy(() => import('./pages/hypermind/dashboards/admin/AdminEarnings'))
const AdminCertificates = lazy(() => import('./pages/hypermind/dashboards/admin/Certificates'))
const AdminStudyGroups = lazy(() => import('./pages/hypermind/dashboards/admin/StudyGroups'))
const AdminPosts = lazy(() => import('./pages/hypermind/dashboards/admin/Posts'))
const AdminReviews = lazy(() => import('./pages/hypermind/dashboards/admin/Reviews'))
const AdminFAQs = lazy(() => import('./pages/hypermind/dashboards/admin/FAQs'))
const AdminFeedbacks = lazy(() => import('./pages/hypermind/dashboards/admin/Feedbacks'))
const AdminLedgers = lazy(() => import('./pages/hypermind/dashboards/admin/Ledgers'))
const AdminCreatorApplications = lazy(
  () => import('./pages/hypermind/dashboards/admin/AdminCreatorApplications')
)
const AdminSettings = lazy(() => import('./pages/hypermind/dashboards/admin/Settings'))
const AdminProfile = lazy(() => import('./pages/hypermind/dashboards/admin/AdminProfile'))

/* Creator */
const CreatorDashboard = lazy(() => import('./pages/hypermind/dashboards/CreatorDashboard'))
const CreatorCourses = lazy(() => import('./pages/hypermind/dashboards/creator/CreatorCourses'))
const CreatorCourseEdit = lazy(
  () => import('./pages/hypermind/dashboards/creator/CreatorCourseEdit')
)
const CreatorAssessments = lazy(
  () => import('./pages/hypermind/dashboards/creator/CreatorAssessments')
)
const CreatorAssessmentDetail = lazy(
  () => import('./pages/hypermind/dashboards/creator/CreatorAssessmentDetail')
)
const CreatorEnrollments = lazy(
  () => import('./pages/hypermind/dashboards/creator/CreatorEnrollments')
)
const CreatorReviews = lazy(() => import('./pages/hypermind/dashboards/creator/CreatorReviews'))
const CreatorCertificates = lazy(
  () => import('./pages/hypermind/dashboards/creator/CreatorCertificates')
)
const CreatorProfile = lazy(() => import('./pages/hypermind/dashboards/creator/CreatorProfile'))
const CreatorEarnings = lazy(() => import('./pages/hypermind/dashboards/creator/CreatorEarnings'))
const CreatorSubscription = lazy(
  () => import('./pages/hypermind/dashboards/creator/CreatorSubscription')
)
const CreatorCreditLog = lazy(() => import('./pages/hypermind/dashboards/creator/CreatorCreditLog'))
const CreatorSettings = lazy(() => import('./pages/hypermind/dashboards/creator/CreatorSettings'))

/* Student */
const StudentHome = lazy(() => import('./pages/hypermind/dashboards/student/StudentHome'))
const StudentCourses = lazy(() => import('./pages/hypermind/dashboards/student/StudentCourses'))
const StudentMyCourses = lazy(() => import('./pages/hypermind/dashboards/student/StudentMyCourses'))
const StudentCourseDetail = lazy(
  () => import('./pages/hypermind/dashboards/student/StudentCourseDetail')
)
const StudentCourseViewer = lazy(
  () => import('./pages/hypermind/dashboards/student/StudentCourseViewer')
)
const StudentAssessments = lazy(
  () => import('./pages/hypermind/dashboards/student/StudentAssessments')
)
const StudentMyAssessments = lazy(
  () => import('./pages/hypermind/dashboards/student/StudentMyAssessments')
)
const StudentAssessmentDetail = lazy(
  () => import('./pages/hypermind/dashboards/student/StudentAssessmentDetail')
)
const StudentAssessmentQuiz = lazy(
  () => import('./pages/hypermind/dashboards/student/StudentAssessmentQuiz')
)
const StudentAssessmentResult = lazy(
  () => import('./pages/hypermind/dashboards/student/StudentAssessmentResult')
)
const StudentCommunity = lazy(() => import('./pages/hypermind/dashboards/student/StudentCommunity'))
const StudentCertificates = lazy(
  () => import('./pages/hypermind/dashboards/student/StudentCertificates')
)
const StudentInbox = lazy(() => import('./pages/hypermind/dashboards/student/StudentInbox'))
const StudentNotifications = lazy(
  () => import('./pages/hypermind/dashboards/student/StudentNotifications')
)
const StudentProfile = lazy(() => import('./pages/hypermind/dashboards/student/StudentProfile'))
const StudentSubscription = lazy(
  () => import('./pages/hypermind/dashboards/student/StudentSubscription')
)
const StudentCreditLog = lazy(() => import('./pages/hypermind/dashboards/student/StudentCreditLog'))
const StudentApplyCreator = lazy(
  () => import('./pages/hypermind/dashboards/student/StudentApplyCreator')
)
const StudentFeedback = lazy(() => import('./pages/hypermind/dashboards/student/StudentFeedback'))

function isRoleName(value: unknown): value is RoleName {
  return value === 'student' || value === 'creator' || value === 'evaluator' || value === 'admin'
}

function getNormalizedRoles(user: User): RoleName[] {
  const fromRoles = Array.isArray(user.roles) ? user.roles.filter(isRoleName) : []
  if (fromRoles.length > 0) return fromRoles
  return isRoleName(user.role) ? [user.role] : ['student']
}

function getPriorityDestination(user: User): string {
  const priorityRole = pickCurrentRole(getNormalizedRoles(user))
  return getDashboardPathByRole(priorityRole)
}

/** Set to true to enforce login + role checks on dashboard routes. */
const ROUTE_PROTECTION_ENABLED = false

function Protected({ allow, children }: { allow: Role[]; children: React.ReactNode }) {
  if (!ROUTE_PROTECTION_ENABLED) {
    return <>{children}</>
  }
  const user = useAuthStore((s) => s.user)
  const activeRole = useAuthStore((s) => s.activeRole)
  const location = useLocation()
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }
  const priorityDestination = getPriorityDestination(user)
  const normalizedRoles = getNormalizedRoles(user)
  const hasActiveRole = activeRole !== 'guest' && normalizedRoles.includes(activeRole)
  const effective: Role = hasActiveRole ? (activeRole === 'evaluator' ? 'creator' : activeRole) : 'guest'
  if (!allow.includes(effective)) {
    return <Navigate to={priorityDestination} replace />
  }
  return <>{children}</>
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Loader() {
  const { t } = useTranslation()
  return (
    <div
      className="hm-root"
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: 'var(--hm-bg)',
        color: 'var(--hm-text-muted)',
      }}
    >
      {t('common.loading')}
    </div>
  )
}

function RootRedirect() {
  const user = useAuthStore((s) => s.user)
  if (!user) return <Landing />
  const dest = getPriorityDestination(user)
  return <Navigate to={dest} replace />
}

function RolePrefixRedirect() {
  const location = useLocation()
  if (!ROUTE_PROTECTION_ENABLED) {
    const path = location.pathname
    if (path.startsWith('/admin')) return <Navigate to="/admin" replace />
    if (path.startsWith('/creator')) return <Navigate to="/creator" replace />
    if (path.startsWith('/student')) return <Navigate to="/student" replace />
    return <Navigate to="/" replace />
  }
  const user = useAuthStore((s) => s.user)
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }
  return <Navigate to={getPriorityDestination(user)} replace />
}

export default function App() {
  const theme = useThemeStore((s) => s.theme)

  useEffect(() => {
    // Apply hm-light theme class to the #root mount node so every page
    // (including the hm-root page wrappers) inherits the same token set.
    const root = document.getElementById('root')
    if (!root) return
    root.classList.toggle('hm-light', theme === 'light')
  }, [theme])

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<RootRedirect />} />
          <Route path="/courses" element={<CoursesListing />} />
          <Route path="/assessments" element={<AssessmentsListing />} />
          <Route path="/community" element={<StudentCommunity />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-sent" element={<ResetSent />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <Protected allow={['admin']}>
                <AdminDashboard />
              </Protected>
            }
          />
          <Route
            path="/admin/users"
            element={
              <Protected allow={['admin']}>
                <AdminUsers />
              </Protected>
            }
          />
          <Route
            path="/admin/users/:id"
            element={
              <Protected allow={['admin']}>
                <AdminUserDetail />
              </Protected>
            }
          />
          <Route
            path="/admin/courses"
            element={
              <Protected allow={['admin']}>
                <AdminCourses />
              </Protected>
            }
          />
          <Route
            path="/admin/courses/:id"
            element={
              <Protected allow={['admin']}>
                <AdminCourseDetail />
              </Protected>
            }
          />
          <Route
            path="/admin/course-categories"
            element={
              <Protected allow={['admin']}>
                <AdminCourseCategories />
              </Protected>
            }
          />
          <Route
            path="/admin/assessments"
            element={
              <Protected allow={['admin']}>
                <AdminAssessments />
              </Protected>
            }
          />
          <Route
            path="/admin/assessments/:id"
            element={
              <Protected allow={['admin']}>
                <AdminAssessmentDetail />
              </Protected>
            }
          />
          <Route
            path="/admin/assessment-variables"
            element={
              <Protected allow={['admin']}>
                <AdminAssessmentVariables />
              </Protected>
            }
          />
          <Route
            path="/admin/session-types"
            element={
              <Protected allow={['admin']}>
                <AdminSessionTypes />
              </Protected>
            }
          />
          <Route
            path="/admin/roles"
            element={
              <Protected allow={['admin']}>
                <AdminRoles />
              </Protected>
            }
          />
          <Route
            path="/admin/permissions"
            element={
              <Protected allow={['admin']}>
                <AdminPermissions />
              </Protected>
            }
          />
          <Route
            path="/admin/role-permission"
            element={
              <Protected allow={['admin']}>
                <AdminRolePermission />
              </Protected>
            }
          />
          <Route
            path="/admin/subscriptions"
            element={
              <Protected allow={['admin']}>
                <AdminSubscriptions />
              </Protected>
            }
          />
          <Route
            path="/admin/transactions"
            element={
              <Protected allow={['admin']}>
                <AdminTransactions />
              </Protected>
            }
          />
          <Route
            path="/admin/earnings"
            element={
              <Protected allow={['admin']}>
                <AdminEarnings />
              </Protected>
            }
          />
          <Route
            path="/admin/certificates"
            element={
              <Protected allow={['admin']}>
                <AdminCertificates />
              </Protected>
            }
          />
          <Route
            path="/admin/study-groups"
            element={
              <Protected allow={['admin']}>
                <AdminStudyGroups />
              </Protected>
            }
          />
          <Route
            path="/admin/posts"
            element={
              <Protected allow={['admin']}>
                <AdminPosts />
              </Protected>
            }
          />
          <Route
            path="/admin/reviews"
            element={
              <Protected allow={['admin']}>
                <AdminReviews />
              </Protected>
            }
          />
          <Route
            path="/admin/faqs"
            element={
              <Protected allow={['admin']}>
                <AdminFAQs />
              </Protected>
            }
          />
          <Route
            path="/admin/feedbacks"
            element={
              <Protected allow={['admin']}>
                <AdminFeedbacks />
              </Protected>
            }
          />
          <Route
            path="/admin/ledgers"
            element={
              <Protected allow={['admin']}>
                <AdminLedgers />
              </Protected>
            }
          />
          <Route
            path="/admin/creator-applications"
            element={
              <Protected allow={['admin']}>
                <AdminCreatorApplications />
              </Protected>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <Protected allow={['admin']}>
                <AdminSettings />
              </Protected>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <Protected allow={['admin']}>
                <AdminProfile />
              </Protected>
            }
          />
          <Route path="/admin/*" element={<RolePrefixRedirect />} />

          {/* Creator */}
          <Route
            path="/creator"
            element={
              <Protected allow={['creator']}>
                <CreatorDashboard />
              </Protected>
            }
          />
          <Route
            path="/creator/courses"
            element={
              <Protected allow={['creator']}>
                <CreatorCourses />
              </Protected>
            }
          />
          <Route
            path="/creator/courses/:id"
            element={
              <Protected allow={['creator']}>
                <CreatorCourseEdit />
              </Protected>
            }
          />
          <Route
            path="/creator/assessments"
            element={
              <Protected allow={['creator']}>
                <CreatorAssessments />
              </Protected>
            }
          />
          <Route
            path="/creator/assessments/:id"
            element={
              <Protected allow={['creator']}>
                <CreatorAssessmentDetail />
              </Protected>
            }
          />
          <Route
            path="/creator/enrollments"
            element={
              <Protected allow={['creator']}>
                <CreatorEnrollments />
              </Protected>
            }
          />
          <Route
            path="/creator/reviews"
            element={
              <Protected allow={['creator']}>
                <CreatorReviews />
              </Protected>
            }
          />
          <Route
            path="/creator/certificates"
            element={
              <Protected allow={['creator']}>
                <CreatorCertificates />
              </Protected>
            }
          />
          <Route
            path="/creator/profile"
            element={
              <Protected allow={['creator']}>
                <CreatorProfile />
              </Protected>
            }
          />
          <Route
            path="/creator/earnings"
            element={
              <Protected allow={['creator']}>
                <CreatorEarnings />
              </Protected>
            }
          />
          <Route
            path="/creator/subscription"
            element={
              <Protected allow={['creator']}>
                <CreatorSubscription />
              </Protected>
            }
          />
          <Route
            path="/creator/credit-log"
            element={
              <Protected allow={['creator']}>
                <CreatorCreditLog />
              </Protected>
            }
          />
          <Route
            path="/creator/settings"
            element={
              <Protected allow={['creator']}>
                <CreatorSettings />
              </Protected>
            }
          />
          <Route path="/creator/*" element={<RolePrefixRedirect />} />

          {/* Student */}
          <Route
            path="/student"
            element={
              <Protected allow={['student']}>
                <StudentHome />
              </Protected>
            }
          />
          <Route
            path="/student/courses"
            element={
              <Protected allow={['student']}>
                <StudentCourses />
              </Protected>
            }
          />
          <Route
            path="/student/my-courses"
            element={
              <Protected allow={['student']}>
                <StudentMyCourses />
              </Protected>
            }
          />
          <Route
            path="/student/courses/:id"
            element={
              <Protected allow={['student']}>
                <StudentCourseDetail />
              </Protected>
            }
          />
          <Route
            path="/student/courses/:id/learn"
            element={
              <Protected allow={['student']}>
                <StudentCourseViewer />
              </Protected>
            }
          />
          <Route
            path="/student/assessments"
            element={
              <Protected allow={['student']}>
                <StudentAssessments />
              </Protected>
            }
          />
          <Route
            path="/student/my-assessments"
            element={
              <Protected allow={['student']}>
                <StudentMyAssessments />
              </Protected>
            }
          />
          <Route
            path="/student/assessments/:id"
            element={
              <Protected allow={['student']}>
                <StudentAssessmentDetail />
              </Protected>
            }
          />
          <Route
            path="/student/assessments/:id/quiz"
            element={
              <Protected allow={['student']}>
                <StudentAssessmentQuiz />
              </Protected>
            }
          />
          <Route
            path="/student/assessments/:id/result"
            element={
              <Protected allow={['student']}>
                <StudentAssessmentResult />
              </Protected>
            }
          />
          <Route
            path="/student/community"
            element={
              <Protected allow={['student']}>
                <StudentCommunity />
              </Protected>
            }
          />
          <Route
            path="/student/certificates"
            element={
              <Protected allow={['student']}>
                <StudentCertificates />
              </Protected>
            }
          />
          <Route
            path="/student/inbox"
            element={
              <Protected allow={['student']}>
                <StudentInbox />
              </Protected>
            }
          />
          <Route
            path="/student/notifications"
            element={
              <Protected allow={['student']}>
                <StudentNotifications />
              </Protected>
            }
          />
          <Route
            path="/student/profile"
            element={
              <Protected allow={['student']}>
                <StudentProfile />
              </Protected>
            }
          />
          <Route
            path="/student/subscription"
            element={
              <Protected allow={['student']}>
                <StudentSubscription />
              </Protected>
            }
          />
          <Route
            path="/student/credit-log"
            element={
              <Protected allow={['student']}>
                <StudentCreditLog />
              </Protected>
            }
          />
          <Route
            path="/student/apply-creator"
            element={
              <Protected allow={['student']}>
                <StudentApplyCreator />
              </Protected>
            }
          />
          <Route
            path="/student/feedback"
            element={
              <Protected allow={['student']}>
                <StudentFeedback />
              </Protected>
            }
          />
          <Route path="/student/*" element={<RolePrefixRedirect />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}
