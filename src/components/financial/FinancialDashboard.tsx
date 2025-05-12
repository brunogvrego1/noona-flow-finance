
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar, Legend } from "recharts";
import { useTranslation } from "@/hooks/useTranslation";

const cashFlowData = [
  { name: '01/05', revenue: 1200, expenses: 500, balance: 700 },
  { name: '08/05', revenue: 1900, expenses: 800, balance: 1100 },
  { name: '15/05', revenue: 3100, expenses: 1200, balance: 1900 },
  { name: '22/05', revenue: 2800, expenses: 1400, balance: 1400 },
  { name: '29/05', revenue: 3450, expenses: 950, balance: 2500 },
];

const revenueByServiceData = [
  { name: 'Corte', value: 4800 },
  { name: 'Coloração', value: 3200 },
  { name: 'Manicure', value: 1800 },
  { name: 'Tratamento', value: 2100 },
  { name: 'Outros', value: 550 },
];

const revenueByProfessionalData = [
  { name: 'Ana', revenue: 3800 },
  { name: 'Carlos', revenue: 2900 },
  { name: 'Júlia', revenue: 2400 },
  { name: 'Marcos', revenue: 1800 },
  { name: 'Patrícia', revenue: 1550 },
];

const projectionData = [
  { name: 'Hoje', actual: 1450, projected: 1450 },
  { name: '+7d', actual: 800, projected: 1300 },
  { name: '+14d', actual: 0, projected: 1650 },
  { name: '+21d', actual: 0, projected: 1200 },
  { name: '+28d', actual: 0, projected: 2100 },
];

const FinancialDashboard = () => {
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{t('summary.revenue')}</CardTitle>
            <CardDescription>{t('summary.title')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {formatCurrency(12450)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +18% {t('expense.list.description')}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{t('summary.expenses')}</CardTitle>
            <CardDescription>{t('summary.title')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {formatCurrency(4850)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              -3% {t('expense.list.description')}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{t('summary.balance')}</CardTitle>
            <CardDescription>{t('balance.current')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatCurrency(7600)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +32% {t('expense.list.description')}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="cashflow" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="cashflow">{t('balance.evolution')}</TabsTrigger>
          <TabsTrigger value="revenue">{t('summary.revenue')}</TabsTrigger>
          <TabsTrigger value="projections">{t('tabs.projections')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cashflow">
          <Card>
            <CardHeader>
              <CardTitle>{t('balance.evolution')}</CardTitle>
              <CardDescription>{t('balance.history')}</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-[300px]" config={{
                revenue: { label: t('summary.revenue') },
                expenses: { label: t('summary.expenses') },
                balance: { label: t('summary.balance') }
              }}>
                <AreaChart data={cashFlowData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRevenue)" />
                  <Area type="monotone" dataKey="expenses" stroke="#ef4444" fillOpacity={1} fill="url(#colorExpenses)" />
                  <Line type="monotone" dataKey="balance" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revenue">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('summary.revenue')} {t('expense.add.category')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[300px]" config={{
                  value: { label: t('expense.list.amount') }
                }}>
                  <BarChart data={revenueByServiceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('summary.revenue')} {t('expense.add.description')}</CardTitle>
                <CardDescription>Employee</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-[300px]" config={{
                  revenue: { label: t('summary.revenue') }
                }}>
                  <BarChart data={revenueByProfessionalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#82ca9d" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="projections">
          <Card>
            <CardHeader>
              <CardTitle>{t('tabs.projections')} {t('summary.revenue')}</CardTitle>
              <CardDescription>{t('balance.projection')}</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-[300px]" config={{
                actual: { label: t('balance.current') },
                projected: { label: t('balance.projection') }
              }}>
                <LineChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} dot={{ r: 5 }} />
                  <Line type="monotone" dataKey="projected" stroke="#6366f1" strokeDasharray="5 5" />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialDashboard;
