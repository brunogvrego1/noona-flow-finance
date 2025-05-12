
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash, Edit, ArrowDownUp } from "lucide-react";

// Mock expense data
const initialExpenses = [
  { id: 1, date: "2025-05-01", description: "Aluguel", category: "Fixo", amount: 2500.00, recurring: true },
  { id: 2, date: "2025-05-03", description: "Produtos de Cabelo", category: "Insumos", amount: 750.50, recurring: false },
  { id: 3, date: "2025-05-05", description: "Água", category: "Utilidades", amount: 120.00, recurring: true },
  { id: 4, date: "2025-05-08", description: "Luz", category: "Utilidades", amount: 380.00, recurring: true },
  { id: 5, date: "2025-05-10", description: "Marketing Digital", category: "Marketing", amount: 300.00, recurring: true },
  { id: 6, date: "2025-05-15", description: "Manutenção Equipamentos", category: "Manutenção", amount: 250.00, recurring: false },
  { id: 7, date: "2025-05-20", description: "Material de Limpeza", category: "Insumos", amount: 180.00, recurring: false },
  { id: 8, date: "2025-05-25", description: "Internet", category: "Utilidades", amount: 120.00, recurring: true },
];

interface ExpensesModuleProps {
  openAddExpenseDialog: () => void;
}

const ExpensesModule = ({ openAddExpenseDialog }: ExpensesModuleProps) => {
  const [expenses] = useState(initialExpenses);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExpenses = expenses.filter(expense =>
    expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full max-w-sm">
          <Input
            placeholder="Pesquisar despesas..."
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
        <Button onClick={openAddExpenseDialog}>
          <PlusCircle className="mr-2 h-4 w-4" /> Nova Despesa
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Despesas</CardTitle>
          <CardDescription>
            Gerenciamento de todas as despesas do seu negócio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-32">Data <ArrowDownUp className="inline h-4 w-4" /></TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead className="w-24">Recorrente</TableHead>
                  <TableHead className="w-20 text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.length > 0 ? (
                  filteredExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{formatDate(expense.date)}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(expense.amount)}
                      </TableCell>
                      <TableCell>
                        {expense.recurring ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Sim
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Não
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
                      Nenhuma despesa encontrada
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
              {filteredExpenses.length} despesa{filteredExpenses.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-muted-foreground">Total</p>
            <p className="text-xl font-bold">{formatCurrency(totalExpenses)}</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ExpensesModule;
