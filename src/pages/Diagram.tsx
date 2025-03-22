
import Navbar from "@/components/Navbar";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import { ArrowLeft } from "lucide-react";
import { CustomButton } from "@/components/ui/CustomButton";
import { useNavigate } from "react-router-dom";

const Diagram = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-28 pb-16">
        <div className="edu-container">
          <div className="mb-8">
            <CustomButton 
              variant="ghost" 
              size="sm" 
              className="group mb-4"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </CustomButton>
            
            <h1 className="mb-6 opacity-0 animate-fade-in">Architecture Diagram</h1>
            <p className="text-lg text-foreground/80 max-w-3xl opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Visual representation of the EduFinance Access application architecture and component relationships.
            </p>
          </div>
          
          <ArchitectureDiagram />
        </div>
      </main>
      
      <footer className="py-8 bg-secondary">
        <div className="edu-container text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} EduFinance Access. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Diagram;
