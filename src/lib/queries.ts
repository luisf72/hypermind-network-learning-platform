import { useQuery } from '@tanstack/react-query'
import { fetchCourses, fetchAssessments, fetchCertificates } from '@/data/seed'

export const queryKeys = {
  courses: ['courses'] as const,
  assessments: ['assessments'] as const,
  certificates: ['certificates'] as const,
}

export function useCoursesQuery() {
  return useQuery({ queryKey: queryKeys.courses, queryFn: fetchCourses })
}

export function useAssessmentsQuery() {
  return useQuery({
    queryKey: queryKeys.assessments,
    queryFn: fetchAssessments,
  })
}

export function useCertificatesQuery() {
  return useQuery({
    queryKey: queryKeys.certificates,
    queryFn: fetchCertificates,
  })
}
