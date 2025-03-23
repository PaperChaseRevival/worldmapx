import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center flex-wrap text-sm">
        <li className="flex items-center">
          <Link href="/" className="text-neutral-500 hover:text-primary transition duration-150 flex items-center">
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={item.label} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-2 text-neutral-400" />
              {isLast || !item.href ? (
                <span className="font-medium text-neutral-900" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link 
                  href={item.href} 
                  className="text-neutral-500 hover:text-primary transition duration-150"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
