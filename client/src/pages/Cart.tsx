import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus } from "lucide-react";

import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Mock cart data for demonstration
// In a real application, this would come from a context or state management
const initialCartItems = [
  {
    id: 1,
    name: "1755 Map of North America",
    slug: "1755-map-of-north-america",
    price: "1250",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    quantity: 1
  },
  {
    id: 3,
    name: "Ellis Island Immigration Photo",
    slug: "ellis-island-immigration-photo",
    price: "750",
    image: "https://images.unsplash.com/photo-1502657877623-f66bf489d236?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    quantity: 1
  }
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const { toast } = useToast();
  
  useEffect(() => {
    document.title = "Your Cart | WorldMapX";
  }, []);
  
  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };
  
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => 
      sum + (parseFloat(item.price) * item.quantity), 0
    );
  };
  
  // Calculate order summary
  const subtotal = calculateSubtotal();
  const shipping = 25;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  return (
    <>
      <SEO 
        title="Your Cart" 
        description="Review the items in your cart and proceed to checkout."
        schema={{
          "@context": "https://schema.org",
          "@type": "ItemPage",
          "name": "Your Cart | WorldMapX"
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[
          { label: "Cart" }
        ]} />
        
        <h1 className="text-3xl font-serif font-bold text-neutral-900 mb-8">
          Your Cart
        </h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
                <table className="min-w-full divide-y divide-neutral-200">
                  <thead className="bg-neutral-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Subtotal
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-neutral-200">
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-16 w-16 flex-shrink-0 rounded overflow-hidden mr-4">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <Link 
                                href={`/product/${item.slug}`}
                                className="text-sm font-medium text-neutral-900 hover:text-primary"
                              >
                                {item.name}
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          {formatCurrency(parseFloat(item.price))}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="text-neutral-500 hover:text-neutral-700 p-1"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="mx-2 text-sm w-8 text-center">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="text-neutral-500 hover:text-neutral-700 p-1"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                          {formatCurrency(parseFloat(item.price) * item.quantity)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 flex justify-between">
                <Link 
                  href="/shop" 
                  className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
                >
                  <ArrowRight className="h-5 w-5 mr-2 transform rotate-180" />
                  Continue Shopping
                </Link>
                
                <Button 
                  onClick={() => setCartItems([])}
                  variant="outline"
                  className="border-neutral-300 hover:bg-neutral-100 text-neutral-800"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-neutral-200 p-6">
                <h2 className="text-lg font-serif font-semibold mb-4">
                  Order Summary
                </h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-medium">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Shipping</span>
                    <span className="font-medium">{formatCurrency(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Estimated Tax</span>
                    <span className="font-medium">{formatCurrency(tax)}</span>
                  </div>
                  <div className="border-t border-neutral-200 pt-3 mt-3">
                    <div className="flex justify-between text-base font-medium">
                      <span>Total</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 h-12"
                >
                  Proceed to Checkout
                </Button>
                
                <div className="mt-4 text-xs text-neutral-500 text-center">
                  Secure checkout powered by Stripe
                </div>
              </div>
              
              {/* Promo Code */}
              <div className="bg-white rounded-lg border border-neutral-200 p-6 mt-6">
                <h3 className="text-sm font-medium mb-2">Promo Code</h3>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 border border-neutral-300 rounded-l py-2 px-3 text-sm"
                  />
                  <button className="bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-r px-4 py-2 text-sm font-medium">
                    Apply
                  </button>
                </div>
              </div>
              
              {/* Help */}
              <div className="bg-white rounded-lg border border-neutral-200 p-6 mt-6">
                <h3 className="text-sm font-medium mb-2">Need Help?</h3>
                <p className="text-sm text-neutral-600 mb-3">
                  Our customer service team is here to assist you with any questions.
                </p>
                <Link 
                  href="/contact" 
                  className="text-sm text-primary hover:text-primary-dark font-medium inline-flex items-center"
                >
                  Contact Us
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-neutral-200 p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="h-8 w-8 text-neutral-500" />
            </div>
            <h2 className="text-xl font-serif font-semibold mb-2">Your cart is empty</h2>
            <p className="text-neutral-600 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link href="/shop" className="btn-primary inline-flex items-center">
              Start Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
