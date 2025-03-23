import { useEffect } from "react";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import Newsletter from "@/components/Newsletter";
import { Globe, Award, Map, Users, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  useEffect(() => {
    document.title = "About Us | WorldMapX";
  }, []);

  return (
    <>
      <SEO 
        title="About Us" 
        description="Learn about WorldMapX's mission to curate and preserve historical maps, prints, and artifacts that connect us to our shared global heritage."
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About WorldMapX",
          "description": "Our mission is to curate and preserve historical maps, prints, and artifacts that connect us to our shared global heritage."
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[
          { label: "About" }
        ]} />
        
        {/* Hero Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-4">
                Our Story
              </h1>
              <p className="text-lg text-neutral-600 mb-6">
                WorldMapX was founded in 2018 by a team of historians, collectors, and cartography enthusiasts who share a passion for preserving and sharing the artistic and historical significance of maps and related artifacts.
              </p>
              <p className="text-lg text-neutral-600">
                Our mission is to curate and make accessible a diverse collection of historical maps, prints, photographs, and documents that tell the story of human exploration, creativity, and understanding of our world throughout the centuries.
              </p>
            </div>
            <div className="aspect-ratio-container aspect-ratio-3-2 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Historical map collection" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Values & Mission */}
        <div className="mb-16 bg-white rounded-lg shadow-sm p-8 border border-neutral-200">
          <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-8 text-center">
            Our Values & Mission
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Preservation</h3>
              <p className="text-neutral-600">
                We work to preserve historical artifacts that might otherwise be lost to time, ensuring their stories continue to be told.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Authenticity</h3>
              <p className="text-neutral-600">
                We rigorously research and authenticate every item in our collection, providing accurate historical context.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Map className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Education</h3>
              <p className="text-neutral-600">
                We believe in the educational value of historical artifacts and strive to make their stories accessible to all.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Community</h3>
              <p className="text-neutral-600">
                We foster a community of collectors, historians, and enthusiasts who share our passion for historical discovery.
              </p>
            </div>
          </div>
        </div>
        
        {/* Our Process */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-8 text-center">
            Our Curation Process
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 border border-neutral-200">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Discovery & Acquisition</h3>
              <p className="text-neutral-600">
                Our team of experts travels the world to find exceptional historical artifacts through auctions, estate sales, and private collections. Each potential addition is carefully evaluated for historical significance, condition, and authenticity.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-neutral-200">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Authentication & Research</h3>
              <p className="text-neutral-600">
                Each item undergoes rigorous authentication and research. We collaborate with historians, universities, and specialized institutions to document provenance, historical context, and unique characteristics of every piece in our collection.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-neutral-200">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">Preservation & Presentation</h3>
              <p className="text-neutral-600">
                Our conservation specialists ensure each artifact is properly preserved and prepared for display. We create detailed descriptions and digital reproductions to make these historical treasures accessible to collectors and enthusiasts worldwide.
              </p>
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-8 text-center">
            Meet Our Team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-neutral-200">
              <div className="aspect-ratio-container aspect-ratio-1-1">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                  alt="Emily Chen" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-serif font-semibold">Emily Chen, Ph.D.</h3>
                <p className="text-primary mb-2">Founder & Head Curator</p>
                <p className="text-neutral-600 text-sm">
                  With a doctorate in Historical Geography from Oxford, Emily brings 20 years of experience in historical cartography and has published numerous scholarly articles on map history.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-neutral-200">
              <div className="aspect-ratio-container aspect-ratio-1-1">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                  alt="David Okafor" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-serif font-semibold">David Okafor</h3>
                <p className="text-primary mb-2">Conservation Specialist</p>
                <p className="text-neutral-600 text-sm">
                  David specializes in paper conservation and previously worked at the British Library's conservation department, bringing expert knowledge in preserving delicate historical documents.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-neutral-200">
              <div className="aspect-ratio-container aspect-ratio-1-1">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                  alt="Maria Gonzalez" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-serif font-semibold">Maria Gonzalez</h3>
                <p className="text-primary mb-2">Director of Research</p>
                <p className="text-neutral-600 text-sm">
                  Maria has an extensive background in historical research with special focus on Colonial-era cartography and printmaking techniques of the 16th to 19th centuries.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-primary text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
            Explore Our Collection Today
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-6">
            Discover unique historical artifacts that tell stories of exploration, creativity, and human understanding throughout the centuries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="btn-secondary">
              Browse Collection
            </Link>
            <Link href="/contact" className="bg-primary-light hover:bg-primary-dark text-white rounded px-6 py-3 font-medium text-center transition duration-150 inline-flex items-center">
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
      
      <Newsletter />
    </>
  );
}
