
import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash, Edit, ArrowDownUp, Calendar, Filter } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format as formatDate } from "date-fns";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock expense data
const initialExpenses = [
  { id: 1, date: "2025-05-01", description: "Aluguel", category: "Fixo", amount: 2500.00, recurring: true },
  { id: 2, date: "2025-05-03", description: "Produtos de Cabelo", category: "Insumos", amount: 750.50, recurring: false },
  { id: 3, date: "2025-05-05", description: "Água", category: "Utilidades", amount: 120.00, recurring: true },
  { id: 4, date: "2025-04-08", description: "Luz", category: "Utilidades", amount: 380.00, recurring: true },
  { id: 5, date: "2025-04-10", description: "Marketing Digital", category: "Marketing", amount: 300.00, recurring: true },
  { id: 6, date: "2025-04-15", description: "Manutenção Equipamentos", category: "Manutenção", amount: 250.00, recurring: false },
  { id: 7, date: "2025-03-20", description: "Material de Limpeza", category: "Insumos", amount: 180.00, recurring: false },
  { id: 8, date: "2025-03-25", description: "Internet", category: "Utilidades", amount: 120.00, recurring: true },
];

interface ExpensesModuleProps {
  openAddExpenseDialog: () => void;
}

const getCategoryTranslationKey = (category: string): "expense.categories.fixed" | 
                                                      "expense.categories.supplies" | 
                                                      "expense.categories.marketing" | 
                                                      "expense.categories.maintenance" | 
                                                      "expense.categories.utilities" | 
                                                      "expense.categories.salaries" | 
                                                      "expense.categories.taxes" | 
                                                      "expense.categories.others" => {
  const categoryMap: Record<string, "expense.categories.fixed" | 
                                    "expense.categories.supplies" | 
                                    "expense.categories.marketing" | 
                                    "expense.categories.maintenance" | 
                                    "expense.categories.utilities" | 
                                    "expense.categories.salaries" | 
                                    "expense.categories.taxes" | 
                                    "expense.categories.others"> = {
    'Fixo': 'expense.categories.fixed',
    'Insumos': 'expense.categories.supplies',
    'Marketing': 'expense.categories.marketing',
    'Manutenção': 'expense.categories.maintenance',
    'Utilidades': 'expense.categories.utilities',
    'Salários': 'expense.categories.salaries',
    'Impostos': 'expense.categories.taxes',
    'Outros': 'expense.categories.others',
  };
  
  return categoryMap[category] || 'expense.categories.others';
};

const ExpensesModule = ({ openAddExpenseDialog }: ExpensesModuleProps) => {
  const [expenses] = useState(initialExpenses);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const { t, language } = useTranslation();

  const applyDateFilter = () => {
    if (startDate || endDate) {
      setIsFilterActive(true);
    }
  };

  const resetFilter = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setIsFilterActive(false);
  };

  const filteredExpenses = useMemo(() => {
    let filtered = expenses;
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(expense =>
        expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply date filter
    if (isFilterActive) {
      filtered = filtered.filter(expense => {
        const expenseDate = new Date(expense.date);
        
        if (startDate && endDate) {
          return expenseDate >= startDate && expenseDate <= endDate;
        } else if (startDate) {
          return expenseDate >= startDate;
        } else if (endDate) {
          return expenseDate <= endDate;
        }
        
        return true;
      });
    }
    
    return filtered;
  }, [expenses, searchQuery, startDate, endDate, isFilterActive]);

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const formatCurrency = (value: number) => {
    const currencyMap: Record<string, string> = {
      'pt-BR': 'BRL',
      'pt-PT': 'EUR',
      'en': 'USD',
      'cs': 'CZK',
      'is': 'ISK'
    };
    
    return new Intl.NumberFormat(language === 'en' ? 'en-US' : language, { 
      style: 'currency', 
      currency: currencyMap[language] || 'USD'
    }).format(value);
  };

  const formatLocalDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : language);
  };

  // Generate chart data grouped by month
  const chartData = useMemo(() => {
    const expensesByMonth: Record<string, number> = {};
    
    // Sort expenses by date
    const sortedExpenses = [...expenses].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    sortedExpenses.forEach(expense => {
      const date = new Date(expense.date);
      const monthYear = format(date, 'MMM yyyy');
      
      if (!expensesByMonth[monthYear]) {
        expensesByMonth[monthYear] = 0;
      }
      
      expensesByMonth[monthYear] += expense.amount;
    });
    
    return Object.entries(expensesByMonth).map(([month, amount]) => ({
      month,
      amount
    }));
  }, [expenses]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full max-w-sm">
          <Input
            placeholder={t('expense.list.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                {t('expense.list.date_filter')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4" align="end">
              <div className="space-y-4">
                <h4 className="font-medium">{t('expense.list.date_filter')}</h4>
                <div className="space-y-2">
                  <p className="text-sm">{t('expense.list.start_date')}</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {startDate ? formatDate(startDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <p className="text-sm">{t('expense.list.end_date')}</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {endDate ? formatDate(endDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="sm" onClick={resetFilter}>
                    {t('expense.list.reset_filter')}
                  </Button>
                  <Button size="sm" onClick={applyDateFilter}>
                    {t('expense.list.apply_filter')}
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button onClick={openAddExpenseDialog}>
            <PlusCircle className="mr-2 h-4 w-4" /> {t('actions.newExpense')}
          </Button>
        </div>
      </div>

      {/* Expense History Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t('expense.list.history_chart')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" angle={-45} textAnchor="end" />
                <YAxis
                  tickFormatter={(value) => 
                    new Intl.NumberFormat(language, { 
                      notation: 'compact',
                      compactDisplay: 'short' 
                    }).format(value)
                  }
                />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value as number), t('expense.list.amount')]}
                  labelFormatter={(label) => label}
                />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('expense.list.title')}</CardTitle>
          <CardDescription>
            {t('expense.list.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-32">{t('expense.list.date')} <ArrowDownUp className="inline h-4 w-4" /></TableHead>
                  <TableHead>{t('expense.list.description_column')}</TableHead>
                  <TableHead>{t('expense.list.category')}</TableHead>
                  <TableHead className="text-right">{t('expense.list.amount')}</TableHead>
                  <TableHead className="w-24">{t('expense.list.recurring')}</TableHead>
                  <TableHead className="w-20 text-right">{t('expense.list.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.length > 0 ? (
                  filteredExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{formatLocalDate(expense.date)}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>{t(getCategoryTranslationKey(expense.category))}</TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(expense.amount)}
                      </TableCell>
                      <TableCell>
                        {expense.recurring ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {t('expense.list.yes')}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {t('expense.list.no')}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button size="icon" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      {t('expense.list.empty')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              {t('expense.list.count', { 
                count: filteredExpenses.length,
                plural: filteredExpenses.length !== 1 ? "s" : ""
              })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-muted-foreground">{t('expense.list.total')}</p>
            <p className="text-xl font-bold">{formatCurrency(totalExpenses)}</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ExpensesModule;
