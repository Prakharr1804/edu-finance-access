
import { ArrowRight } from 'lucide-react';
import { CustomButton } from './ui/CustomButton';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24">
      <div className="edu-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <span className="chip bg-primary/10 text-primary opacity-0 animate-fade-in">
              Breaking Financial Barriers in Education
            </span>
          </div>
          
          <h1 className="mb-6 opacity-0 animate-fade-in animation-delay-100">
            Education Should Be 
            <span className="relative mx-2">
              <span className="text-primary">Accessible</span>
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary/20 rounded-full"></span>
            </span>
            to Everyone
          </h1>

          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto opacity-0 animate-slide-up animation-delay-200">
            Discover scholarships, free resources, and financial planning tools to make your educational journey more affordable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-slide-up animation-delay-300">
            <CustomButton 
              size="lg" 
              variant="primary"
              className="group"
              onClick={() => navigate('/scholarships')}
            >
              Find Scholarships
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </CustomButton>
            
            <CustomButton 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/calculator')}
            >
              Financial Calculator
            </CustomButton>
          </div>
        </div>
      </div>

      {/* Abstract Background Elements */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full filter blur-[128px] opacity-70"></div>
    </section>
  );
}
