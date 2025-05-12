
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FinancialDashboard from "@/components/financial/FinancialDashboard";
import ExpensesModule from "@/components/financial/ExpensesModule";
import ProjectionsModule from "@/components/financial/ProjectionsModule";
import BalanceModule from "@/components/financial/BalanceModule";
import { ArrowUpRight, PlusCircle } from "lucide-react";
import { useState } from "react";
import { AddExpenseDialog } from "@/components/financial/AddExpenseDialog";
import { useTranslation } from "@/hooks/useTranslation";
import { LanguageSelector } from "@/components/ui/language-selector";

const Index = () => {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const { t, language } = useTranslation();

  const formatCurrency = (value: number) => {
    let currencyCode = 'BRL';
    if (language === 'en') currencyCode = 'USD';
    else if (language === 'pt-PT') currencyCode = 'EUR';
    else if (language === 'cs') currencyCode = 'CZK';
    else if (language === 'is') currencyCode = 'ISK';
    
    return new Intl.NumberFormat(language, { style: 'currency', currency: currencyCode }).format(value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('header.title')}</h1>
          <p className="text-muted-foreground mt-2">
            {t('header.subtitle')}
          </p>
        </div>
        <LanguageSelector />
      </header>

      <div className="flex flex-col-reverse md:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="dashboard">{t('tabs.dashboard')}</TabsTrigger>
              <TabsTrigger value="expenses">{t('tabs.expenses')}</TabsTrigger>
              <TabsTrigger value="projections">{t('tabs.projections')}</TabsTrigger>
              <TabsTrigger value="balance">{t('tabs.balance')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <FinancialDashboard />
            </TabsContent>
            
            <TabsContent value="expenses">
              <ExpensesModule openAddExpenseDialog={() => setIsAddExpenseOpen(true)} />
            </TabsContent>
            
            <TabsContent value="projections">
              <ProjectionsModule />
            </TabsContent>
            
            <TabsContent value="balance">
              <BalanceModule />
            </TabsContent>
          </Tabs>
        </div>

        {/* Side Panel */}
        <div className="w-full md:w-80">
          <Card>
            <CardHeader>
              <CardTitle>{t('actions.quickActions')}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button 
                onClick={() => setIsAddExpenseOpen(true)} 
                className="w-full justify-between"
              >
                {t('actions.newExpense')} <PlusCircle size={16} />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                {t('expense.add.description')} <ArrowUpRight size={16} />
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>{t('summary.title')}</CardTitle>
              <CardDescription>Maio 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">{t('summary.revenue')}</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(12450)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">{t('summary.expenses')}</p>
                  <p className="text-2xl font-bold text-red-600">{formatCurrency(4850)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">{t('summary.balance')}</p>
                  <p className="text-2xl font-bold">{formatCurrency(7600)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AddExpenseDialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen} />
    </div>
  );
};

export default Index;
