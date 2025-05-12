
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Mock data
const balanceHistoryData = [
  { date: "01/05", balance: 12500 },
  { date: "05/05", balance: 15200 },
  { date: "10/05", balance: 13800 },
  { date: "15/05", balance: 16400 },
  { date: "20/05", balance: 14900 },
  { date: "25/05", balance: 18100 },
  { date: "30/05", balance: 21300 },
  { date: "05/06", balance: 19800 },
  { date: "10/06", balance: 23500, projected: true },
  { date: "15/06", balance: 25200, projected: true },
  { date: "20/06", balance: 27800, projected: true },
  { date: "25/06", balance: 26400, projected: true },
];

const transactionsHistory = [
  { id: 1, date: "2025-05-30", type: "revenue", description: "Vendas do dia", amount: 2350.75 },
  { id: 2, date: "2025-05-29", type: "expense", description: "Fornecedor ABC", amount: 750.50 },
  { id: 3, date: "2025-05-28", type: "revenue", description: "Vendas do dia", amount: 1980.00 },
  { id: 4, date: "2025-05-28", type: "adjustment", description: "Ajuste de saldo", amount: 120.00 },
  { id: 5, date: "2025-05-27", type: "expense", description: "Pagamento funcionário", amount: 1500.00 },
  { id: 6, date: "2025-05-26", type: "revenue", description: "Vendas do dia", amount: 2180.50 },
  { id: 7, date: "2025-05-25", type: "expense", description: "Aluguel", amount: 2500.00 },
  { id: 8, date: "2025-05-24", type: "revenue", description: "Vendas do dia", amount: 1680.25 },
];

const BalanceModule = () => {
  const { toast } = useToast();
  const [isAdjustDialogOpen, setIsAdjustDialogOpen] = useState(false);
  const [adjustmentAmount, setAdjustmentAmount] = useState("");
  const [adjustmentReason, setAdjustmentReason] = useState("");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const handleAdjustBalance = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Update balance in the database in the future
    
    toast({
      title: "Saldo ajustado",
      description: `Ajuste de ${formatCurrency(Number(adjustmentAmount))} realizado com sucesso.`,
    });
    
    setAdjustmentAmount("");
    setAdjustmentReason("");
    setIsAdjustDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Saldo Atual</CardTitle>
            <CardDescription>Em caixa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatCurrency(21300)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Entradas Hoje</CardTitle>
            <CardDescription>12/05/2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {formatCurrency(2350.75)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Saídas Hoje</CardTitle>
            <CardDescription>12/05/2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {formatCurrency(750.50)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Projeção (30 dias)</CardTitle>
            <CardDescription>Saldo estimado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {formatCurrency(26400)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => setIsAdjustDialogOpen(true)}>
          Ajustar Saldo
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evolução do Saldo</CardTitle>
          <CardDescription>Histórico e projeção futura</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[400px]" config={{
            balance: { label: "Saldo" }
          }}>
            <LineChart data={balanceHistoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="balance" 
                stroke="#6366f1" 
                strokeWidth={2}
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  return payload.projected ? (
                    <svg x={cx - 5} y={cy - 5} width={10} height={10} fill="#6366f1" viewBox="0 0 10 10">
                      <circle r={4} cx={5} cy={5} fill="#6366f1" stroke="none" fillOpacity={0.6} />
                    </svg>
                  ) : (
                    <svg x={cx - 5} y={cy - 5} width={10} height={10} fill="#6366f1" viewBox="0 0 10 10">
                      <circle r={4} cx={5} cy={5} fill="#6366f1" stroke="none" />
                    </svg>
                  );
                }}
                strokeDasharray={(data) => data.projected ? "5 5" : "0"}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Transações</CardTitle>
          <CardDescription>Movimentações recentes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionsHistory.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      {transaction.type === "revenue" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Entrada
                        </span>
                      )}
                      {transaction.type === "expense" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Saída
                        </span>
                      )}
                      {transaction.type === "adjustment" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Ajuste
                        </span>
                      )}
                    </TableCell>
                    <TableCell className={`text-right font-medium ${
                      transaction.type === "revenue" 
                        ? "text-green-600" 
                        : transaction.type === "expense" 
                        ? "text-red-600" 
                        : ""
                    }`}>
                      {transaction.type === "revenue" ? "+" : "-"}{formatCurrency(transaction.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Adjust Balance Dialog */}
      <Dialog open={isAdjustDialogOpen} onOpenChange={setIsAdjustDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleAdjustBalance}>
            <DialogHeader>
              <DialogTitle>Ajustar Saldo</DialogTitle>
              <DialogDescription>
                Ajuste o saldo atual do caixa manualmente.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Valor do Ajuste (R$)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={adjustmentAmount}
                  onChange={(e) => setAdjustmentAmount(e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Use valores positivos para aumentar o saldo ou negativos para diminuir.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Motivo do Ajuste</Label>
                <Textarea
                  id="reason"
                  placeholder="Descreva o motivo deste ajuste"
                  value={adjustmentReason}
                  onChange={(e) => setAdjustmentReason(e.target.value)}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => setIsAdjustDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Confirmar Ajuste</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BalanceModule;
