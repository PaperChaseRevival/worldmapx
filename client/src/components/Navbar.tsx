import { useState } from "react";
import { Link, useLocation } from "wouter";
import MobileMenu from "@/components/MobileMenu";
import {
  Globe,
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  Menu
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2); // TODO: Replace with actual cart state
  
  // Fetch categories for the shop dropdown
  const { data: categories } = useQuery({
    queryKey: ['/api/categories'],
    staleTime: Infinity, // Categories rarely change
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Helper to check if a link is active
  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-serif font-semibold text-primary">WorldMapX</span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              type="button" 
              className="text-neutral-600 hover:text-neutral-900 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link 
              href="/" 
              className={`${isActive("/") ? "text-primary" : "text-neutral-900"} hover:text-primary font-medium`}
            >
              Home
            </Link>
            <div className="relative group">
              <button className={`${location.includes("/shop") ? "text-primary" : "text-neutral-900"} group-hover:text-primary font-medium flex items-center gap-1`}>
                Shop
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {categories?.map((category: any) => (
                    <Link 
                      key={category.id}
                      href={`/shop/${category.slug}`} 
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100" 
                      role="menuitem"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link 
              href="/blog" 
              className={`${isActive("/blog") ? "text-primary" : "text-neutral-900"} hover:text-primary font-medium`}
            >
              Blog
            </Link>
            <Link 
              href="/about" 
              className={`${isActive("/about") ? "text-primary" : "text-neutral-900"} hover:text-primary font-medium`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`${isActive("/contact") ? "text-primary" : "text-neutral-900"} hover:text-primary font-medium`}
            >
              Contact
            </Link>
          </nav>
          
          {/* User actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-neutral-600 hover:text-neutral-900">
              <Search className="h-5 w-5" />
            </button>
            <Link href="/cart" className="text-neutral-600 hover:text-neutral-900 relative">
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
      
      {/* Mobile menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        categories={categories || []}
      />
    </header>
  );
}
