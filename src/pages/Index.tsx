
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

const Index = () => {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Financeiro Noona HQ</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie suas finanças com facilidade e integração completa
        </p>
      </header>

      <div className="flex flex-col-reverse md:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="expenses">Despesas</TabsTrigger>
              <TabsTrigger value="projections">Projeções</TabsTrigger>
              <TabsTrigger value="balance">Saldo</TabsTrigger>
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
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button 
                onClick={() => setIsAddExpenseOpen(true)} 
                className="w-full justify-between"
              >
                Nova Despesa <PlusCircle size={16} />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                Ajustar Saldo <ArrowUpRight size={16} />
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Resumo do Mês</CardTitle>
              <CardDescription>Maio 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Receita</p>
                  <p className="text-2xl font-bold text-green-600">R$ 12.450,00</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Despesas</p>
                  <p className="text-2xl font-bold text-red-600">R$ 4.850,00</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Saldo</p>
                  <p className="text-2xl font-bold">R$ 7.600,00</p>
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
