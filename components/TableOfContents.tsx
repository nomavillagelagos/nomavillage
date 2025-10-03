"use client"

import { useEffect, useMemo, useState } from 'react'

type TOCItem = { id: string; text: string; level: number }

export function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const items = useMemo<TOCItem[]>(() => {
    if (!content) return []
    const container = document.createElement('div')
    container.innerHTML = content
    const headings = Array.from(container.querySelectorAll('h2, h3')) as HTMLHeadingElement[]
    return headings.map((h) => {
      const id = h.id || h.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || ''
      return { id, text: h.textContent || '', level: h.tagName === 'H2' ? 2 : 3 }
    })
  }, [content])

  useEffect(() => {
    if (!items.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const top = visible[0]?.target as HTMLElement | undefined
        if (top?.id) setActiveId(top.id)
      },
      { rootMargin: '0px 0px -70% 0px', threshold: [0, 0.1, 0.25, 0.5, 1] }
    )
    const elements: HTMLElement[] = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el)
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  if (!items.length) return null

  return (
    <nav aria-label="Table of contents" className="border rounded-lg p-4 bg-white/70">
      <div className="font-montserrat text-sm font-semibold text-gray-800 mb-2">On this page</div>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'ml-3' : ''}>
            <a
              href={`#${item.id}`}
              className={`block text-sm font-nunito hover:text-lagos-blue-green ${activeId === item.id ? 'text-lagos-blue-green' : 'text-gray-600'}`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
