import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function CategoryGrid() {
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['/api/categories'],
  });
  
  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="h-8 w-64 bg-neutral-200 animate-pulse rounded mx-auto"></div>
            <div className="h-6 w-96 bg-neutral-200 animate-pulse rounded mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="rounded-lg h-64 bg-neutral-200 animate-pulse"></div>
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
          <p className="text-red-500">Error loading categories. Please try again later.</p>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900">
            Shop Our Collection
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Discover our curated selection of historical pieces from around the world
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories?.map((category: any) => (
            <div 
              key={category.id} 
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="aspect-ratio-container aspect-ratio-3-2">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 category-overlay flex flex-col justify-end p-6">
                <h3 className="text-2xl font-serif font-semibold text-white">{category.name}</h3>
                <p className="text-white/80 mt-1 mb-3">{category.description}</p>
                <Link 
                  href={`/shop/${category.slug}`}
                  className="inline-block font-medium text-white hover:text-secondary transition duration-150 flex items-center"
                >
                  <span>View Collection</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
