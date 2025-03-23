import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import Newsletter from "@/components/Newsletter";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  
  useEffect(() => {
    document.title = "Contact Us | WorldMapX";
  }, []);
  
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, this would send the form data to a backend API
      console.log("Contact form submission:", data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent successfully",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <SEO 
        title="Contact Us" 
        description="Get in touch with the WorldMapX team. We're here to answer your questions about our historical maps, prints, and artifacts."
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact WorldMapX",
          "description": "Get in touch with the WorldMapX team"
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[
          { label: "Contact" }
        ]} />
        
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question about our collection, need assistance with an order, or want to discuss a special acquisition, our team is here to help.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-neutral-200 p-6 h-full">
              <h2 className="text-xl font-serif font-semibold mb-6">
                Contact Information
              </h2>
              
              <ul className="space-y-6">
                <li className="flex">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div className="ml-4">
                    <h3 className="font-medium text-neutral-900">Our Address</h3>
                    <p className="text-neutral-600 mt-1">
                      123 Map Street<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div className="ml-4">
                    <h3 className="font-medium text-neutral-900">Phone</h3>
                    <p className="text-neutral-600 mt-1">
                      (555) 123-4567
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div className="ml-4">
                    <h3 className="font-medium text-neutral-900">Email</h3>
                    <p className="text-neutral-600 mt-1">
                      info@worldmapx.com
                    </p>
                  </div>
                </li>
                
                <li className="flex">
                  <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div className="ml-4">
                    <h3 className="font-medium text-neutral-900">Working Hours</h3>
                    <p className="text-neutral-600 mt-1">
                      Monday - Friday: 9am - 6pm<br />
                      Saturday: 10am - 4pm<br />
                      Sunday: Closed
                    </p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8 border-t border-neutral-200 pt-6">
                <h3 className="font-medium text-neutral-900 mb-3">Follow Us</h3>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary hover:text-white transition duration-150"
                    aria-label="Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary hover:text-white transition duration-150"
                    aria-label="Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary hover:text-white transition duration-150"
                    aria-label="Twitter"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h2 className="text-xl font-serif font-semibold mb-6">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      className={`block w-full rounded-md border-neutral-300 py-2 px-3 placeholder:text-neutral-400 focus:border-primary focus:ring-primary ${
                        errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                      }`}
                      placeholder="John Doe"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={`block w-full rounded-md border-neutral-300 py-2 px-3 placeholder:text-neutral-400 focus:border-primary focus:ring-primary ${
                        errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                      }`}
                      placeholder="john@example.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-1">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className={`block w-full rounded-md border-neutral-300 py-2 px-3 placeholder:text-neutral-400 focus:border-primary focus:ring-primary ${
                      errors.subject ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                    placeholder="How can we help you?"
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className={`block w-full rounded-md border-neutral-300 py-2 px-3 placeholder:text-neutral-400 focus:border-primary focus:ring-primary ${
                      errors.message ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                    placeholder="Tell us how we can assist you..."
                    {...register("message")}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>
                
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto bg-primary hover:bg-primary-dark text-white py-2 px-6"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Map */}
        <div className="rounded-lg overflow-hidden h-96 border border-neutral-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215256249169!2d-73.9820157!3d40.7487642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9aeb1c6b5%3A0x35b1cfbc89a6097f!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1646817641461!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            title="WorldMapX Location"
          ></iframe>
        </div>
      </div>
      
      <Newsletter />
    </>
  );
}
