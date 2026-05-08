import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useThemeStore } from '@/stores/themeStore'
import { Header } from './hypermind/_shared/Header'
import { Footer } from './hypermind/_shared/Footer'

export default function NotFound() {
  const { t } = useTranslation()
  const isLight = useThemeStore((s) => s.theme === 'light')
  return (
    <div className={`hm-root ${isLight ? 'hm-light' : ''}`}>
      <Header />
      <main
        style={{
          minHeight: 'calc(100vh - 56px - 200px)',
          display: 'grid',
          placeItems: 'center',
          padding: '60px 24px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 520 }}>
          <p
            className="hm-mono"
            style={{
              color: 'var(--hm-violet-2)',
              fontSize: 11,
              letterSpacing: '0.18em',
              marginBottom: 12,
            }}
          >
            404
          </p>
          <h1
            style={{
              fontFamily: 'var(--hm-font-display)',
              fontSize: 44,
              fontWeight: 600,
              letterSpacing: '-0.03em',
              marginBottom: 12,
              color: 'var(--hm-text)',
            }}
          >
            {t('common.notFoundTitle')}
          </h1>
          <p
            style={{
              color: 'var(--hm-text-muted)',
              fontSize: 14,
              lineHeight: 1.55,
              marginBottom: 22,
            }}
          >
            {t('common.notFoundBody')}
          </p>
          <Link to="/" className="hm-btn-primary h-10 px-5 inline-flex items-center">
            {t('common.backHome')}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
