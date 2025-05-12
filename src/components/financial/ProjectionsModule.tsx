import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";

// Mock data base
const allProjectionData = [
  { date: "13/05", confirmed: 1250, projected: 1250 },
  { date: "14/05", confirmed: 950, projected: 950 },
  { date: "15/05", confirmed: 850, projected: 850 },
  { date: "16/05", confirmed: 1100, projected: 1100 },
  { date: "17/05", confirmed: 1350, projected: 1350 },
  { date: "18/05", confirmed: 450, projected: 450 },
  { date: "19/05", confirmed: 0, projected: 980 },
  { date: "20/05", confirmed: 0, projected: 1050 },
  { date: "21/05", confirmed: 0, projected: 1150 },
  { date: "22/05", confirmed: 0, projected: 1300 },
  { date: "23/05", confirmed: 0, projected: 950 },
  { date: "24/05", confirmed: 0, projected: 870 },
  { date: "25/05", confirmed: 0, projected: 500 },
  { date: "26/05", confirmed: 0, projected: 1100 },
  { date: "27/05", confirmed: 0, projected: 1250 },
  { date: "28/05", confirmed: 0, projected: 1050 },
  { date: "29/05", confirmed: 0, projected: 950 },
  { date: "30/05", confirmed: 0, projected: 1200 },
  { date: "31/05", confirmed: 0, projected: 1300 },
  { date: "01/06", confirmed: 0, projected: 1400 },
  { date: "02/06", confirmed: 0, projected: 850 },
  { date: "03/06", confirmed: 0, projected: 750 },
  { date: "04/06", confirmed: 0, projected: 1100 },
  { date: "05/06", confirmed: 0, projected: 1250 },
  { date: "06/06", confirmed: 0, projected: 950 },
  { date: "07/06", confirmed: 0, projected: 1300 },
  { date: "08/06", confirmed: 0, projected: 1450 },
  { date: "09/06", confirmed: 0, projected: 1200 },
  { date: "10/06", confirmed: 0, projected: 980 },
  { date: "11/06", confirmed: 0, projected: 1050 },
  { date: "12/06", confirmed: 0, projected: 1150 },
];

// Projections per service data organized by professional
const projectionsPerServiceByProfessional = {
  all: [
    { name: "Corte", projected: 4500 },
    { name: "Coloração", projected: 3200 },
    { name: "Manicure", projected: 2100 },
    { name: "Depilação", projected: 1800 },
    { name: "Outros", projected: 1200 },
  ],
  ana: [
    { name: "Corte", projected: 2200 },
    { name: "Coloração", projected: 1100 },
    { name: "Manicure", projected: 250 },
    { name: "Depilação", projected: 200 },
    { name: "Outros", projected: 100 },
  ],
  carlos: [
    { name: "Corte", projected: 1800 },
    { name: "Coloração", projected: 950 },
    { name: "Manicure", projected: 50 },
    { name: "Depilação", projected: 100 },
    { name: "Outros", projected: 80 },
  ],
  julia: [
    { name: "Corte", projected: 350 },
    { name: "Coloração", projected: 200 },
    { name: "Manicure", projected: 1150 },
    { name: "Depilação", projected: 500 },
    { name: "Outros", projected: 150 },
  ],
  marcos: [
    { name: "Corte", projected: 0 },
    { name: "Coloração", projected: 950 },
    { name: "Manicure", projected: 100 },
    { name: "Depilação", projected: 750 },
    { name: "Outros", projected: 150 },
  ],
  patricia: [
    { name: "Corte", projected: 150 },
    { name: "Coloração", projected: 0 },
    { name: "Manicure", projected: 550 },
    { name: "Depilação", projected: 250 },
    { name: "Outros", projected: 720 },
  ],
};

// Projections per professional data
const allProjectionsPerProfessional = [
  { name: "Ana", projected: 3850 },
  { name: "Carlos", projected: 2980 },
  { name: "Júlia", projected: 2350 },
  { name: "Marcos", projected: 1950 },
  { name: "Patrícia", projected: 1670 },
];

