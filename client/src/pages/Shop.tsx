import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";

export default function Shop() {
  // Fetch all products
  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['/api/products'],
    queryFn: async () => {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch products');
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
    document.title = "Shop | WorldMapX";
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
        title="Shop" 
        description="Explore our curated collection of historical maps, prints, photographs, and artifacts from around the world."
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Shop | WorldMapX",
          "description": "Explore our curated collection of historical maps, prints, photographs, and artifacts from around the world."
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[
          { label: "Shop" }
        ]} />
        
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-4">
            Our Collection
          </h1>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Discover our curated selection of historical artifacts that tell stories of exploration, discovery, and human creativity throughout the centuries.
          </p>
        </div>
        
        {/* Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6">
            Browse by Category
          </h2>
          <CategoryGrid />
        </div>
        
        {/* Featured Products */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6">
            Featured Items
          </h2>
          
          {isLoadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array(4).fill(0).map((_, index) => (
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
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products?.filter((product: any) => product.featured)
                .slice(0, 4)
                .map((product: any) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    categoryName={getCategoryName(product.categoryId)}
                  />
                ))
              }
            </div>
          )}
        </div>
        
        {/* New Arrivals */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-6">
            New Arrivals
          </h2>
          
          {isLoadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array(4).fill(0).map((_, index) => (
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
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products?.filter((product: any) => product.isNew)
                .slice(0, 4)
                .map((product: any) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    categoryName={getCategoryName(product.categoryId)}
                  />
                ))
              }
            </div>
          )}
        </div>
      </div>
      
      <Newsletter />
    </>
  );
}
