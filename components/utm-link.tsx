"use client"

import { useMemo } from "react"

interface UTMAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  baseUrl: string
}

export function UTMAnchor({ baseUrl, ...props }: UTMAnchorProps) {
  const href = useMemo(() => {
    try {
      const url = new URL(baseUrl)
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search)
        params.forEach((value, key) => {
          const lower = key.toLowerCase()
          if (lower.startsWith("utm_")) {
            url.searchParams.set(lower, value)
          }
        })
        if (document.referrer && !url.searchParams.has("referrer")) {
          url.searchParams.set("referrer", document.referrer)
        }
      }
      return url.toString()
    } catch {
      return baseUrl
    }
  }, [baseUrl])

  return <a href={href} {...props} />
}
