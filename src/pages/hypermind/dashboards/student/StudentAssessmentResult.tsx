import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  Target,
  RotateCcw,
  Download,
  Share2,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react'
import StudentShell, { VIOLET, VIOLET_SOFT, GREEN, AMBER } from './StudentShell'

const RESULT = {
  title: 'AI Engineer · Foundations',
  category: 'Tech & Coding',
  score: 84,
  passing: 70,
  duration: '47:12',
  completedAt: 'May 5, 2026 · 2:14 PM',
  totalQuestions: 50,
  correct: 42,
  incorrect: 6,
  skipped: 2,
  attempt: 1,
  maxAttempts: 3,
}

const BREAKDOWN = [
  { label: 'LLM fundamentals', correct: 9, total: 10 },
  { label: 'Embeddings & retrieval', correct: 8, total: 10 },
  { label: 'Prompt engineering', correct: 9, total: 10 },
  { label: 'Fine-tuning', correct: 7, total: 10 },
  { label: 'Production & evals', correct: 9, total: 10 },
]

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div
      className="rounded-xl px-4 py-3"
      style={{ background: 'var(--hm-bg-card-2)', border: '1px solid var(--hm-border)' }}
    >
      <p
        className="hm-mono text-[9px] font-bold mb-1"
        style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.10em' }}
      >
        {label}
      </p>
      <p className="hm-mono text-[18px] font-extrabold" style={{ color }}>
        {value}
      </p>
    </div>
  )
}

