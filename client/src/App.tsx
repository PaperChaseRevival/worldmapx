import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import ShopCategory from "@/pages/ShopCategory";
import ProductDetail from "@/pages/ProductDetail";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Cart from "@/pages/Cart";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/shop/:category" component={ShopCategory} />
        <Route path="/product/:slug" component={ProductDetail} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/cart" component={Cart} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
