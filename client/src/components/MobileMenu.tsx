import { Link, useLocation } from "wouter";
import { 
  Search, 
  ShoppingCart, 
  User, 
  ChevronDown,
  X
} from "lucide-react";
import { useState } from "react";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

export default function MobileMenu({ isOpen, onClose, categories }: MobileMenuProps) {
  const [location] = useLocation();
  const [isShopExpanded, setIsShopExpanded] = useState(false);
  const [cartCount] = useState(2); // TODO: Replace with actual cart state

  // Helper to check if a link is active
  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <div className="flex justify-between items-center px-3 py-2">
          <span className="text-lg font-medium">Menu</span>
          <button 
            className="text-neutral-600 hover:text-neutral-900"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <Link 
          href="/" 
          onClick={onClose}
          className={`block px-3 py-2 rounded-md text-base font-medium ${
            isActive("/") 
              ? "text-primary bg-neutral-100" 
              : "text-neutral-900 hover:bg-neutral-100"
          }`}
        >
          Home
        </Link>
        
        <div>
          <button 
            className="w-full text-left flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-neutral-900 hover:bg-neutral-100"
            onClick={() => setIsShopExpanded(!isShopExpanded)}
          >
            Shop
            <ChevronDown className={`h-4 w-4 ${isShopExpanded ? "transform rotate-180" : ""}`} />
          </button>
          
          {isShopExpanded && (
            <div className="pl-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/shop/${category.slug}`}
                  onClick={onClose}
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:bg-neutral-100"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>
        
        <Link 
          href="/blog" 
          onClick={onClose}
          className={`block px-3 py-2 rounded-md text-base font-medium ${
            isActive("/blog") 
              ? "text-primary bg-neutral-100" 
              : "text-neutral-900 hover:bg-neutral-100"
          }`}
        >
          Blog
        </Link>
        
        <Link 
          href="/about" 
          onClick={onClose}
          className={`block px-3 py-2 rounded-md text-base font-medium ${
            isActive("/about") 
              ? "text-primary bg-neutral-100" 
              : "text-neutral-900 hover:bg-neutral-100"
          }`}
        >
          About
        </Link>
        
        <Link 
          href="/contact" 
          onClick={onClose}
          className={`block px-3 py-2 rounded-md text-base font-medium ${
            isActive("/contact") 
              ? "text-primary bg-neutral-100" 
              : "text-neutral-900 hover:bg-neutral-100"
          }`}
        >
          Contact
        </Link>
      </div>
      
      <div className="pt-4 pb-3 border-t border-neutral-200">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <button className="text-neutral-600 hover:text-neutral-900">
              <Search className="h-5 w-5" />
            </button>
            
            <Link 
              href="/cart" 
              onClick={onClose}
              className="text-neutral-600 hover:text-neutral-900 relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <button className="text-neutral-600 hover:text-neutral-900">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
