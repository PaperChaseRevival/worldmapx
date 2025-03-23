import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="relative hero-image h-[70vh]">
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
            Explore The World Through Time
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90">
            Curated maps, prints and historical artifacts that tell stories of exploration, discovery and human ingenuity.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/shop/maps" className="btn-primary">
              Explore Collection
            </Link>
            <Link href="/about" className="btn-secondary">
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
