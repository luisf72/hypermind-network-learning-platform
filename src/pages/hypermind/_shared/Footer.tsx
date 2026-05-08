import { Twitter, Github, Linkedin, Youtube, Sparkles, Globe, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const socials = [
  { Icon: Twitter, label: 'Twitter' },
  { Icon: Github, label: 'GitHub' },
  { Icon: Linkedin, label: 'LinkedIn' },
  { Icon: Youtube, label: 'YouTube' },
]

export function Footer() {
  const { t } = useTranslation()

  const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
    {
      heading: t('footer.learn'),
      links: [
        { label: t('footer.courses'), href: '/courses' },
        { label: t('footer.assessments'), href: '/assessments' },
        { label: t('footer.community'), href: '/community' },
        { label: t('footer.certifications'), href: '/courses' },
        { label: t('footer.aiTutor'), href: '/community' },
      ],
    },
    {
      heading: t('footer.company'),
      links: [
        { label: t('footer.about'), href: '/' },
        { label: t('footer.blog'), href: '/' },
        { label: t('footer.careers'), href: '/' },
        { label: t('footer.press'), href: '/' },
        { label: t('footer.contact'), href: '/' },
      ],
    },
    {
      heading: t('footer.legal'),
      links: [
        { label: t('footer.terms'), href: '/' },
        { label: t('footer.privacy'), href: '/' },
        { label: t('footer.cookies'), href: '/' },
        { label: t('footer.accessibility'), href: '/' },
      ],
    },
  ]

  return (
    <footer
      className="relative mt-20"
      style={{
        borderTop: '1px solid var(--hm-border)',
        background: 'var(--hm-footer-bg, transparent)',
      }}
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-[260px] shrink-0">
            <div className="flex items-center gap-2.5">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: 'var(--hm-grad-primary)', boxShadow: 'var(--hm-glow-violet)' }}
              >
                <Sparkles className="h-3.5 w-3.5 text-white" />
              </span>
              <span
                className="text-[17px] font-semibold tracking-tight"
                style={{ fontFamily: 'var(--hm-font-display)', color: 'var(--hm-text)' }}
              >
                Hyper<span style={{ color: 'var(--hm-violet-2)' }}>Mind</span>
              </span>
            </div>
            <p
              className="mt-3 text-[13px] leading-relaxed"
              style={{ color: 'var(--hm-text-muted)' }}
            >
              {t('footer.tagline')}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 sm:gap-12">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <p
                  className="hm-mono text-[10px] font-bold mb-4 tracking-[0.12em]"
                  style={{ color: 'var(--hm-text-dim)', letterSpacing: '0.12em' }}
                >
                  {col.heading.toUpperCase()}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-[13px] font-medium transition-colors"
                        style={{ color: 'var(--hm-text-muted)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--hm-text)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--hm-text-muted)')}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="hm-divider mt-10" />

        <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            {socials.map(({ Icon, label }) => (
              <a
                key={label}
                href="https://hypermind.io"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-all"
                style={{
                  background: 'transparent',
                  border: '1px solid var(--hm-border)',
                  color: 'var(--hm-text-muted)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--hm-violet-soft)'
                  e.currentTarget.style.borderColor = 'var(--hm-border-accent)'
                  e.currentTarget.style.color = 'var(--hm-violet-2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = 'var(--hm-border)'
                  e.currentTarget.style.color = 'var(--hm-text-muted)'
                }}
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>

          <p className="text-[12px]" style={{ color: 'var(--hm-text-dim)' }}>
            {t('footer.rights')}
          </p>

          <a
            href="https://hypermind.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[12.5px] font-medium transition-colors"
            style={{ color: 'var(--hm-text-muted)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--hm-violet-2)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--hm-text-muted)')}
          >
            <Globe className="h-3.5 w-3.5" />
            <span>hypermind.io</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
