import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

import SEO from "@/components/SEO";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCard from "@/components/ProductCard";
import BlogPreview from "@/components/BlogPreview";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  // Fetch featured products
  const { data: featuredProducts, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['/api/products', { featured: true }],
    queryFn: async () => {
      const res = await fetch('/api/products?featured=true&limit=4');
      if (!res.ok) throw new Error('Failed to fetch featured products');
      return res.json();
    }
  });
  
  // Fetch categories to get names for the products
  const { data: categories } = useQuery({
    queryKey: ['/api/categories'],
    staleTime: Infinity, // Categories rarely change
  });
  
  // Set page title on mount
  useEffect(() => {
    document.title = "WorldMapX - Curated Maps, Prints & Historical Artifacts";
  }, []);
  
  // Get category name by ID
  const getCategoryName = (categoryId: number) => {
    if (!categories) return "";
    const category = categories.find((c: any) => c.id === categoryId);
    return category ? category.name : "";
  };
  
  return (
    <>
      <SEO 
        title="Home" 
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "WorldMapX",
          "url": "https://worldmapx.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://worldmapx.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />
      
      <Hero />
      
      <CategoryGrid />
      
      {/* Featured Products */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900">
                Featured Items
              </h2>
              <p className="mt-2 text-lg text-neutral-600">
                Highlights from our latest acquisitions
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link 
                href="/shop/maps" 
                className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
              >
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoadingProducts ? (
              // Skeleton loading state
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="aspect-ratio-container aspect-ratio-1-1 bg-neutral-200 animate-pulse"></div>
                  <div className="p-4">
                    <div className="h-3 w-16 bg-neutral-200 animate-pulse rounded mb-1"></div>
                    <div className="h-5 w-full bg-neutral-200 animate-pulse rounded mb-3"></div>
                    <div className="h-4 w-full bg-neutral-200 animate-pulse rounded mb-2"></div>
                    <div className="h-4 w-3/4 bg-neutral-200 animate-pulse rounded mb-3"></div>
                    <div className="flex justify-between">
                      <div className="h-5 w-16 bg-neutral-200 animate-pulse rounded"></div>
                      <div className="h-8 w-8 bg-neutral-200 animate-pulse rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              featuredProducts?.map((product: any) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  categoryName={getCategoryName(product.categoryId)}
                />
              ))
            )}
          </div>
        </div>
      </section>
      
      <BlogPreview />
      
      <Newsletter />
    </>
  );
}
