
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScholarshipFinder from "@/components/ScholarshipFinder";
import FinancialTools from "@/components/FinancialTools";
import ResourceHub from "@/components/ResourceHub";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Index = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <ScholarshipFinder />
        <FinancialTools />
        <ResourceHub />
      </main>
      
      <footer className="py-12 bg-secondary mt-16">
        <div className="edu-container text-center">
          <h2 className="text-2xl font-medium mb-4">EduFinance Access</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Breaking financial barriers in education through accessible resources, 
            scholarships, and financial planning tools.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-foreground/70 hover:text-primary transition-colors">About</a>
            <a href="#" className="text-foreground/70 hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-foreground/70 hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-foreground/70 hover:text-primary transition-colors">Contact</a>
          </div>
          <div className="mt-8 pt-8 border-t border-border/30 text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} EduFinance Access. All rights reserved.
          </div>
        </div>
      </footer>
      
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed right-6 bottom-6 p-3 rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:bg-primary/90",
          showScrollToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Index;
