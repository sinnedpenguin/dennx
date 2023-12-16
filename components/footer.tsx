import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'px-2 text-center text-xs leading-normal text-muted-foreground',
        className
      )}
      {...props}
    >
      AI chatbot powered by Google&apos;s <ExternalLink href="https://deepmind.google/technologies/gemini/#introduction">Gemini Pro</ExternalLink> -{' '}
      <ExternalLink href="https://www.sinnedpenguin.me/">
        sinnedpenguin
      </ExternalLink>
      .
    </p>
  )
}
