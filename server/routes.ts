import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCategorySchema, insertProductSchema, insertBlogPostSchema } from "@shared/schema";
import z from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Categories endpoints
  app.get("/api/categories", async (req: Request, res: Response) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Error fetching categories" });
    }
  });
  
  app.get("/api/categories/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const category = await storage.getCategoryBySlug(slug);
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Error fetching category" });
    }
  });
  
  app.post("/api/categories", async (req: Request, res: Response) => {
    try {
      const categoryData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(categoryData);
      res.status(201).json(category);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid category data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating category" });
    }
  });
  
  // Products endpoints
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const { featured, isNew, categoryId, categorySlug, limit } = req.query;
      
      const options: any = {};
      
      if (featured !== undefined) {
        options.featured = featured === 'true';
      }
      
      if (isNew !== undefined) {
        options.isNew = isNew === 'true';
      }
      
      if (categoryId) {
        options.categoryId = parseInt(categoryId as string, 10);
      }
      
      if (categorySlug) {
        options.categorySlug = categorySlug as string;
      }
      
      if (limit) {
        options.limit = parseInt(limit as string, 10);
      }
      
      const products = await storage.getProducts(options);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products" });
    }
  });
  
  app.get("/api/products/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const product = await storage.getProductBySlug(slug);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Error fetching product" });
    }
  });
  
  app.post("/api/products", async (req: Request, res: Response) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating product" });
    }
  });
  
  // Blog posts endpoints
  app.get("/api/blog", async (req: Request, res: Response) => {
    try {
      const { limit, published } = req.query;
      
      const options: any = {};
      
      if (limit) {
        options.limit = parseInt(limit as string, 10);
      }
      
      if (published !== undefined) {
        options.published = published === 'true';
      } else {
        options.published = true; // Default to published posts only
      }
      
      const posts = await storage.getBlogPosts(options);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching blog posts" });
    }
  });
  
  app.get("/api/blog/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Error fetching blog post" });
    }
  });
  
  app.post("/api/blog", async (req: Request, res: Response) => {
    try {
      const postData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(postData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid blog post data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating blog post" });
    }
  });
  
  // Create HTTP server
  const httpServer = createServer(app);
  
  return httpServer;
}
