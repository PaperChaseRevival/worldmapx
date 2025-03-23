import { Link } from "wouter";
import { ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    slug: string;
    shortDescription: string;
    price: string;
    categoryId: number;
    image: string;
    featured?: boolean;
    isNew?: boolean;
  };
  categoryName?: string;
}

export default function ProductCard({ product, categoryName }: ProductCardProps) {
  // Format the price
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(parseFloat(product.price));
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement add to cart functionality
    console.log("Add to cart:", product.id);
  };
  
  return (
    <Card className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition duration-300">
      <Link href={`/product/${product.slug}`} className="block relative overflow-hidden">
        <div className="aspect-ratio-container aspect-ratio-1-1">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        {(product.featured || product.isNew) && (
          <div className="absolute top-2 right-2">
            {product.featured && (
              <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full">
                Featured
              </span>
            )}
            {product.isNew && (
              <span className="bg-primary text-white text-xs px-2 py-1 rounded-full ml-1">
                New
              </span>
            )}
          </div>
        )}
      </Link>
      <div className="p-4">
        {categoryName && (
          <div className="text-xs text-neutral-500 mb-1">{categoryName}</div>
        )}
        <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
        <p className="text-neutral-600 text-sm mt-1 line-clamp-2">
          {product.shortDescription}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-medium text-neutral-900">{formattedPrice}</span>
          <button 
            className="text-primary hover:text-primary-dark rounded-full p-1 transition duration-150"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Card>
  );
}
