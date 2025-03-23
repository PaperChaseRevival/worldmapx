import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Filter } from "lucide-react";

import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import ShopFilters from "@/components/ShopFilters";
import Newsletter from "@/components/Newsletter";
import { Button } from "@/components/ui/button";

export default function ShopCategory() {
  const { category: categorySlug } = useParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    period: [],
    region: [],
    condition: [],
  });
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  
  // Fetch category details
  const { data: category, isLoading: isLoadingCategory } = useQuery({
    queryKey: [`/api/categories/${categorySlug}`],
    queryFn: async () => {
      const res = await fetch(`/api/categories/${categorySlug}`);
      if (!res.ok) throw new Error('Failed to fetch category');
      return res.json();
    },
    enabled: !!categorySlug
  });
  
  // Fetch products for this category
  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['/api/products', { categorySlug }],
    queryFn: async () => {
      const res = await fetch(`/api/products?categorySlug=${categorySlug}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      return res.json();
    },
    enabled: !!categorySlug
  });
  
  useEffect(() => {
    if (category) {
      document.title = `${category.name} | WorldMapX`;
    }
  }, [category]);
  
  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };
  
  const handleFilterChange = (filters: Record<string, string[]>) => {
    setActiveFilters(filters);
    // In a real implementation, this would filter the products
    console.log("Filters changed:", filters);
  };
  
  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
    // In a real implementation, this would filter the products
    console.log("Price range changed:", range);
  };
  
  // Simple client-side filtering for demo purposes
  // In a real app, you'd likely want to do this on the server
  const filteredProducts = products?.filter((product: any) => {
    const price = parseFloat(product.price);
    return price >= priceRange[0] && price <= priceRange[1];
  });
  
  if (isLoadingCategory) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-8 w-48 bg-neutral-200 animate-pulse rounded"></div>
        <div className="h-10 w-64 mt-4 bg-neutral-200 animate-pulse rounded"></div>
        <div className="h-6 w-96 mt-2 bg-neutral-200 animate-pulse rounded"></div>
      </div>
    );
  }
  
  return (
    <>
      <SEO 
        title={category?.name || "Shop Category"} 
        description={category?.description}
        type="website"
        image={category?.image}
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": `${category?.name} | WorldMapX`,
          "description": category?.description
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[
          { label: "Shop", href: "/shop" },
          { label: category?.name || "" }
        ]} />
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-2">
            {category?.name}
          </h1>
          <p className="text-lg text-neutral-600">
            {category?.description}
          </p>
        </div>
        
        {/* Mobile filter button */}
        <div className="lg:hidden mb-4">
          <Button 
            onClick={toggleMobileFilters}
            variant="outline"
            className="w-full flex items-center justify-center"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar - desktop always visible, mobile conditional */}
          <div className={`lg:w-1/4 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            <ShopFilters 
              onFilterChange={handleFilterChange}
              priceRange={priceRange}
              onPriceRangeChange={handlePriceRangeChange}
            />
          </div>
          
          {/* Products grid */}
          <div className="lg:w-3/4">
            {isLoadingProducts ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(6).fill(0).map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="aspect-ratio-container aspect-ratio-1-1 bg-neutral-200 animate-pulse"></div>
                    <div className="p-4">
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
            ) : filteredProducts?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product: any) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    categoryName={category.name}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-neutral-200">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-neutral-600">
                  Try adjusting your filters or check back later for new items.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Newsletter />
    </>
  );
}