export default function StudentAssessmentResult() {
  const { t } = useTranslation()
  const { id = 'f1' } = useParams<{ id: string }>()
  const passed = RESULT.score >= RESULT.passing
  const delta = RESULT.score - RESULT.passing
  const retakesLeft = RESULT.maxAttempts - RESULT.attempt

  return (
    <StudentShell activeTab="my-assessments">
      <Link
        to="/student/my-assessments"
        className="inline-flex items-center gap-1.5 text-[12.5px] mb-5"
        style={{ color: 'var(--hm-text-muted)', textDecoration: 'none' }}
      >
        <ArrowLeft className="h-3.5 w-3.5" /> {t('studentShell.resultBack')}
      </Link>

      <section
        className="rounded-2xl p-6 mb-5 relative overflow-hidden"
        style={{
          background: passed
            ? `linear-gradient(135deg, rgba(94,230,168,0.10) 0%, rgba(94,230,168,0.02) 100%)`
            : `linear-gradient(135deg, rgba(244,99,110,0.10) 0%, rgba(244,99,110,0.02) 100%)`,
          border: `1px solid ${passed ? 'rgba(94,230,168,0.30)' : 'rgba(244,99,110,0.30)'}`,
        }}
      >
        <div className="flex items-center gap-6 flex-wrap">
          <div className="relative h-32 w-32 shrink-0">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="var(--hm-border)"
                strokeWidth="10"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke={passed ? GREEN : '#F4636E'}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${(RESULT.score / 100) * 326.7} 326.7`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="hm-mono text-[32px] font-extrabold"
                style={{ color: passed ? GREEN : '#F4636E' }}
              >
                {RESULT.score}%
              </span>
              <span
                className="hm-mono text-[9px] font-bold"
                style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.10em' }}
              >
                {t('studentShell.resultScore')}
              </span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <span
              className="hm-mono inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold mb-2"
              style={{
                background: passed ? 'rgba(94,230,168,0.18)' : 'rgba(244,99,110,0.18)',
                color: passed ? GREEN : '#F4636E',
                border: `1px solid ${passed ? 'rgba(94,230,168,0.35)' : 'rgba(244,99,110,0.35)'}`,
                letterSpacing: '0.10em',
              }}
            >
              {passed ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
              {passed ? t('studentShell.resultPassed') : t('studentShell.resultDidNotPass')}
            </span>
            <h1
              className="text-[24px] font-semibold mb-1"
              style={{ color: 'var(--hm-text)', letterSpacing: '-0.022em' }}
            >
              {RESULT.title}
            </h1>
            <p className="text-[13px]" style={{ color: 'var(--hm-text-muted)' }}>
              {RESULT.category} ·{' '}
              {t('studentShell.resultAttemptOf', {
                attempt: RESULT.attempt,
                max: RESULT.maxAttempts,
              })}{' '}
              · {RESULT.completedAt}
            </p>
            <div
              className="flex items-center gap-4 mt-3 flex-wrap text-[12px]"
              style={{ color: 'var(--hm-text-dim)' }}
            >
              <span className="flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5" />{' '}
                {t('studentShell.resultPassing', { passing: RESULT.passing })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {RESULT.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5" />{' '}
                {t('studentShell.resultVsPassing', { delta: delta >= 0 ? `+${delta}` : delta })}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <Stat
          label={t('studentShell.resultCorrect')}
          value={String(RESULT.correct)}
          color={GREEN}
        />
        <Stat
          label={t('studentShell.resultIncorrect')}
          value={String(RESULT.incorrect)}
          color="#F4636E"
        />
        <Stat
          label={t('studentShell.resultSkipped')}
          value={String(RESULT.skipped)}
          color={AMBER}
        />
        <Stat
          label={t('studentShell.resultTotal')}
          value={String(RESULT.totalQuestions)}
          color="var(--hm-text)"
        />
      </section>

      <section
        className="rounded-2xl p-5 mb-5"
        style={{ background: 'var(--hm-bg-card)', border: '1px solid var(--hm-border)' }}
      >
        <h2
          className="text-[15px] font-semibold mb-4"
          style={{ color: 'var(--hm-text)', letterSpacing: '-0.012em' }}
        >
          {t('studentShell.resultByTopic')}
        </h2>
        <div className="flex flex-col gap-3">
          {BREAKDOWN.map((b) => {
            const pct = (b.correct / b.total) * 100
            const color = pct >= 80 ? GREEN : pct >= 60 ? AMBER : '#F4636E'
            return (
              <div key={b.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[13px]" style={{ color: 'var(--hm-text)' }}>
                    {b.label}
                  </span>
                  <span className="hm-mono text-[12px] font-bold" style={{ color }}>
                    {b.correct}/{b.total}
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: 'var(--hm-bg-card-2)' }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, background: color }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {passed ? (
        <section
          className="rounded-2xl p-6 text-center"
          style={{ background: VIOLET_SOFT, border: `1px solid ${VIOLET}33` }}
        >
          <Award className="h-12 w-12 mx-auto mb-3" style={{ color: VIOLET }} />
          <h2 className="text-[18px] font-semibold mb-1" style={{ color: 'var(--hm-text)' }}>
            {t('studentShell.resultCertReady')}
          </h2>
          <p
            className="text-[13px] mb-4 max-w-md mx-auto"
            style={{ color: 'var(--hm-text-muted)' }}
          >
            {t('studentShell.resultCertBody')}
          </p>
          <div className="flex items-center gap-2 justify-center flex-wrap">
            <Link
              to="/student/certificates"
              className="inline-flex items-center gap-1.5 h-10 px-5 rounded-lg text-[13px] font-semibold"
              style={{
                background: VIOLET,
                color: 'white',
                textDecoration: 'none',
                boxShadow: `0 6px 18px ${VIOLET}55`,
              }}
            >
              <ShieldCheck className="h-4 w-4" /> {t('studentShell.resultViewCert')}
            </Link>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-[13px] font-medium"
              style={{
                background: 'var(--hm-bg-card-2)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text)',
              }}
            >
              <Download className="h-4 w-4" /> {t('studentShell.resultDownloadPdf')}
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-[13px] font-medium"
              style={{
                background: 'var(--hm-bg-card-2)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text)',
              }}
            >
              <Share2 className="h-4 w-4" /> {t('studentShell.resultShare')}
            </button>
          </div>
        </section>
      ) : (
        <section
          className="rounded-2xl p-6 text-center"
          style={{ background: 'rgba(244,99,110,0.06)', border: '1px solid rgba(244,99,110,0.25)' }}
        >
          <h2 className="text-[18px] font-semibold mb-1" style={{ color: 'var(--hm-text)' }}>
            {t('studentShell.resultShortBy', { n: RESULT.passing - RESULT.score })}
          </h2>
          <p
            className="text-[13px] mb-4 max-w-md mx-auto"
            style={{ color: 'var(--hm-text-muted)' }}
          >
            {t('studentShell.resultRetakesLeft', { count: retakesLeft })}
          </p>
          <div className="flex items-center gap-2 justify-center flex-wrap">
            <Link
              to={`/student/assessments/${id}/quiz`}
              className="inline-flex items-center gap-1.5 h-10 px-5 rounded-lg text-[13px] font-semibold"
              style={{
                background: VIOLET,
                color: 'white',
                textDecoration: 'none',
                boxShadow: `0 6px 18px ${VIOLET}55`,
              }}
            >
              <RotateCcw className="h-4 w-4" /> {t('studentShell.resultRetake')}
            </Link>
            <Link
              to={`/student/assessments/${id}`}
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg text-[13px] font-medium"
              style={{
                background: 'var(--hm-bg-card-2)',
                border: '1px solid var(--hm-border)',
                color: 'var(--hm-text)',
                textDecoration: 'none',
              }}
            >
              {t('studentShell.resultViewDetails')}
            </Link>
          </div>
        </section>
      )}
    </StudentShell>
  )
}