const ProjectionsModule = () => {
  const { t, language } = useTranslation();
  const [cancellationRate, setCancellationRate] = useState(10);
  const [timeFrame, setTimeFrame] = useState("15days");
  const [professional, setProfessional] = useState("all");
  const [projectionData, setProjectionData] = useState<typeof allProjectionData>([]);
  const [projectionsPerService, setProjectionsPerService] = useState(projectionsPerServiceByProfessional.all);
  const [projectionsPerProfessional, setProjectionsPerProfessional] = useState(allProjectionsPerProfessional);

  // Apply timeframe filter and load initial data
  useEffect(() => {
    // Filter data based on timeframe
    let daysToShow = 15;
    if (timeFrame === "7days") daysToShow = 7;
    if (timeFrame === "30days") daysToShow = 30;
    
    // Get first X days from the data
    setProjectionData(allProjectionData.slice(0, daysToShow));
  }, [timeFrame]);

  // Apply professional filter
  useEffect(() => {
    // Update services data based on selected professional
    if (professional in projectionsPerServiceByProfessional) {
      setProjectionsPerService(projectionsPerServiceByProfessional[professional as keyof typeof projectionsPerServiceByProfessional]);
    }

    // For the professionals chart, show all professionals or filter it out if a specific professional is selected
    if (professional === "all") {
      setProjectionsPerProfessional(allProjectionsPerProfessional);
    } else {
      // Show only the selected professional
      setProjectionsPerProfessional(
        allProjectionsPerProfessional.filter(p => 
          p.name.toLowerCase() === professional || 
          professional === 'all'
        )
      );
    }
  }, [professional]);

  // Apply cancellation rate to projections
  const adjustedProjectionData = projectionData.map(item => ({
    ...item,
    projectedAdjusted: item.projected * (1 - cancellationRate / 100)
  }));

  const formatCurrency = (value: number) => {
    let currencyCode = 'BRL';
    if (language === 'en') currencyCode = 'USD';
    else if (language === 'pt-PT') currencyCode = 'EUR';
    else if (language === 'cs') currencyCode = 'CZK';
    else if (language === 'is') currencyCode = 'ISK';
    
    return new Intl.NumberFormat(language, { style: 'currency', currency: currencyCode }).format(value);
  };

  // Calculate totals based on the filtered data
  const totalConfirmed = projectionData.reduce((sum, item) => sum + item.confirmed, 0);
  const totalProjected = projectionData.reduce((sum, item) => sum + item.projected, 0);
  const totalProjectedAdjusted = totalProjected * (1 - cancellationRate / 100);

  const getTimeFrameLabel = () => {
    switch (timeFrame) {
      case "7days": 
        return t('balance.projection').replace('30', '7'); // Reuse existing translation but replace days
      case "15days": 
        return t('balance.projection').replace('30', '15');
      case "30days": 
        return t('balance.projection');
      default: 
        return t('balance.projection');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{t('balance.current')}</CardTitle>
            <CardDescription>
              {timeFrame === "7days" && t('balance.projection').replace('30', '7')}
              {timeFrame === "15days" && t('balance.projection').replace('30', '15')}
              {timeFrame === "30days" && t('balance.projection')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {formatCurrency(totalConfirmed)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{t('balance.projection')}</CardTitle>
            <CardDescription>{t('expense.list.total')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatCurrency(totalProjected)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{t('balance.projection')}</CardTitle>
            <CardDescription>{t('balance.adjust.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {formatCurrency(totalProjectedAdjusted)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('tabs.projections')}</CardTitle>
          <CardDescription>{t('balance.adjust.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="timeframe">{t('expense.add.date')}</Label>
              <Select value={timeFrame} onValueChange={setTimeFrame}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">7 {t('expense.add.date')}</SelectItem>
                  <SelectItem value="15days">15 {t('expense.add.date')}</SelectItem>
                  <SelectItem value="30days">30 {t('expense.add.date')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="professional">{t('expense.add.category')}</Label>
              <Select value={professional} onValueChange={setProfessional}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('expense.list.total')}</SelectItem>
                  <SelectItem value="ana">Ana</SelectItem>
                  <SelectItem value="carlos">Carlos</SelectItem>
                  <SelectItem value="julia">Júlia</SelectItem>
                  <SelectItem value="marcos">Marcos</SelectItem>
                  <SelectItem value="patricia">Patrícia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="cancellation">{t('balance.adjust.amount')}: {cancellationRate}%</Label>
              </div>
              <Slider
                id="cancellation"
                min={0}
                max={50}
                step={1}
                value={[cancellationRate]}
                onValueChange={(values) => setCancellationRate(values[0])}
              />
              <Button className="w-full mt-2" size="sm">{t('balance.adjust.confirm')}</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="timeline">{t('balance.history')}</TabsTrigger>
          <TabsTrigger value="services">{t('expense.add.category')}</TabsTrigger>
          <TabsTrigger value="professionals">{t('expense.add.description')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>{t('balance.projection')}</CardTitle>
              <CardDescription>
                {professional === "all" 
                  ? t('balance.transactions') 
                  : `${t('balance.projection')} - ${professional.charAt(0).toUpperCase() + professional.slice(1)}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-[400px]" config={{
                confirmed: { label: t('balance.current') },
                projected: { label: t('balance.projection') },
                projectedAdjusted: { label: `${t('balance.projection')} (${t('balance.adjust.amount')})` }
              }}>
                <LineChart data={adjustedProjectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="confirmed" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                    dot={{ r: 5 }} 
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="projected" 
                    stroke="#6366f1" 
                    strokeDasharray="5 5"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="projectedAdjusted" 
                    stroke="#f59e0b" 
                    strokeDasharray="3 3"
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>{t('balance.projection')} {t('expense.add.category')}</CardTitle>
              <CardDescription>
                {professional === "all" 
                  ? t('summary.revenue') 
                  : `${t('summary.revenue')}: ${professional.charAt(0).toUpperCase() + professional.slice(1)}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-[400px]" config={{
                projected: { label: t('balance.projection') }
              }}>
                <BarChart data={projectionsPerService}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                  <Bar dataKey="projected" fill="#8884d8" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="professionals">
          <Card>
            <CardHeader>
              <CardTitle>{t('balance.projection')} {t('expense.add.description')}</CardTitle>
              <CardDescription>
                {timeFrame === "7days" && t('balance.projection').replace('30', '7')}
                {timeFrame === "15days" && t('balance.projection').replace('30', '15')}
                {timeFrame === "30days" && t('balance.projection')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-[400px]" config={{
                projected: { label: t('balance.projection') }
              }}>
                <BarChart data={projectionsPerProfessional}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                  <Bar dataKey="projected" fill="#82ca9d" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectionsModule;
