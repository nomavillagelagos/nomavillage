import Link from 'next/link'
import Image from 'next/image'
import { CalendarIcon, ClockIcon, UserIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { BlogPost } from '@/types/blog'
import { format } from 'date-fns'

export function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
        <div className="relative h-48 w-full bg-gray-100">
          {post.featured_image ? (
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center font-montserrat text-4xl text-gray-300">
              {post.title.charAt(0)}
            </div>
          )}
        </div>
        <CardContent className="p-5">
          <h3 className="font-montserrat text-xl md:text-2xl font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
          <p className="font-nunito text-base md:text-lg text-gray-700 mb-4 line-clamp-3">{post.excerpt}</p>
          <div className="flex items-center gap-4 text-gray-500 text-xs font-nunito">
            <span className="inline-flex items-center gap-1"><UserIcon className="h-3 w-3" />{post.author.name}</span>
            <span className="inline-flex items-center gap-1"><CalendarIcon className="h-3 w-3" />{format(new Date(post.published_at), 'MMM dd, yyyy')}</span>
            <span className="inline-flex items-center gap-1"><ClockIcon className="h-3 w-3" />{post.read_time} min</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
