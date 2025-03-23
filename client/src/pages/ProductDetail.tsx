import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  ChevronRight, 
  ChevronLeft
} from "lucide-react";

import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetail() {
  const { slug } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Fetch product details
  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: [`/api/products/${slug}`],
    queryFn: async () => {
      const res = await fetch(`/api/products/${slug}`);
      if (!res.ok) {
        if (res.status === 404) {
          setLocation('/not-found');
          return null;
        }
        throw new Error('Failed to fetch product');
      }
      return res.json();
    },
    enabled: !!slug
  });
  
  // Fetch category details
  const { data: category, isLoading: isLoadingCategory } = useQuery({
    queryKey: [`/api/categories/${product?.categoryId}`],
    queryFn: async () => {
      const res = await fetch(`/api/categories/${product.categoryId}`);
      if (!res.ok) throw new Error('Failed to fetch category');
      return res.json();
    },
    enabled: !!product?.categoryId
  });
  
  // Fetch related products
  const { data: relatedProducts, isLoading: isLoadingRelatedProducts } = useQuery({
    queryKey: ['/api/products', { categoryId: product?.categoryId, exclude: product?.id }],
    queryFn: async () => {
      const res = await fetch(`/api/products?categoryId=${product.categoryId}&limit=4`);
      if (!res.ok) throw new Error('Failed to fetch related products');
      const data = await res.json();
      // Exclude current product
      return data.filter((p: any) => p.id !== product.id).slice(0, 4);
    },
    enabled: !!product?.categoryId
  });
  
  // Update page title when product loads
  useEffect(() => {
    if (product) {
      document.title = `${product.name} | WorldMapX`;
    }
  }, [product]);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const handleAddToCart = () => {
    // In a real app, you would add to cart through a context or API
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart.`,
    });
  };
  
  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Product link copied to clipboard.",
      });
    }
  };
  
  // Get all product images
  const productImages = product ? [
    product.image, 
    ...(product.gallery || [])
  ] : [];
  
  // Format the price
  const formattedPrice = product ? new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(parseFloat(product.price)) : '';
  
  if (isLoadingProduct || isLoadingCategory) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-6 w-48 bg-neutral-200 animate-pulse rounded mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-ratio-container aspect-ratio-1-1 bg-neutral-200 animate-pulse rounded-lg"></div>
          <div>
            <div className="h-8 w-3/4 bg-neutral-200 animate-pulse rounded mb-4"></div>
            <div className="h-6 w-1/4 bg-neutral-200 animate-pulse rounded mb-4"></div>
            <div className="h-4 w-full bg-neutral-200 animate-pulse rounded mb-2"></div>
            <div className="h-4 w-full bg-neutral-200 animate-pulse rounded mb-2"></div>
            <div className="h-4 w-3/4 bg-neutral-200 animate-pulse rounded mb-6"></div>
            <div className="h-10 w-full bg-neutral-200 animate-pulse rounded mb-4"></div>
            <div className="h-10 w-full bg-neutral-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) return null;
  
  return (
    <>
      <SEO 
        title={product.name} 
        description={product.shortDescription || product.description.slice(0, 160)}
        type="product"
        image={product.image}
        schema={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.name,
          "image": product.image,
          "description": product.description,
          "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": product.price,
            "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
          }
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[
          { label: "Shop", href: "/shop" },
          { label: category?.name || "", href: `/shop/${category?.slug}` },
          { label: product.name }
        ]} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          {/* Product Images */}
          <div>
            <div className="aspect-ratio-container aspect-ratio-1-1 mb-4 rounded-lg overflow-hidden border border-neutral-200">
              <img 
                src={productImages[activeImageIndex]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Gallery */}
            {productImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {productImages.map((image, index) => (
                  <button 
                    key={index}
                    className={`aspect-ratio-container aspect-ratio-1-1 w-20 rounded-md overflow-hidden border-2 ${
                      index === activeImageIndex 
                        ? 'border-primary' 
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - View ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-serif font-bold text-neutral-900">
              {product.name}
            </h1>
            
            <div className="mt-2 mb-4">
              <span className="text-2xl font-medium text-neutral-900">
                {formattedPrice}
              </span>
            </div>
            
            <p className="text-neutral-600 mb-6">
              {product.shortDescription}
            </p>
            
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm text-neutral-500 mb-2">
                <span>Quantity</span>
                <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              
              <div className="flex">
                <button 
                  onClick={decrementQuantity}
                  disabled={!product.inStock || quantity <= 1}
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-3 py-2 rounded-l-md disabled:opacity-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <input 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={handleQuantityChange}
                  disabled={!product.inStock}
                  className="w-16 text-center border-y border-neutral-200 py-2"
                />
                <button 
                  onClick={incrementQuantity}
                  disabled={!product.inStock}
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-3 py-2 rounded-r-md disabled:opacity-50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-primary hover:bg-primary-dark text-white rounded h-12"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              
              <div className="flex gap-3">
                <Button 
                  onClick={handleAddToWishlist}
                  variant="outline"
                  className="flex-1 border-neutral-300 hover:bg-neutral-100 text-neutral-800 h-12"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Wishlist
                </Button>
                
                <Button 
                  onClick={handleShare}
                  variant="outline"
                  className="flex-1 border-neutral-300 hover:bg-neutral-100 text-neutral-800 h-12"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>
            
            {/* Product Meta */}
            <div className="mt-8 border-t border-neutral-200 pt-6">
              <div className="flex text-sm">
                <span className="text-neutral-500 w-24">Category:</span>
                <Link 
                  href={`/shop/${category?.slug}`}
                  className="text-primary hover:underline"
                >
                  {category?.name}
                </Link>
              </div>
              
              {product.id && (
                <div className="flex text-sm mt-2">
                  <span className="text-neutral-500 w-24">Product ID:</span>
                  <span>{product.id}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Product Description */}
        <div className="mt-12 bg-white border border-neutral-200 rounded-lg p-6">
          <h2 className="text-2xl font-serif font-semibold mb-4">
            Product Description
          </h2>
          <div className="prose max-w-none">
            {product.description.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4 text-neutral-700">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        
        {/* Related Products */}
        {!isLoadingRelatedProducts && relatedProducts?.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-serif font-semibold mb-6">
              You May Also Like
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct: any) => (
                <ProductCard 
                  key={relatedProduct.id} 
                  product={relatedProduct} 
                  categoryName={category?.name}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Newsletter />
    </>
  );
}
