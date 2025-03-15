
import React, { useState } from 'react';
import { Calculator, DollarSign, BookOpen, GraduationCap, PiggyBank } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CustomButton } from './ui/CustomButton';

type CalculatorType = 'loan' | 'budget' | 'savings';

export default function FinancialTools() {
  const [calculatorType, setCalculatorType] = useState<CalculatorType>('loan');
  
  // Loan Calculator States
  const [loanAmount, setLoanAmount] = useState(10000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(10);
  
  // Budget Calculator States
  const [tuition, setTuition] = useState(15000);
  const [housing, setHousing] = useState(8000);
  const [books, setBooks] = useState(1200);
  const [food, setFood] = useState(3600);
  const [otherExpenses, setOtherExpenses] = useState(2000);
  
  // Savings Calculator States
  const [savingsGoal, setSavingsGoal] = useState(25000);
  const [currentSavings, setCurrentSavings] = useState(5000);
  const [monthlySavings, setMonthlySavings] = useState(300);
  const [savingsRate, setSavingsRate] = useState(2);
  
  // Calculated Results
  const calculateLoanPayment = () => {
    const monthlyRate = interestRate / 100 / 12;
    const payments = loanTerm * 12;
    const x = Math.pow(1 + monthlyRate, payments);
    const monthly = (loanAmount * x * monthlyRate) / (x - 1);
    
    return isNaN(monthly) ? 0 : monthly;
  };
  
  const calculateTotalBudget = () => {
    return tuition + housing + books + food + otherExpenses;
  };
  
  const calculateTimeToSavingsGoal = () => {
    // Simple calculation without compounding for UI purposes
    const remaining = savingsGoal - currentSavings;
    if (monthlySavings <= 0) return Infinity;
    
    // Very simplified calculation
    const monthsToGoal = remaining / monthlySavings;
    return Math.ceil(monthsToGoal);
  };
  
  return (
    <section className="py-16 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <div className="edu-container">
        <div className="mb-12 max-w-4xl">
          <div className="mb-2">
            <span className="chip bg-secondary text-primary-foreground">Financial Tools</span>
          </div>
          <h2 className="mb-4">Plan Your Educational Finances</h2>
          <p className="text-foreground/80 text-lg">
            Use our calculators to estimate costs, plan loan repayments, and set savings goals for your education.
          </p>
        </div>
        
        <div className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm">
          <div className="flex overflow-x-auto">
            <button
              className={cn(
                "flex items-center px-6 py-4 text-left font-medium border-b-2 transition-all min-w-[150px]",
                calculatorType === 'loan' 
                  ? "border-primary text-primary" 
                  : "border-transparent hover:border-border/50 text-muted-foreground"
              )}
              onClick={() => setCalculatorType('loan')}
            >
              <DollarSign className="h-5 w-5 mr-2" />
              <span>Loan Calculator</span>
            </button>
            
            <button
              className={cn(
                "flex items-center px-6 py-4 text-left font-medium border-b-2 transition-all min-w-[150px]",
                calculatorType === 'budget' 
                  ? "border-primary text-primary" 
                  : "border-transparent hover:border-border/50 text-muted-foreground"
              )}
              onClick={() => setCalculatorType('budget')}
            >
              <Calculator className="h-5 w-5 mr-2" />
              <span>Budget Planner</span>
            </button>
            
            <button
              className={cn(
                "flex items-center px-6 py-4 text-left font-medium border-b-2 transition-all min-w-[170px]",
                calculatorType === 'savings' 
                  ? "border-primary text-primary" 
                  : "border-transparent hover:border-border/50 text-muted-foreground"
              )}
              onClick={() => setCalculatorType('savings')}
            >
              <PiggyBank className="h-5 w-5 mr-2" />
              <span>Savings Projector</span>
            </button>
          </div>
          
          <div className="p-6">
            {calculatorType === 'loan' && (
              <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
                <div>
                  <h3 className="text-xl font-medium mb-6">Student Loan Payment Calculator</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Loan Amount: ${loanAmount.toLocaleString()}</label>
                      <input
                        type="range"
                        min="1000"
                        max="100000"
                        step="1000"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>$1,000</span>
                        <span>$100,000</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Interest Rate: {interestRate}%</label>
                      <input
                        type="range"
                        min="1"
                        max="15"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>1%</span>
                        <span>15%</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Loan Term: {loanTerm} years</label>
                      <input
                        type="range"
                        min="1"
                        max="30"
                        step="1"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>1 year</span>
                        <span>30 years</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col justify-center">
                  <div className="bg-secondary p-8 rounded-xl">
                    <h4 className="text-lg font-medium text-center mb-6">Estimated Monthly Payment</h4>
                    
                    <div className="text-center mb-6">
                      <span className="text-4xl font-bold">${calculateLoanPayment().toFixed(2)}</span>
                      <span className="block text-sm text-muted-foreground mt-1">per month</span>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Principal:</span>
                        <span className="font-medium">${loanAmount.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Interest:</span>
                        <span className="font-medium">
                          ${(calculateLoanPayment() * loanTerm * 12 - loanAmount).toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-muted-foreground">Total Repayment:</span>
                        <span className="font-medium">
                          ${(calculateLoanPayment() * loanTerm * 12).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    This calculator provides an estimate. Actual loan terms may vary based on your financial situation and lender policies.
                  </p>
                </div>
              </div>
            )}
            
            {calculatorType === 'budget' && (
              <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
                <div>
                  <h3 className="text-xl font-medium mb-6">Education Budget Planner</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Tuition & Fees</label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-muted-foreground">$</span>
                        </div>
                        <input
                          type="number"
                          value={tuition}
                          onChange={(e) => setTuition(Number(e.target.value))}
                          className="pl-7 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Housing & Utilities</label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-muted-foreground">$</span>
                        </div>
                        <input
                          type="number"
                          value={housing}
                          onChange={(e) => setHousing(Number(e.target.value))}
                          className="pl-7 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Books & Supplies</label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-muted-foreground">$</span>
                        </div>
                        <input
                          type="number"
                          value={books}
                          onChange={(e) => setBooks(Number(e.target.value))}
                          className="pl-7 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Food & Dining</label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-muted-foreground">$</span>
                        </div>
                        <input
                          type="number"
                          value={food}
                          onChange={(e) => setFood(Number(e.target.value))}
                          className="pl-7 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Other Expenses</label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-muted-foreground">$</span>
                        </div>
                        <input
                          type="number"
                          value={otherExpenses}
                          onChange={(e) => setOtherExpenses(Number(e.target.value))}
                          className="pl-7 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col justify-center">
                  <div className="bg-secondary p-8 rounded-xl">
                    <h4 className="text-lg font-medium text-center mb-6">Estimated Annual Budget</h4>
                    
                    <div className="text-center mb-6">
                      <span className="text-4xl font-bold">${calculateTotalBudget().toLocaleString()}</span>
                      <span className="block text-sm text-muted-foreground mt-1">per year</span>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tuition & Fees:</span>
                        <span className="font-medium">${tuition.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Housing & Utilities:</span>
                        <span className="font-medium">${housing.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Books & Supplies:</span>
                        <span className="font-medium">${books.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Food & Dining:</span>
                        <span className="font-medium">${food.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Other Expenses:</span>
                        <span className="font-medium">${otherExpenses.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    Estimated monthly expenses: ${(calculateTotalBudget() / 12).toFixed(2)}
                  </p>
                </div>
              </div>
            )}
            
            {calculatorType === 'savings' && (
              <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
                <div>
                  <h3 className="text-xl font-medium mb-6">Education Savings Projector</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Savings Goal: ${savingsGoal.toLocaleString()}</label>
                      <input
                        type="range"
                        min="1000"
                        max="100000"
                        step="1000"
                        value={savingsGoal}
                        onChange={(e) => setSavingsGoal(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>$1,000</span>
                        <span>$100,000</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Current Savings: ${currentSavings.toLocaleString()}</label>
                      <input
                        type="range"
                        min="0"
                        max={savingsGoal}
                        step="500"
                        value={currentSavings}
                        onChange={(e) => setCurrentSavings(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>$0</span>
                        <span>${savingsGoal.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Monthly Contribution: ${monthlySavings}</label>
                      <input
                        type="range"
                        min="50"
                        max="2000"
                        step="50"
                        value={monthlySavings}
                        onChange={(e) => setMonthlySavings(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>$50</span>
                        <span>$2,000</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Interest Rate: {savingsRate}%</label>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        value={savingsRate}
                        onChange={(e) => setSavingsRate(Number(e.target.value))}
                        className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0%</span>
                        <span>10%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col justify-center">
                  <div className="bg-secondary p-8 rounded-xl">
                    <h4 className="text-lg font-medium text-center mb-6">Savings Projection</h4>
                    
                    <div className="flex items-center justify-center mb-6">
                      <div className="relative w-32 h-32">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <circle 
                            cx="50" 
                            cy="50" 
                            r="45" 
                            fill="none" 
                            stroke="#e2e8f0" 
                            strokeWidth="10" 
                          />
                          <circle 
                            cx="50" 
                            cy="50" 
                            r="45" 
                            fill="none" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth="10" 
                            strokeDasharray={2 * Math.PI * 45} 
                            strokeDashoffset={2 * Math.PI * 45 * (1 - currentSavings / savingsGoal)} 
                            transform="rotate(-90 50 50)" 
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                          <span className="text-2xl font-bold">
                            {Math.round((currentSavings / savingsGoal) * 100)}%
                          </span>
                          <span className="text-xs text-muted-foreground">Saved</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Current Savings:</span>
                        <span className="font-medium">${currentSavings.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount Needed:</span>
                        <span className="font-medium">${(savingsGoal - currentSavings).toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between pt-3 border-t">
                        <span className="text-muted-foreground">Time to Goal:</span>
                        <span className="font-medium">
                          {calculateTimeToSavingsGoal() === Infinity 
                            ? "N/A" 
                            : `${calculateTimeToSavingsGoal()} months`}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    <CustomButton>Download Savings Plan</CustomButton>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
