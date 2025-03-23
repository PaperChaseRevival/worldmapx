import { 
  users, type User, type InsertUser,
  categories, type Category, type InsertCategory,
  products, type Product, type InsertProduct,
  blogPosts, type BlogPost, type InsertBlogPost
} from "@shared/schema";

// Extend the interface with any CRUD methods needed
export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Products
  getProducts(options?: {
    featured?: boolean,
    isNew?: boolean,
    categoryId?: number,
    categorySlug?: string,
    limit?: number,
  }): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Blog Posts
  getBlogPosts(options?: {
    limit?: number,
    published?: boolean,
  }): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private blogPosts: Map<number, BlogPost>;
  
  currentUserId: number;
  currentCategoryId: number;
  currentProductId: number;
  currentBlogPostId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.blogPosts = new Map();
    
    this.currentUserId = 1;
    this.currentCategoryId = 1;
    this.currentProductId = 1;
    this.currentBlogPostId = 1;
    
    // Initialize with some sample data
    this.initializeData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values())
      .sort((a, b) => a.order - b.order);
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug,
    );
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  
  // Product methods
  async getProducts(options?: {
    featured?: boolean,
    isNew?: boolean,
    categoryId?: number,
    categorySlug?: string,
    limit?: number,
  }): Promise<Product[]> {
    let productsArray = Array.from(this.products.values());
    
    // Filter by category ID
    if (options?.categoryId) {
      productsArray = productsArray.filter(p => p.categoryId === options.categoryId);
    }
    
    // Filter by category slug
    if (options?.categorySlug) {
      const category = Array.from(this.categories.values()).find(
        c => c.slug === options.categorySlug
      );
      if (category) {
        productsArray = productsArray.filter(p => p.categoryId === category.id);
      }
    }
    
    // Filter by featured
    if (options?.featured !== undefined) {
      productsArray = productsArray.filter(p => p.featured === options.featured);
    }
    
    // Filter by isNew
    if (options?.isNew !== undefined) {
      productsArray = productsArray.filter(p => p.isNew === options.isNew);
    }
    
    // Apply limit
    if (options?.limit) {
      productsArray = productsArray.slice(0, options.limit);
    }
    
    return productsArray;
  }
  
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug,
    );
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { 
      ...insertProduct, 
      id, 
      createdAt: new Date() 
    };
    this.products.set(id, product);
    return product;
  }
  
  // Blog posts methods
  async getBlogPosts(options?: {
    limit?: number,
    published?: boolean,
  }): Promise<BlogPost[]> {
    let postsArray = Array.from(this.blogPosts.values());
    
    // Filter by published
    if (options?.published !== undefined) {
      postsArray = postsArray.filter(p => p.published === options.published);
    }
    
    // Sort by date (newest first)
    postsArray.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
      return 0;
    });
    
    // Apply limit
    if (options?.limit) {
      postsArray = postsArray.slice(0, options.limit);
    }
    
    return postsArray;
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug,
    );
  }
  
  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const now = new Date();
    const blogPost: BlogPost = { 
      ...insertBlogPost, 
      id, 
      createdAt: now,
      updatedAt: now
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }
  
  private initializeData() {
    // Add categories
    const categoriesData: InsertCategory[] = [
      {
        name: "Historical Maps",
        slug: "maps",
        description: "Explore antique cartography from across the centuries",
        image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        order: 1
      },
      {
        name: "Vintage Prints",
        slug: "prints",
        description: "Historical illustrations & artistic prints from master artisans",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        order: 2
      },
      {
        name: "Historical Photography",
        slug: "photos",
        description: "Rare photographic glimpses of the past",
        image: "https://images.unsplash.com/photo-1502657877623-f66bf489d236?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        order: 3
      },
      {
        name: "Ephemera",
        slug: "ephemera",
        description: "Tickets, pamphlets & printed materials from bygone eras",
        image: "https://images.unsplash.com/photo-1591280063155-f93144ae2de9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        order: 4
      },
      {
        name: "Manuscripts",
        slug: "manuscripts",
        description: "Handwritten documents and letters of historical significance",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        order: 5
      },
      {
        name: "Other Artifacts",
        slug: "other",
        description: "Unique historical items that defy categorization",
        image: "https://images.unsplash.com/photo-1600695567242-a341bbc2c57a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        order: 6
      }
    ];
    
    const categoryPromises = categoriesData.map(cat => this.createCategory(cat));
    Promise.all(categoryPromises).then(createdCategories => {
      // Add products
      const productsData: InsertProduct[] = [
        {
          name: "1755 Map of North America",
          slug: "1755-map-of-north-america",
          description: "This rare 18th century map shows the colonies and territories before the American Revolution. Created by prominent cartographer John Mitchell, this map represents one of the most detailed and accurate depictions of North America from the colonial period.\n\nThe map features exquisite hand-coloring and remarkable detail, showing the territorial claims, indigenous lands, and early settlements across the continent. It served as an important reference during the negotiations of the Treaty of Paris (1783) that ended the American Revolutionary War.\n\nThis museum-quality reproduction is printed on archival paper using fade-resistant inks and comes with a certificate of authenticity.",
          shortDescription: "Rare 18th century map showing the colonies and territories before the American Revolution.",
          price: "1250",
          categoryId: createdCategories[0].id,
          image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
          gallery: ["https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"],
          featured: true,
          isNew: false,
          inStock: true
        },
        {
          name: "Victorian Botanical Print",
          slug: "victorian-botanical-print",
          description: "This exquisite hand-colored lithograph comes from a rare Victorian botanical compendium published in 1872. The print features stunning botanical illustrations of exotic flowers and plants discovered during the great era of Victorian exploration.\n\nEach print represents the painstaking work of botanical artists who traveled alongside naturalists to document newly discovered plant species with scientific accuracy and artistic beauty. The vibrant colors remain remarkably well-preserved, demonstrating the high quality of pigments used in the original production.\n\nThis authentic botanical print is professionally mounted and ready for framing. It comes with detailed information about the species depicted and its historical context.",
          shortDescription: "Exquisite hand-colored lithograph from a rare Victorian botanical compendium.",
          price: "385",
          categoryId: createdCategories[1].id,
          image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
          gallery: ["https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"],
          featured: false,
          isNew: false,
          inStock: true
        },
        {
          name: "Ellis Island Immigration Photo",
          slug: "ellis-island-immigration-photo",
          description: "This original silver gelatin print documents European immigrants arriving at Ellis Island, circa 1910. Captured by renowned photographer Lewis Hine, who was commissioned to document the immigrant experience, this powerful image provides a window into one of the most significant migration periods in American history.\n\nThe photograph shows a family of newly arrived immigrants waiting to be processed, their expressions conveying both hope and uncertainty as they begin their new lives in America. The technical quality and composition demonstrate Hine's masterful documentary style that later influenced generations of photographers.\n\nThis authentic vintage print comes with complete provenance documentation and is archivally framed to museum standards to ensure its preservation.",
          shortDescription: "Original silver gelatin print documenting European immigrants at Ellis Island, circa 1910.",
          price: "750",
          categoryId: createdCategories[2].id,
          image: "https://images.unsplash.com/photo-1502657877623-f66bf489d236?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
          gallery: ["https://images.unsplash.com/photo-1502657877623-f66bf489d236?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"],
          featured: true,
          isNew: true,
          inStock: true
        },
        {
          name: "Civil War Era Letter",
          slug: "civil-war-era-letter",
          description: "This remarkable handwritten letter was written by a Union soldier to his family in 1863 during the American Civil War. The four-page letter provides a firsthand account of camp life, military movements, and the writer's personal reflections on the conflict.\n\nThe letter mentions specific battles and commanders, offering valuable historical insights into this pivotal period in American history. The paper shows expected aging but remains in excellent condition, with clearly legible script throughout.\n\nThe letter comes with a full transcription, historical context notes, and has been authenticated by Civil War historical experts. It is presented in a museum-quality archival display case that allows viewing of both sides of the document while providing complete protection.",
          shortDescription: "Handwritten letter from a Union soldier to his family, dated 1863 with historical context.",
          price: "895",
          categoryId: createdCategories[4].id,
          image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
          gallery: ["https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"],
          featured: true,
          isNew: false,
          inStock: true
        },
        {
          name: "1920s New York Transit Token",
          slug: "1920s-new-york-transit-token",
          description: "This authentic New York City transit token dates from the 1920s, representing an important piece of urban transportation history. Made of brass with the distinctive 'NYC' cutout design, this token was used during the early expansion period of the subway system.\n\nThe token shows a beautiful patina that has developed over its century of existence, with details still crisp and clearly visible. Each token tells the story of daily life in America's largest city during the Roaring Twenties.\n\nThis historical artifact comes in a custom display case with a detailed history card explaining its significance in the development of urban mass transit systems.",
          shortDescription: "Authentic brass transit token from New York City's early subway system expansion.",
          price: "125",
          categoryId: createdCategories[5].id,
          image: "https://images.unsplash.com/photo-1600695567242-a341bbc2c57a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
          gallery: ["https://images.unsplash.com/photo-1600695567242-a341bbc2c57a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"],
          featured: false,
          isNew: true,
          inStock: true
        },
        {
          name: "1930s Travel Poster",
          slug: "1930s-travel-poster",
          description: "This original 1930s art deco travel poster promotes tourism to the Mediterranean. Created by celebrated graphic artist Pierre Dubois, it exemplifies the golden age of travel poster design with its bold colors, dynamic composition, and romanticized imagery.\n\nThe poster shows minimal signs of aging, with vibrant colors that have been well-preserved. Printed using the stone lithograph technique, it demonstrates the high artistic standards of commercial art during this period.\n\nThis genuine vintage poster has been professionally linen-backed for preservation and comes ready to frame. It includes a certificate of authenticity and detailed information about the artist and historical context.",
          shortDescription: "Original art deco travel poster from the 1930s promoting Mediterranean tourism.",
          price: "1875",
          categoryId: createdCategories[3].id,
          image: "https://images.unsplash.com/photo-1591280063155-f93144ae2de9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
          gallery: ["https://images.unsplash.com/photo-1591280063155-f93144ae2de9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"],
          featured: false,
          isNew: false,
          inStock: true
        },
        {
          name: "18th Century World Atlas",
          slug: "18th-century-world-atlas",
          description: "This rare complete set of an 18th century world atlas represents one of the most important cartographic works of the Enlightenment period. Published in 1762 by renowned mapmaker Thomas Jefferys, the atlas contains 60 hand-colored maps documenting global geographic knowledge of the era.\n\nThe atlas features decorative title pages, ornate cartouches, and beautifully rendered geographical features that blend scientific accuracy with artistic expression. The binding shows expected wear consistent with its age, but all maps remain in excellent condition with vibrant colors.\n\nThis exceptional example of historical cartography comes with a custom archival case and detailed scholarly documentation of its provenance and historical significance.",
          shortDescription: "Complete 60-map atlas from 1762 showing global geographic knowledge of the Enlightenment era.",
          price: "12500",
          categoryId: createdCategories[0].id,
          image: "https://images.unsplash.com/photo-1599384066748-b91984d16d67?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
          gallery: ["https://images.unsplash.com/photo-1599384066748-b91984d16d67?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"],
          featured: true,
          isNew: false,
          inStock: true
        },
        {
          name: "Early Antarctic Expedition Photo",
          slug: "early-antarctic-expedition-photo",
          description: "This remarkable vintage photograph documents one of the early Antarctic expeditions from 1911, capturing a moment from mankind's push to explore Earth's last frontier. The silver gelatin print shows expedition members with their equipment against the harsh Antarctic landscape.\n\nThe photograph is attributed to Frank Hurley, one of the pioneering photographers of polar exploration, known for his technical skill in extreme conditions. The image quality is exceptional considering the challenging circumstances under which it was captured.\n\nThis historic photograph is professionally framed with UV-protective glass and comes with detailed documentation about the expedition it depicts.",
          shortDescription: "Authentic silver gelatin print from a 1911 Antarctic expedition showing explorers and equipment.",
          price: "1950",
          categoryId: createdCategories[2].id,
          image: "https://images.unsplash.com/photo-1551871841-3c79ac8daeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
          gallery: ["https://images.unsplash.com/photo-1551871841-3c79ac8daeaf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"],
          featured: false,
          isNew: false,
          inStock: true
        },
      ];
      
      productsData.forEach(product => this.createProduct(product));
      
      // Add blog posts
      const blogPostsData: InsertBlogPost[] = [
        {
          title: "The Lost Art of Cartography",
          slug: "the-lost-art-of-cartography",
          excerpt: "Exploring the methods, tools and artistic approaches of historical mapmakers across the centuries, from the Middle Ages to the Victorian era.",
          content: "## The Lost Art of Cartography\n\nCartography—the art and science of mapmaking—has evolved dramatically over the centuries, transforming from an artistic pursuit filled with speculation and mythology to a precise scientific discipline. Yet, in this transformation, something magical was lost. The personality, artistry, and human touch that characterized historical maps have largely disappeared from our modern, satellite-derived representations of the world.\n\n### The Golden Age of Mapmaking\n\nThe period from the 15th to the 18th centuries is often considered the golden age of cartography. During this era, maps were as much works of art as they were functional tools. Cartographers embellished their creations with elaborate illustrations, decorative cartouches, and fantastic creatures believed to inhabit unexplored regions. The famous phrase \"here be dragons\" (or its Latin equivalent) marked the edges of the known world, inviting wonder and speculation.\n\nThese maps were created painstakingly by hand, requiring exceptional skill in draftsmanship, geography, mathematics, and artistry. Mapmakers like Abraham Ortelius, Gerardus Mercator, and Joan Blaeu were celebrated figures who combined scientific knowledge with artistic vision to create works that continue to captivate us today.\n\n### Tools and Techniques of Historical Cartographers\n\nThe creation of a map in the pre-industrial era involved numerous specialized tools and techniques:\n\n1. **Surveying instruments**: Quadrants, astrolabes, and later theodolites allowed mapmakers to measure angles and distances.\n\n2. **Drafting tools**: Compasses, rulers, and dividers enabled precise layout work.\n\n3. **Copper plate engraving**: The primary method for map reproduction involved engraving the image in reverse on copper plates, then applying ink and pressing paper against the plate.\n\n4. **Hand coloring**: After printing, skilled colorists would apply watercolors to enhance the maps. These colors often conveyed important information about political boundaries and natural features.\n\n5. **Papermaking and binding**: High-quality rag paper was essential for durability, and bookbinders would assemble collections into atlases.\n\nThe creation of a single map might take months or even years, representing an enormous investment of time, knowledge, and artistic skill.\n\n### The Cultural Significance of Historical Maps\n\nHistorical maps reveal far more than geographic knowledge—they offer windows into the cultural, political, and intellectual landscapes of their times. The placement of Jerusalem at the center of medieval maps reflects the religious worldview of the era. The elaborate decorations on Renaissance and Baroque maps demonstrate the status of cartography as both science and art form. Colonial-era maps reveal the economic and political ambitions of expanding empires.\n\nCollecting and studying historical maps allows us to trace how human understanding of the world evolved, how different cultures perceived their place in it, and how cartography itself developed as a discipline.\n\n### The Enduring Appeal of Antique Maps\n\nIn our digital age, when satellite imagery has mapped virtually every square inch of our planet with clinical precision, why do antique maps continue to fascinate?\n\nPerhaps it's because these historical artifacts connect us to our collective journey of discovery. They remind us that understanding our world has always been both a scientific pursuit and a creative endeavor. The personality evident in hand-drawn mountains, the artistry in decorative borders, and even the errors and misconceptions visible in early maps all tell human stories that purely accurate representations cannot.\n\nFor collectors and enthusiasts, historical maps offer a tangible connection to the past—objects that have survived centuries, bearing witness to how previous generations understood and imagined their world.\n\n### Preserving Cartographic Heritage\n\nAs we move increasingly toward digital cartography, the importance of preserving historical maps grows. These fragile artifacts require careful conservation to protect them from deterioration. Climate-controlled environments, acid-free materials, and specialized handling techniques are essential to ensure these treasures survive for future generations.\n\nDigitization projects have made many historical maps accessible to wider audiences, allowing people to explore and appreciate these works without risking damage to the originals. However, digital reproductions, while valuable for research and education, cannot fully capture the tactile experience of examining an original map with its unique paper texture, hand-applied colors, and physical presence.\n\n### Conclusion\n\nThe art of historical cartography represents a beautiful intersection of science, geography, art, and cultural expression. In these carefully crafted representations of the world, we find not just geographical information but insights into how people throughout history perceived their place in the world.\n\nAt WorldMapX, our collection of historical maps celebrates this rich tradition, offering collectors the opportunity to own authentic pieces of this cartographic heritage. Each map in our collection tells a story—of exploration, artistic expression, scientific advancement, and the human desire to understand and represent our world.\n\nAs we navigate our digital age with GPS precision, these historical maps remind us that understanding the world has always been both a scientific and artistic endeavor—one that continues to captivate our imagination.",
          image: "https://images.unsplash.com/photo-1493217465235-252dd9c0d632?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          readTime: 8,
          published: true
        },
        {
          title: "Decoding Historical Photography",
          slug: "decoding-historical-photography",
          excerpt: "Understanding the techniques, processes and cultural significance of early photography from daguerreotypes to early gelatin silver prints.",
          content: "## Decoding Historical Photography\n\nThe invention of photography in the 19th century forever changed how humanity documents and perceives the world. Unlike the subjective interpretations of painters and illustrators, photography offered a new kind of truth—a chemical record of light reflecting off actual people, places, and events. Today, historical photographs provide us with an unparalleled window into the past, but understanding and contextualizing these images requires knowledge of their technical processes, historical context, and cultural significance.\n\n### The Evolution of Early Photographic Processes\n\n#### Daguerreotypes (1839-1860s)\n\nThe first commercially successful photographic process, daguerreotypes were introduced by Louis Daguerre in 1839. These one-of-a-kind images were created on silver-plated copper sheets that were polished to a mirror finish, sensitized with iodine vapors, exposed in a camera, and developed using mercury vapor. The resulting images have remarkable detail and a distinctive reflective quality—they appear as either positive or negative depending on the viewing angle and light conditions.\n\nDaguerreotypes required long exposure times (initially 15-30 minutes, though this decreased with technical improvements), making them primarily suitable for portraits with subjects carefully posed and supported by hidden braces to maintain stillness. Their delicate surfaces were typically protected in sealed cases with glass covers.\n\n#### Ambrotypes and Tintypes (1850s-1900s)\n\nAmbrotypes used the collodion wet plate process to create positive images on glass, while tintypes (also called ferrotypes) used the same chemistry on thin iron plates coated with dark lacquer. These processes were less expensive than daguerreotypes and more durable, making photography accessible to broader segments of society.\n\nTintypes became particularly popular during the American Civil War due to their durability and quick processing time. Soldiers could have their portrait made and delivered within minutes before heading to battle.\n\n#### Albumen Prints (1850s-1890s)\n\nThe introduction of paper-based printing processes revolutionized photography by allowing multiple copies from a single negative. Albumen prints, created using egg white to bind photosensitive silver compounds to paper, became the dominant form of photographic prints in the Victorian era. These prints were often mounted on cardboard as carte de visite (small visiting card portraits) or cabinet cards (larger format portraits).\n\n#### Gelatin Silver Prints (1880s-present)\n\nBy the late 19th century, the development of gelatin dry plates and gelatin silver paper transformed photography again. These materials were more sensitive to light (reducing exposure times dramatically) and could be manufactured industrially. The basic technology of silver halide crystals suspended in gelatin remained the foundation of black and white photography until the digital revolution.\n\n### Reading Historical Photographs\n\nHistorical photographs contain multiple layers of information that can be decoded:\n\n#### Technical Aspects\n\n- **Process identification**: The type of photographic process often provides the first clue to dating an image.\n- **Format and presentation**: Cabinet cards, stereographs, cartes de visite, and other formats were popular during specific periods.\n- **Studio markings**: Professional photographers often included their name and location, helping to establish provenance and approximate dates.\n\n#### Content Analysis\n\n- **Fashion and clothing**: Styles changed regularly, allowing dated images to be placed within particular decades.\n- **Architecture and technology**: Buildings, vehicles, and other objects visible in photographs can provide temporal context.\n- **Social customs**: Formal poses, groupings, and activities depicted offer insights into cultural practices of the time.\n\n### The Cultural Impact of Early Photography\n\nThe introduction of photography profoundly changed how people perceived themselves and their world:\n\n#### Democratization of Portraiture\n\nBefore photography, only the wealthy could afford painted portraits. Photography made personal images accessible to the middle class and eventually to almost everyone, changing how people documented their lives and remembered loved ones.\n\n#### Documentation of History\n\nThe American Civil War was the first major conflict extensively documented through photography. Mathew Brady, Alexander Gardner, and others created images that brought the reality of war to the public in unprecedented ways. Later, photographers like Jacob Riis used the medium to document social conditions and drive reform movements.\n\n#### Scientific and Exploratory Applications\n\nPhotography became an essential tool for scientific research, exploration, and anthropological documentation. Images from these endeavors often reflect the colonial and scientific perspectives of their era, requiring careful interpretation today.\n\n### Preserving and Collecting Historical Photographs\n\nHistorical photographs require special care to ensure their survival:\n\n#### Conservation Considerations\n\n- **Environmental controls**: Temperature, humidity, and light exposure must be carefully regulated to prevent deterioration.\n- **Proper handling**: Clean, dry hands or cotton gloves should be used when handling original prints.\n- **Appropriate storage**: Acid-free materials and archival sleeves protect photographs from chemical deterioration.\n\n#### Building a Collection\n\nFor collectors, historical photographs offer a tangible connection to the past. When building a collection:\n\n- **Focus on areas of interest**: Whether it's a particular time period, geographic region, or photographic process.\n- **Consider condition**: While some wear is expected on vintage items, severe damage can affect both historical value and aesthetic appeal.\n- **Research provenance**: Knowing who created an image, when, and for what purpose adds significant context and value.\n- **Seek authenticity**: With the value of historical photographs increasing, reproductions and fakes have entered the market. Working with reputable dealers and educating yourself about the physical characteristics of different processes is essential.\n\n### Conclusion\n\nHistorical photographs are more than just images—they are artifacts that connect us directly to moments in time. Each photograph contains multiple stories: about the technological process that created it, the subject it depicts, the photographer who made it, and the cultural context that shaped it.\n\nAt WorldMapX, our collection of historical photographs focuses on images that capture pivotal moments in exploration, urban development, and cultural history. These visual documents complement our maps and prints, offering additional perspectives on how people experienced and recorded the world around them.\n\nBy understanding the technical evolution and cultural significance of historical photography, we can better appreciate these remarkable windows into the past and ensure their preservation for future generations to study and enjoy.",
          image: "https://images.unsplash.com/photo-1563293723-f5ccde1c8d29?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          readTime: 6,
          published: true
        },
        {
          title: "Collecting Historical Manuscripts",
          slug: "collecting-historical-manuscripts",
          excerpt: "A guide to starting and building a meaningful collection of historical manuscripts, letters and documents with provenance considerations.",
          content: "## Collecting Historical Manuscripts\n\nThere is something profoundly moving about holding a handwritten letter or document from the past. Unlike printed materials, manuscripts bear the direct imprint of their creators—the pressure of the pen, the flow of ink, the personality revealed in handwriting, and sometimes even fingerprints or other physical traces of the individuals who created them. For collectors, historians, and enthusiasts, historical manuscripts offer an immediate and intimate connection to the past that few other artifacts can match.\n\n### Understanding Historical Manuscripts\n\nThe term \"manuscript\" literally means \"written by hand\" and encompasses a wide range of documents:\n\n- **Personal correspondence**: Letters between individuals, which often provide insights into daily life, relationships, and personal reactions to historical events.\n\n- **Official documents**: Government records, military orders, land deeds, and legal papers that document institutional activities and decisions.\n\n- **Literary works**: Handwritten drafts of poems, novels, plays, and essays, showing the creative process and evolution of important texts.\n\n- **Diaries and journals**: Personal accounts that offer day-by-day perspectives on historical periods and events.\n\n- **Financial records**: Ledgers, receipts, and account books that reveal economic patterns and business practices.\n\n- **Scientific notes**: Laboratory records, field notes, and calculations that document the process of discovery and innovation.\n\nWhat unites these diverse materials is their handwritten nature and their direct connection to the individuals and institutions that created them.\n\n### Getting Started with Manuscript Collecting\n\nFor those interested in beginning a manuscript collection, several approaches can guide your entry into this fascinating field:\n\n#### Define Your Focus\n\nThe world of historical manuscripts is vast, spanning centuries and countless topics. Successful collectors typically develop specific areas of interest, which might include:\n\n- Particular historical periods (Civil War, Victorian era, etc.)\n- Geographic regions (documents related to a specific state or country)\n- Historical themes (westward expansion, maritime history, etc.)\n- Notable individuals or groups (politicians, authors, scientists, military units)\n- Industries or professions (railroad documents, medical records, etc.)\n\nA focused collection allows you to develop expertise in a specific area and makes the hunt for new acquisitions more strategic and rewarding.\n\n#### Start with Accessible Materials\n\nWhile letters signed by Abraham Lincoln or George Washington are spectacular additions to any collection, they come with price tags to match their historical significance. Beginning collectors can find satisfaction and value in less prominent but equally fascinating documents:\n\n- Letters from ordinary soldiers during wartime\n- Business correspondence from historical companies\n- Local government records from your region\n- Family papers related to everyday life in past centuries\n\nThese materials are often available at more moderate price points while still offering substantial historical interest.\n\n#### Develop Knowledge and Relationships\n\nSuccessful manuscript collecting depends on education and connections:\n\n- **Study reference works**: Books about autographs, handwriting styles, paper manufacturing, and historical stationery help you authenticate and contextualize potential acquisitions.\n\n- **Join collector organizations**: Groups like the Manuscript Society offer publications, events, and networking opportunities with fellow enthusiasts.\n\n- **Establish relationships with reputable dealers**: Experienced manuscript dealers can guide your collecting journey, alert you to items matching your interests, and help authenticate potential purchases.\n\n- **Visit institutional archives**: University libraries, historical societies, and public archives offer opportunities to study institutional collections and understand how manuscripts are organized and preserved.\n\n### Evaluating Historical Manuscripts\n\nWhen considering an addition to your collection, several factors determine both the historical significance and monetary value of a manuscript:\n\n#### Authenticity\n\nVerifying that a document is what it purports to be requires examining:\n\n- **Handwriting**: Comparing writing samples to authenticated examples\n- **Paper**: Examining watermarks, composition, and age-appropriate characteristics\n- **Ink**: Assessing color, flow, and chemical properties typical of the period\n- **Content**: Checking that references, dates, and facts align with historical records\n\nFor significant acquisitions, professional authentication services can provide expert evaluation.\n\n#### Provenance\n\nThe documented history of ownership (provenance) significantly impacts a manuscript's value and historical context:\n\n- **Direct line of descent**: Items passed down through a creator's family often have the strongest provenance.\n- **Institutional deaccession**: Items released from museum or library collections typically have well-documented backgrounds.\n- **Auction history**: Records from reputable auction houses provide reliable provenance information.\n- **Collection history**: Previous inclusion in notable private collections adds to an item's pedigree.\n\nWell-documented provenance not only increases value but also adds another layer of historical narrative to the manuscript itself.\n\n#### Condition\n\nThe physical state of a manuscript affects both its aesthetic appeal and long-term preservation potential:\n\n- **Paper condition**: Look for tears, stains, brittleness, and mold damage.\n- **Ink quality**: Assess fading, bleeding, or corrosion from iron gall inks.\n- **Completeness**: Determine if all pages are present and intact.\n- **Previous repairs**: Evaluate the quality and reversibility of any conservation work.\n\nWhile some condition issues are expected in centuries-old documents, severe damage can compromise both value and readability.\n\n#### Content and Historical Significance\n\nThe most important factor in evaluating manuscripts is their content and historical context:\n\n- **Historical events**: Documents that reference significant events often have greater importance.\n- **Notable individuals**: Manuscripts associated with prominent historical figures generally command higher interest.\n- **Rarity**: Unique or previously unknown accounts of historical events are particularly valuable.\n- **Research potential**: Documents that offer new insights or perspectives on historical topics have greater scholarly significance.\n\n### Caring for Your Manuscript Collection\n\nProper storage and handling are essential to preserving manuscripts for future generations:\n\n#### Storage Environment\n\n- **Temperature and humidity**: Maintain stable conditions around 65-70°F with 40-50% relative humidity.\n- **Light exposure**: Minimize exposure to all light, especially UV light which causes fading and deterioration.\n- **Air quality**: Avoid pollutants and ensure good air circulation to prevent mold growth.\n\n#### Housing Materials\n\n- **Acid-free folders and boxes**: Archival-quality enclosures prevent chemical deterioration.\n- **Polyester sleeves**: Clear, inert sleeves allow viewing without handling for frequently examined items.\n- **Support materials**: Acid-free board provides structural support for fragile documents.\n\n#### Handling Practices\n\n- **Clean hands**: Wash and dry hands thoroughly before handling manuscripts.\n- **Support**: Always provide full support underneath documents when moving them.\n- **Tools**: Use bone folders (not fingers) to turn delicate pages.\n- **No food or drink**: Keep food, beverages, and pens away from manuscript materials.\n\n#### Professional Conservation\n\nFor valuable or deteriorating items, consult professional conservators who can:\n\n- Assess condition and preservation needs\n- Clean surface dirt without damaging paper or ink\n- Stabilize tears and fragile areas\n- Reduce acidity with appropriate treatments\n- Create custom housing for uniquely shaped or sized items\n\n### The Ethics of Manuscript Collecting\n\nResponsible collectors consider several ethical dimensions:\n\n#### Cultural Heritage Concerns\n\nSome manuscripts represent significant cultural heritage that may be subject to repatriation claims or export restrictions. Research the legal status of international materials carefully.\n\n#### Public Access vs. Private Ownership\n\nConsider how your collection might eventually benefit scholarly research and public education, perhaps through eventual donation to an appropriate institution or through allowing researcher access.\n\n#### Preservation Responsibility\n\nAcquiring historical manuscripts comes with an implicit responsibility to preserve them properly for future generations.\n\n#### Market Transparency\n\nSupport ethical dealers who provide clear provenance information and authentic materials, helping to discourage forgeries and theft.\n\n### Conclusion\n\nCollecting historical manuscripts offers intellectual stimulation, historical insight, and the thrill of connecting directly with the past. From the flowing script of a 19th-century love letter to the urgent scrawl of a battlefield dispatch, these documents bring history to life in an immediate and personal way.\n\nAt WorldMapX, our carefully curated selection of historical manuscripts complements our collections of maps, prints, and photographs. Each document we offer has been authenticated and contextualized to help collectors build meaningful collections that preserve and illuminate our shared historical heritage.\n\nWhether you're just beginning your collecting journey or looking to add significant pieces to an established collection, the world of historical manuscripts offers endless opportunities for discovery and appreciation. The handwritten words of the past continue to speak to us today, offering insights, emotions, and connections that transcend time.",
          image: "https://images.unsplash.com/photo-1608217009408-c96a99dc3936?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          readTime: 10,
          published: true
        }
      ];
      
      blogPostsData.forEach(post => this.createBlogPost(post));
    });
  }
}

export const storage = new MemStorage();
