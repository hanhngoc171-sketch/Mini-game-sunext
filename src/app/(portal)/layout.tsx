import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Company Quiz Game',
  description: 'Internal quiz game for company events',
}

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
