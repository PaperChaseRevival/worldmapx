import { useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Calendar, Clock, Share2, Facebook, Twitter } from "lucide-react";

import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPreview from "@/components/BlogPreview";
import Newsletter from "@/components/Newsletter";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function BlogPost() {
  const { slug } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // Fetch blog post
  const { data: post, isLoading } = useQuery({
    queryKey: [`/api/blog/${slug}`],
    queryFn: async () => {
      const res = await fetch(`/api/blog/${slug}`);
      if (!res.ok) {
        if (res.status === 404) {
          setLocation('/not-found');
          return null;
        }
        throw new Error('Failed to fetch blog post');
      }
      return res.json();
    },
    enabled: !!slug
  });
  
  // Set page title when post loads
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | WorldMapX Blog`;
    }
  }, [post]);
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Article link copied to clipboard.",
      });
    }
  };
  
  const renderContent = (content: string) => {
    if (!content) return null;
    
    // Convert markdown-like content to HTML (simplified)
    const parts = content.split(/^(#{1,6})\s+(.+)$/m);
    let html = '';
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      
      if (part === '#') {
        // H1 heading
        i += 2; // Skip the next part and get the heading text
        html += `<h1 class="text-3xl font-serif font-bold mt-6 mb-4">${parts[i]}</h1>`;
      } else if (part === '##') {
        // H2 heading
        i += 2;
        html += `<h2 class="text-2xl font-serif font-bold mt-6 mb-3">${parts[i]}</h2>`;
      } else if (part === '###') {
        // H3 heading
        i += 2;
        html += `<h3 class="text-xl font-serif font-semibold mt-5 mb-3">${parts[i]}</h3>`;
      } else if (part && !part.match(/^#+$/)) {
        // Regular paragraph
        const paragraphs = part.split('\n\n');
        paragraphs.forEach(paragraph => {
          if (paragraph.trim()) {
            html += `<p class="mb-4">${paragraph}</p>`;
          }
        });
      }
    }
    
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };
  
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-6 w-48 bg-neutral-200 animate-pulse rounded mb-6"></div>
        <div className="h-10 w-3/4 bg-neutral-200 animate-pulse rounded mb-4"></div>
        <div className="h-4 w-full bg-neutral-200 animate-pulse rounded mb-8"></div>
        <div className="aspect-ratio-container aspect-ratio-16-9 bg-neutral-200 animate-pulse rounded-lg mb-8"></div>
        <div className="space-y-3">
          <div className="h-4 w-full bg-neutral-200 animate-pulse rounded"></div>
          <div className="h-4 w-full bg-neutral-200 animate-pulse rounded"></div>
          <div className="h-4 w-3/4 bg-neutral-200 animate-pulse rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!post) return null;
  
  const date = post.createdAt ? new Date(post.createdAt) : new Date();
  const formattedDate = format(date, 'MMMM d, yyyy');
  
  return (
    <>
      <SEO 
        title={post.title} 
        description={post.excerpt}
        type="article"
        image={post.image}
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "image": post.image,
          "datePublished": post.createdAt,
          "dateModified": post.updatedAt,
          "author": {
            "@type": "Organization",
            "name": "WorldMapX"
          },
          "publisher": {
            "@type": "Organization",
            "name": "WorldMapX",
            "logo": {
              "@type": "ImageObject",
              "url": "https://worldmapx.com/logo.png"
            }
          },
          "description": post.excerpt
        }}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[
          { label: "Blog", href: "/blog" },
          { label: post.title }
        ]} />
        
        <article>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mt-6 mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center text-sm text-neutral-600 mb-6 gap-x-4 gap-y-2">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
          
          {post.image && (
            <div className="aspect-ratio-container aspect-ratio-16-9 rounded-lg overflow-hidden mb-8">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="prose max-w-none mb-8">
            {renderContent(post.content)}
          </div>
          
          <div className="border-t border-neutral-200 pt-6 mt-8">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="text-sm font-medium">Share this article:</div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                >
                  <Facebook className="h-4 w-4" />
                  <span className="hidden sm:inline">Facebook</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                >
                  <Twitter className="h-4 w-4" />
                  <span className="hidden sm:inline">Twitter</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
              </div>
            </div>
          </div>
        </article>
      </div>
      
      <div className="bg-neutral-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-8 text-center">
            More Articles You Might Enjoy
          </h2>
          <BlogPreview />
        </div>
      </div>
      
      <Newsletter />
    </>
  );
}
