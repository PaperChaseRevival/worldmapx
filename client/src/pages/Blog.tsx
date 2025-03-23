import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";

import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import Newsletter from "@/components/Newsletter";

export default function Blog() {
  // Fetch all blog posts
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['/api/blog'],
    queryFn: async () => {
      const res = await fetch('/api/blog');
      if (!res.ok) throw new Error('Failed to fetch blog posts');
      return res.json();
    }
  });
  
  useEffect(() => {
    document.title = "Blog | WorldMapX";
  }, []);
  
  return (
    <>
      <SEO 
        title="Blog" 
        description="Discover stories, insights and historical perspectives from the world of maps, prints and artifacts at WorldMapX."
        type="website"
        schema={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "WorldMapX Blog",
          "description": "Stories, insights and discoveries from the world of historical maps and artifacts"
        }}
      />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[
          { label: "Blog" }
        ]} />
        
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-4">
            From Our Blog
          </h1>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Stories, insights and discoveries from the world of historical maps and artifacts
          </p>
        </div>
        
        {isLoading ? (
          <div className="space-y-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="aspect-ratio-container aspect-ratio-16-9 md:aspect-ratio-1-1 bg-neutral-200 animate-pulse"></div>
                  <div className="p-6 md:col-span-2">
                    <div className="h-4 w-24 bg-neutral-200 animate-pulse rounded mb-3"></div>
                    <div className="h-6 w-full bg-neutral-200 animate-pulse rounded mb-3"></div>
                    <div className="h-4 w-full bg-neutral-200 animate-pulse rounded mb-2"></div>
                    <div className="h-4 w-full bg-neutral-200 animate-pulse rounded mb-2"></div>
                    <div className="h-4 w-3/4 bg-neutral-200 animate-pulse rounded mb-4"></div>
                    <div className="h-4 w-20 bg-neutral-200 animate-pulse rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-white rounded-lg border border-neutral-200">
            <h3 className="text-xl font-medium mb-2">Error loading blog posts</h3>
            <p className="text-neutral-600">
              Please try again later or contact support if the issue persists.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts?.map((post: any) => {
              const date = post.createdAt ? new Date(post.createdAt) : new Date();
              const formattedDate = format(date, 'MMMM d, yyyy');
              
              return (
                <article 
                  key={post.id} 
                  className="blog-card bg-white border border-neutral-200 rounded-lg overflow-hidden group hover:shadow-md transition duration-300"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="aspect-ratio-container aspect-ratio-16-9 md:aspect-ratio-1-1 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                    
                    <div className="p-6 md:col-span-2">
                      <div className="flex items-center text-sm text-neutral-600 mb-3">
                        <span>{formattedDate}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime} min read</span>
                      </div>
                      
                      <h2 className="text-2xl font-serif font-semibold mb-3 blog-title transition duration-150">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      
                      <p className="text-neutral-600 mb-4">
                        {post.excerpt}
                      </p>
                      
                      <Link 
                        href={`/blog/${post.slug}`} 
                        className="inline-flex items-center text-primary font-medium"
                      >
                        Read More
                        <ArrowRight className="ml-1 h-[18px] w-[18px]" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
      
      <Newsletter />
    </>
  );
}
