
import { useState } from 'react';
import { Search, Filter, GraduationCap, DollarSign, BookOpen, Users } from 'lucide-react';
import { CustomButton } from './ui/CustomButton';
import { cn } from '@/lib/utils';

// Mock scholarship data
const MOCK_SCHOLARSHIPS = [
  {
    id: 1,
    title: "Future Leaders Scholarship",
    provider: "Education Foundation",
    amount: "$10,000",
    deadline: "2024-08-15",
    category: "Undergraduate",
    description: "For students demonstrating leadership potential and academic excellence.",
    eligibility: "Minimum GPA of 3.5, demonstrated leadership experience"
  },
  {
    id: 2,
    title: "STEM Excellence Award",
    provider: "Tech Innovation Group",
    amount: "$5,000",
    deadline: "2024-07-30",
    category: "STEM",
    description: "Supporting students pursuing degrees in Science, Technology, Engineering, or Mathematics.",
    eligibility: "Pursuing STEM degree, research experience preferred"
  },
  {
    id: 3,
    title: "Community Service Grant",
    provider: "Community Foundation",
    amount: "$3,500",
    deadline: "2024-09-01",
    category: "Service",
    description: "Recognizing students with outstanding commitment to community service.",
    eligibility: "Minimum 100 hours of community service, essay required"
  },
  {
    id: 4,
    title: "First Generation Scholarship",
    provider: "Access Education Fund",
    amount: "$7,500",
    deadline: "2024-08-10",
    category: "First-Gen",
    description: "Supporting first-generation college students in their educational journey.",
    eligibility: "First-generation college student, financial need"
  },
];

const categories = ["All", "Undergraduate", "Graduate", "STEM", "Arts", "Service", "First-Gen"];

export default function ScholarshipFinder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredScholarships = MOCK_SCHOLARSHIPS.filter(scholarship => {
    const matchesSearch = scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          scholarship.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || scholarship.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-16 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="edu-container">
        <div className="mb-12 max-w-4xl">
          <div className="mb-2">
            <span className="chip bg-secondary text-primary-foreground">Scholarship Finder</span>
          </div>
          <h2 className="mb-4">Discover Financial Opportunities</h2>
          <p className="text-foreground/80 text-lg">
            Search through scholarships, grants, and financial aid options tailored to your educational goals.
          </p>
        </div>

        <div className="bg-secondary/50 rounded-2xl p-6 mb-10 backdrop-blur-sm border border-border/50">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search scholarships by name, provider, or keywords..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative min-w-[200px]">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <select
                className="w-full appearance-none pl-10 pr-10 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {filteredScholarships.length > 0 ? (
          <div className="grid gap-6">
            {filteredScholarships.map((scholarship, index) => (
              <div 
                key={scholarship.id}
                className={cn(
                  "bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 opacity-0 animate-slide-up card-hover",
                )}
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 lg:items-center">
                    <div className="flex-grow">
                      <h3 className="text-xl font-medium mb-1">{scholarship.title}</h3>
                      <p className="text-muted-foreground">{scholarship.provider}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 lg:gap-8">
                      <div>
                        <div className="flex items-center text-muted-foreground mb-1">
                          <DollarSign className="h-4 w-4 mr-1" />
                          <span className="text-sm">Amount</span>
                        </div>
                        <p className="font-medium">{scholarship.amount}</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center text-muted-foreground mb-1">
                          <GraduationCap className="h-4 w-4 mr-1" />
                          <span className="text-sm">Category</span>
                        </div>
                        <div className="chip bg-primary/10 text-primary text-xs">
                          {scholarship.category}
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center text-muted-foreground mb-1">
                          <BookOpen className="h-4 w-4 mr-1" />
                          <span className="text-sm">Deadline</span>
                        </div>
                        <p className="font-medium">{new Date(scholarship.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                      
                      <div className="lg:ml-auto">
                        <CustomButton 
                          onClick={() => setExpandedId(expandedId === scholarship.id ? null : scholarship.id)}
                          size="sm"
                          variant={expandedId === scholarship.id ? "subtle" : "outline"}
                        >
                          {expandedId === scholarship.id ? "Less Info" : "More Info"}
                        </CustomButton>
                      </div>
                    </div>
                  </div>
                  
                  {expandedId === scholarship.id && (
                    <div className="mt-6 pt-6 border-t border-border/50 animate-fade-in">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Description</h4>
                          <p>{scholarship.description}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground mb-2">Eligibility</h4>
                          <p>{scholarship.eligibility}</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <CustomButton>Apply Now</CustomButton>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-secondary/30 rounded-xl border border-border/50">
            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No scholarships found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or browse all scholarships.</p>
          </div>
        )}
      </div>
    </section>
  );
}
