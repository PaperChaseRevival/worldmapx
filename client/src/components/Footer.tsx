import { Link } from "wouter";
import { 
  Globe, 
  Facebook, 
  Instagram, 
  Twitter, 
  MapPin, 
  Phone, 
  Mail, 
  Clock
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Footer() {
  // Fetch categories for the shop links
  const { data: categories } = useQuery({
    queryKey: ['/api/categories'],
    staleTime: Infinity,
  });

  return (
    <footer className="bg-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-serif font-semibold text-white">WorldMapX</span>
            </div>
            <p className="mt-4 text-neutral-300">
              WorldMapX offers curated historical maps, prints, photographs and ephemera that explore our shared past. Each artifact tells a story of discovery, creativity and human experience.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-neutral-300 hover:text-white transition duration-150">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition duration-150">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition duration-150">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Shop</h3>
            <ul className="space-y-3">
              {categories?.map((category: any) => (
                <li key={category.id}>
                  <Link 
                    href={`/shop/${category.slug}`} 
                    className="text-neutral-300 hover:text-white transition duration-150"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Information</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-neutral-300 hover:text-white transition duration-150">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-neutral-300 hover:text-white transition duration-150">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-neutral-300 hover:text-white transition duration-150">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-neutral-300 hover:text-white transition duration-150">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-neutral-300 hover:text-white transition duration-150">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-neutral-300 hover:text-white transition duration-150">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mt-1 mr-3 text-neutral-400" />
                <span className="text-neutral-300">123 Map Street<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-neutral-400" />
                <span className="text-neutral-300">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-neutral-400" />
                <span className="text-neutral-300">info@worldmapx.com</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-neutral-400" />
                <span className="text-neutral-300">Mon-Fri: 9am-6pm<br />Sat: 10am-4pm</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-neutral-700">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p className="text-neutral-400">© {new Date().getFullYear()} WorldMapX. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-4">
                <span className="h-6 text-neutral-400">Payment methods: Visa, Mastercard, PayPal, American Express</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
