
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Scholarships', path: '/scholarships' },
  { name: 'Resources', path: '/resources' },
  { name: 'Calculator', path: '/calculator' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out',
        isScrolled 
          ? 'py-3 backdrop-blur-md bg-background/80 shadow-sm' 
          : 'py-5 bg-transparent'
      )}
    >
      <nav className="edu-container flex items-center justify-between">
        <div className="flex-1">
          <NavLink 
            to="/"
            className="text-xl font-semibold flex items-center text-foreground"
          >
            <span className="relative overflow-hidden">
              <span className="flex space-x-1">
                <span className="text-primary">Edu</span>
                <span>Finance</span>
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full duration-300"></span>
            </span>
          </NavLink>
        </div>
        
        {/* Desktop menu */}
        <div className="hidden md:flex space-x-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                'nav-link opacity-0 animate-fade-in',
                isActive && 'active'
              )}
              style={{ animationDelay: `${navItems.indexOf(item) * 0.1}s` }}
              end={item.path === '/'}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>
      
      {/* Mobile menu, show/hide based on menu state */}
      {isMobile && (
        <div 
          className={cn(
            "fixed inset-0 bg-background flex flex-col pt-24 px-4 transition-all duration-300 ease-in-out z-40",
            mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
          )}
        >
          <div className="space-y-4 flex flex-col">
            {navItems.map((item, index) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  'text-xl py-3 border-b border-border/30 text-foreground/80 hover:text-foreground transition-colors',
                  isActive && 'text-primary font-medium'
                )}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
