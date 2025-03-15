
import { useState } from 'react';
import { BookOpen, Video, FileText, Users, ExternalLink, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CustomButton } from './ui/CustomButton';

type ResourceCategory = 'all' | 'courses' | 'books' | 'articles' | 'communities';

interface Resource {
  id: number;
  title: string;
  provider: string;
  type: 'course' | 'book' | 'article' | 'community';
  description: string;
  link: string;
  isFree: boolean;
  tags: string[];
}

// Mock resource data
const MOCK_RESOURCES: Resource[] = [
  {
    id: 1,
    title: "Introduction to Financial Literacy",
    provider: "Khan Academy",
    type: "course",
    description: "A comprehensive introduction to financial literacy concepts, including budgeting, saving, and understanding credit.",
    link: "#",
    isFree: true,
    tags: ["finance", "beginner", "budgeting"]
  },
  {
    id: 2,
    title: "The Complete Guide to Student Finances",
    provider: "Open University",
    type: "book",
    description: "A comprehensive guide covering all aspects of managing finances throughout your educational journey.",
    link: "#",
    isFree: true,
    tags: ["finance", "comprehensive", "students"]
  },
  {
    id: 3,
    title: "Strategies for Scholarship Applications",
    provider: "Education Weekly",
    type: "article",
    description: "Learn effective strategies for crafting compelling scholarship applications that stand out to selection committees.",
    link: "#",
    isFree: true,
    tags: ["scholarships", "applications", "writing"]
  },
  {
    id: 4,
    title: "Student Financial Support Community",
    provider: "EduConnect",
    type: "community",
    description: "Join a supportive community of students sharing financial tips, scholarship opportunities, and mutual support.",
    link: "#",
    isFree: true,
    tags: ["community", "support", "networking"]
  },
  {
    id: 5,
    title: "Advanced Personal Finance for Students",
    provider: "Coursera",
    type: "course",
    description: "Dive deeper into personal finance topics specifically tailored for students navigating educational expenses.",
    link: "#",
    isFree: true,
    tags: ["finance", "advanced", "students"]
  },
  {
    id: 6,
    title: "Paying for College Without Going Broke",
    provider: "Financial Aid Press",
    type: "book",
    description: "Practical strategies for funding your education through scholarships, grants, and smart financial planning.",
    link: "#",
    isFree: true,
    tags: ["college", "financial aid", "planning"]
  }
];

export default function ResourceHub() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory>('all');

  const filteredResources = MOCK_RESOURCES.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
                           (selectedCategory === 'courses' && resource.type === 'course') ||
                           (selectedCategory === 'books' && resource.type === 'book') ||
                           (selectedCategory === 'articles' && resource.type === 'article') ||
                           (selectedCategory === 'communities' && resource.type === 'community');
    
    return matchesSearch && matchesCategory;
  });

  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'course':
        return <Video className="h-5 w-5" />;
      case 'book':
        return <BookOpen className="h-5 w-5" />;
      case 'article':
        return <FileText className="h-5 w-5" />;
      case 'community':
        return <Users className="h-5 w-5" />;
    }
  };

  return (
    <section className="py-16 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <div className="edu-container">
        <div className="mb-12 max-w-4xl">
          <div className="mb-2">
            <span className="chip bg-secondary text-primary-foreground">Resource Hub</span>
          </div>
          <h2 className="mb-4">Free Educational Resources</h2>
          <p className="text-foreground/80 text-lg">
            Discover high-quality, free educational materials to help you advance your knowledge without financial barriers.
          </p>
        </div>
        
        <div className="bg-secondary/50 rounded-2xl p-6 mb-10 backdrop-blur-sm border border-border/50">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search resources by title, description, or tags..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                selectedCategory === 'all' 
                  ? "bg-primary text-white" 
                  : "bg-secondary hover:bg-secondary/80 text-foreground/80"
              )}
              onClick={() => setSelectedCategory('all')}
            >
              All Resources
            </button>
            
            <button
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                selectedCategory === 'courses' 
                  ? "bg-primary text-white" 
                  : "bg-secondary hover:bg-secondary/80 text-foreground/80"
              )}
              onClick={() => setSelectedCategory('courses')}
            >
              <Video className="inline-block h-4 w-4 mr-1" />
              Courses
            </button>
            
            <button
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                selectedCategory === 'books' 
                  ? "bg-primary text-white" 
                  : "bg-secondary hover:bg-secondary/80 text-foreground/80"
              )}
              onClick={() => setSelectedCategory('books')}
            >
              <BookOpen className="inline-block h-4 w-4 mr-1" />
              Books
            </button>
            
            <button
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                selectedCategory === 'articles' 
                  ? "bg-primary text-white" 
                  : "bg-secondary hover:bg-secondary/80 text-foreground/80"
              )}
              onClick={() => setSelectedCategory('articles')}
            >
              <FileText className="inline-block h-4 w-4 mr-1" />
              Articles
            </button>
            
            <button
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                selectedCategory === 'communities' 
                  ? "bg-primary text-white" 
                  : "bg-secondary hover:bg-secondary/80 text-foreground/80"
              )}
              onClick={() => setSelectedCategory('communities')}
            >
              <Users className="inline-block h-4 w-4 mr-1" />
              Communities
            </button>
          </div>
        </div>
        
        {filteredResources.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource, index) => (
              <div 
                key={resource.id}
                className="bg-card rounded-xl border border-border overflow-hidden transition-all opacity-0 animate-slide-up card-hover"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {getResourceIcon(resource.type)}
                    </div>
                    {resource.isFree && (
                      <span className="chip bg-primary/10 text-primary text-xs">
                        Free
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-medium mb-1">{resource.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">by {resource.provider}</p>
                  
                  <p className="text-foreground/80 mb-4 line-clamp-3">
                    {resource.description}
                  </p>
                  
                  <div className="mb-4 flex flex-wrap gap-2">
                    {resource.tags.map(tag => (
                      <span key={tag} className="chip bg-secondary text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <CustomButton 
                    className="w-full justify-center group"
                    variant="outline"
                  >
                    Access Resource
                    <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </CustomButton>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-secondary/30 rounded-xl border border-border/50">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No resources found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or browse all resources.</p>
          </div>
        )}
      </div>
    </section>
  );
}
