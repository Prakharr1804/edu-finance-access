
import Navbar from "@/components/Navbar";
import { ArrowLeft } from "lucide-react";
import { CustomButton } from "@/components/ui/CustomButton";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "@/components/VideoPlayer";

const Video = () => {
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
            
            <h1 className="mb-6 opacity-0 animate-fade-in">EduFinance Access Explained</h1>
            <p className="text-lg text-foreground/80 max-w-3xl opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Watch this short video to understand how EduFinance Access helps break financial barriers in education through 
              scholarships, resources, and financial planning tools.
            </p>
          </div>
          
          <VideoPlayer />
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

export default Video;
