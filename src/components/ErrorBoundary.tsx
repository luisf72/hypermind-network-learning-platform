import { Component, type ErrorInfo, type ReactNode } from 'react'
import i18n from '@/i18n'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', error, info)
  }

  private handleReload = () => {
    this.setState({ error: null })
    window.location.reload()
  }

  render() {
    if (this.state.error) {
      if (this.props.fallback) return this.props.fallback
      const t = i18n.t.bind(i18n)
      return (
        <div
          className="hm-root"
          style={{
            minHeight: '100vh',
            display: 'grid',
            placeItems: 'center',
            background: 'var(--hm-bg)',
            color: 'var(--hm-text)',
            padding: 24,
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: 480 }}>
            <p
              className="hm-mono"
              style={{
                color: 'var(--hm-pink, #F4636E)',
                fontSize: 11,
                letterSpacing: '0.18em',
                marginBottom: 12,
              }}
            >
              ERROR
            </p>
            <h1
              style={{
                fontFamily: 'var(--hm-font-display)',
                fontSize: 32,
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              {t('common.somethingWrong')}
            </h1>
            <p style={{ color: 'var(--hm-text-muted)', marginBottom: 20 }}>
              {t('common.tryReload')}
            </p>
            <button type="button" onClick={this.handleReload} className="hm-btn-primary h-10 px-5">
              {t('common.reload')}
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
