import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormData = z.infer<typeof emailSchema>;

export default function Newsletter() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });
  
  const onSubmit = async (data: EmailFormData) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, this would send the email to a newsletter service
      console.log("Newsletter subscription:", data.email);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Thank you for subscribing!",
        description: "We've added you to our newsletter list.",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">Stay Updated</h2>
          <p className="mt-4 text-lg text-white/80">
            Be the first to know about our new acquisitions, upcoming events and historical insights
          </p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 sm:flex justify-center">
            <div className="min-w-0 flex-1">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                type="email"
                className={`block w-full rounded-l-md border-0 py-3 px-4 text-neutral-900 placeholder:text-neutral-500 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary ${
                  errors.email ? "ring-2 ring-destructive" : ""
                }`}
                placeholder="Enter your email"
                {...register("email")}
              />
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="block w-full rounded-r-md bg-secondary hover:bg-secondary-dark py-3 px-6 font-medium text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary transition duration-150 disabled:opacity-70"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
          </form>
          
          {errors.email && (
            <p className="mt-2 text-sm text-white/90">{errors.email.message}</p>
          )}
          
          <p className="mt-3 text-sm text-white/70">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
