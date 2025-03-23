import { Helmet } from "react-helmet";

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  type?: "website" | "article" | "product";
  image?: string;
  schema?: Record<string, any>;
}

export default function SEO({ 
  title, 
  description = "Discover curated historical maps, prints, photographs and manuscripts at WorldMapX. Explore our collection blending history, art and exploration.",
  canonical,
  type = "website",
  image = "https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  schema,
}: SEOProps) {
  const siteTitle = "WorldMapX - Curated Maps, Prints & Historical Artifacts";
  const fullTitle = title === "Home" ? siteTitle : `${title} | WorldMapX`;
  
  const url = canonical || (typeof window !== "undefined" ? window.location.href : "");
  
  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
