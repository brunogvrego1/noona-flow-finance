
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";

interface AddExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddExpenseDialog({ open, onOpenChange }: AddExpenseDialogProps) {
  const { toast } = useToast();
  const { t, language } = useTranslation();
  const [expenseData, setExpenseData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: "",
    amount: "",
    category: "",
    recurring: false,
  });

  // Get translated categories
  const categories = [
    { key: "Fixo", translationKey: "expense.categories.fixed" },
    { key: "Insumos", translationKey: "expense.categories.supplies" },
    { key: "Marketing", translationKey: "expense.categories.marketing" },
    { key: "Manutenção", translationKey: "expense.categories.maintenance" },
    { key: "Utilidades", translationKey: "expense.categories.utilities" },
    { key: "Salários", translationKey: "expense.categories.salaries" },
    { key: "Impostos", translationKey: "expense.categories.taxes" },
    { key: "Outros", translationKey: "expense.categories.others" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Add expense to database in the future
    
    // Get currency symbol based on language
    const currencySymbol = language === 'pt-BR' ? 'R$' : 
                          language === 'pt-PT' ? '€' : 
                          language === 'en' ? '$' : 
                          language === 'cs' ? 'Kč' : 'kr';
    
    toast({
      title: t('expense.add.title'),
      description: `${expenseData.description} - ${currencySymbol} ${expenseData.amount}`,
    });
    
    // Reset form
    setExpenseData({
      date: new Date().toISOString().split('T')[0],
      description: "",
      amount: "",
      category: "",
      recurring: false,
    });
    
    onOpenChange(false);
  };
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setExpenseData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{t('expense.add.title')}</DialogTitle>
            <DialogDescription>
              {t('expense.add.description')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">{t('expense.add.date')}</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={expenseData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">{t('expense.add.amount')}</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={expenseData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{t('expense.add.description_label')}</Label>
              <Input
                id="description"
                name="description"
                placeholder={t('expense.add.description_label')}
                value={expenseData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">{t('expense.add.category')}</Label>
              <Select
                value={expenseData.category}
                onValueChange={(value) =>
                  setExpenseData((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder={t('expense.add.category_placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.key} value={category.key}>
                      {t(category.translationKey)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">{t('expense.add.notes')}</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder={t('expense.add.notes_placeholder')}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="recurring"
                checked={expenseData.recurring}
                onCheckedChange={(checked) =>
                  setExpenseData((prev) => ({ ...prev, recurring: checked }))
                }
              />
              <Label htmlFor="recurring">{t('expense.add.recurring')}</Label>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => onOpenChange(false)}
            >
              {t('expense.add.cancel')}
            </Button>
            <Button type="submit">{t('expense.add.add')}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
