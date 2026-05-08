interface BrandLogoProps {
  size?: number
  className?: string
}

export function BrandLogo({ size = 28, className }: BrandLogoProps) {
  return (
    <img
      src="/logo.png"
      alt="HyperMind logo"
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, objectFit: 'contain' }}
    />
  )
}
