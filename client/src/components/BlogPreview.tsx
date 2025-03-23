import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

export default function BlogPreview() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['/api/blog'],
    queryFn: async () => {
      const res = await fetch('/api/blog?limit=3');
      if (!res.ok) throw new Error('Failed to fetch blog posts');
      return res.json();
    }
  });
  
  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <div className="h-8 w-64 bg-neutral-200 animate-pulse rounded"></div>
              <div className="h-6 w-96 bg-neutral-200 animate-pulse rounded mt-4"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
                <div className="aspect-ratio-container aspect-ratio-16-9 bg-neutral-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-4 w-24 bg-neutral-200 animate-pulse rounded mb-3"></div>
                  <div className="h-6 w-full bg-neutral-200 animate-pulse rounded mb-2"></div>
                  <div className="h-4 w-full bg-neutral-200 animate-pulse rounded mb-1"></div>
                  <div className="h-4 w-full bg-neutral-200 animate-pulse rounded mb-1"></div>
                  <div className="h-4 w-3/4 bg-neutral-200 animate-pulse rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-500">Error loading blog posts. Please try again later.</p>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900">
              From Our Blog
            </h2>
            <p className="mt-2 text-lg text-neutral-600">
              Stories, insights and discoveries from the world of historical maps and artifacts
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
            >
              View All Articles
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts?.map((post: any) => {
            const date = post.createdAt ? new Date(post.createdAt) : new Date();
            const formattedDate = format(date, 'MMMM d, yyyy');
            
            return (
              <article 
                key={post.id} 
                className="blog-card bg-white border border-neutral-200 rounded-lg overflow-hidden group hover:shadow-md transition duration-300"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="aspect-ratio-container aspect-ratio-16-9 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex items-center text-sm text-neutral-600 mb-3">
                    <span>{formattedDate}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime} min read</span>
                  </div>
                  <h3 className="text-xl font-serif font-semibold mb-2 blog-title transition duration-150">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-neutral-600 line-clamp-3">{post.excerpt}</p>
                  <Link 
                    href={`/blog/${post.slug}`} 
                    className="inline-flex items-center text-primary font-medium mt-4"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-[18px] w-[18px]" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
