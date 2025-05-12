
export type Language = 'pt-BR' | 'pt-PT' | 'en' | 'cs' | 'is';

export type TranslationKey = 
  | 'header.title'
  | 'header.subtitle'
  | 'tabs.dashboard'
  | 'tabs.expenses'
  | 'tabs.projections'
  | 'tabs.balance'
  | 'actions.quickActions'
  | 'actions.newExpense'
  | 'actions.adjustBalance'
  | 'summary.title'
  | 'summary.revenue'
  | 'summary.expenses'
  | 'summary.balance'
  | 'expense.add.title'
  | 'expense.add.description'
  | 'expense.add.date'
  | 'expense.add.amount'
  | 'expense.add.description_label'
  | 'expense.add.category'
  | 'expense.add.category_placeholder'
  | 'expense.add.notes'
  | 'expense.add.notes_placeholder'
  | 'expense.add.recurring'
  | 'expense.add.cancel'
  | 'expense.add.add'
  | 'expense.list.title'
  | 'expense.list.description'
  | 'expense.list.date'
  | 'expense.list.description_column'
  | 'expense.list.category'
  | 'expense.list.amount'
  | 'expense.list.recurring'
  | 'expense.list.actions'
  | 'expense.list.search'
  | 'expense.list.empty'
  | 'expense.list.count'
  | 'expense.list.total'
  | 'expense.list.yes'
  | 'expense.list.no'
  | 'balance.current'
  | 'balance.cashIn'
  | 'balance.cashOut'
  | 'balance.projection'
  | 'balance.evolution'
  | 'balance.history'
  | 'balance.transactions'
  | 'balance.transactions_description'
  | 'balance.type.revenue'
  | 'balance.type.expense'
  | 'balance.type.adjustment'
  | 'balance.adjust.title'
  | 'balance.adjust.description'
  | 'balance.adjust.amount'
  | 'balance.adjust.amount_help'
  | 'balance.adjust.reason'
  | 'balance.adjust.reason_placeholder'
  | 'balance.adjust.cancel'
  | 'balance.adjust.confirm'
  | 'common.cancel'
  | 'common.confirm'
  | 'language.select';

export interface TranslationDictionary {
  [key in TranslationKey]: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  'pt-BR': {
    'header.title': 'Financeiro Noona HQ',
    'header.subtitle': 'Gerencie suas finanças com facilidade e integração completa',
    'tabs.dashboard': 'Dashboard',
    'tabs.expenses': 'Despesas',
    'tabs.projections': 'Projeções',
    'tabs.balance': 'Saldo',
    'actions.quickActions': 'Ações Rápidas',
    'actions.newExpense': 'Nova Despesa',
    'actions.adjustBalance': 'Ajustar Saldo',
    'summary.title': 'Resumo do Mês',
    'summary.revenue': 'Receita',
    'summary.expenses': 'Despesas',
    'summary.balance': 'Saldo',
    'expense.add.title': 'Adicionar Nova Despesa',
    'expense.add.description': 'Preencha os detalhes da despesa para adicionar ao sistema.',
    'expense.add.date': 'Data',
    'expense.add.amount': 'Valor (R$)',
    'expense.add.description_label': 'Descrição',
    'expense.add.category': 'Categoria',
    'expense.add.category_placeholder': 'Selecione uma categoria',
    'expense.add.notes': 'Notas (opcional)',
    'expense.add.notes_placeholder': 'Informações adicionais sobre esta despesa',
    'expense.add.recurring': 'Despesa recorrente mensal',
    'expense.add.cancel': 'Cancelar',
    'expense.add.add': 'Adicionar Despesa',
    'expense.list.title': 'Despesas',
    'expense.list.description': 'Gerenciamento de todas as despesas do seu negócio',
    'expense.list.date': 'Data',
    'expense.list.description_column': 'Descrição',
    'expense.list.category': 'Categoria',
    'expense.list.amount': 'Valor',
    'expense.list.recurring': 'Recorrente',
    'expense.list.actions': 'Ações',
    'expense.list.search': 'Pesquisar despesas...',
    'expense.list.empty': 'Nenhuma despesa encontrada',
    'expense.list.count': '{count} despesa{plural}',
    'expense.list.total': 'Total',
    'expense.list.yes': 'Sim',
    'expense.list.no': 'Não',
    'balance.current': 'Saldo Atual',
    'balance.cashIn': 'Entradas Hoje',
    'balance.cashOut': 'Saídas Hoje',
    'balance.projection': 'Projeção (30 dias)',
    'balance.evolution': 'Evolução do Saldo',
    'balance.history': 'Histórico e projeção futura',
    'balance.transactions': 'Histórico de Transações',
    'balance.transactions_description': 'Movimentações recentes',
    'balance.type.revenue': 'Entrada',
    'balance.type.expense': 'Saída',
    'balance.type.adjustment': 'Ajuste',
    'balance.adjust.title': 'Ajustar Saldo',
    'balance.adjust.description': 'Ajuste o saldo atual do caixa manualmente.',
    'balance.adjust.amount': 'Valor do Ajuste (R$)',
    'balance.adjust.amount_help': 'Use valores positivos para aumentar o saldo ou negativos para diminuir.',
    'balance.adjust.reason': 'Motivo do Ajuste',
    'balance.adjust.reason_placeholder': 'Descreva o motivo deste ajuste',
    'balance.adjust.cancel': 'Cancelar',
    'balance.adjust.confirm': 'Confirmar Ajuste',
    'common.cancel': 'Cancelar',
    'common.confirm': 'Confirmar',
    'language.select': 'Idioma'
  },
  'pt-PT': {
    'header.title': 'Financeiro Noona HQ',
    'header.subtitle': 'Gerencie as suas finanças com facilidade e integração completa',
    'tabs.dashboard': 'Painel',
    'tabs.expenses': 'Despesas',
    'tabs.projections': 'Projeções',
    'tabs.balance': 'Saldo',
    'actions.quickActions': 'Ações Rápidas',
    'actions.newExpense': 'Nova Despesa',
    'actions.adjustBalance': 'Ajustar Saldo',
    'summary.title': 'Resumo do Mês',
    'summary.revenue': 'Receita',
    'summary.expenses': 'Despesas',
    'summary.balance': 'Saldo',
    'expense.add.title': 'Adicionar Nova Despesa',
    'expense.add.description': 'Preencha os detalhes da despesa para adicionar ao sistema.',
    'expense.add.date': 'Data',
    'expense.add.amount': 'Valor (€)',
    'expense.add.description_label': 'Descrição',
    'expense.add.category': 'Categoria',
    'expense.add.category_placeholder': 'Selecione uma categoria',
    'expense.add.notes': 'Notas (opcional)',
    'expense.add.notes_placeholder': 'Informações adicionais sobre esta despesa',
    'expense.add.recurring': 'Despesa recorrente mensal',
    'expense.add.cancel': 'Cancelar',
    'expense.add.add': 'Adicionar Despesa',
    'expense.list.title': 'Despesas',
    'expense.list.description': 'Gestão de todas as despesas do seu negócio',
    'expense.list.date': 'Data',
    'expense.list.description_column': 'Descrição',
    'expense.list.category': 'Categoria',
    'expense.list.amount': 'Valor',
    'expense.list.recurring': 'Recorrente',
    'expense.list.actions': 'Ações',
    'expense.list.search': 'Pesquisar despesas...',
    'expense.list.empty': 'Nenhuma despesa encontrada',
    'expense.list.count': '{count} despesa{plural}',
    'expense.list.total': 'Total',
    'expense.list.yes': 'Sim',
    'expense.list.no': 'Não',
    'balance.current': 'Saldo Atual',
    'balance.cashIn': 'Entradas Hoje',
    'balance.cashOut': 'Saídas Hoje',
    'balance.projection': 'Projeção (30 dias)',
    'balance.evolution': 'Evolução do Saldo',
    'balance.history': 'Histórico e projeção futura',
    'balance.transactions': 'Histórico de Transações',
    'balance.transactions_description': 'Movimentações recentes',
    'balance.type.revenue': 'Entrada',
    'balance.type.expense': 'Saída',
    'balance.type.adjustment': 'Ajuste',
    'balance.adjust.title': 'Ajustar Saldo',
    'balance.adjust.description': 'Ajuste o saldo atual do caixa manualmente.',
    'balance.adjust.amount': 'Valor do Ajuste (€)',
    'balance.adjust.amount_help': 'Use valores positivos para aumentar o saldo ou negativos para diminuir.',
    'balance.adjust.reason': 'Motivo do Ajuste',
    'balance.adjust.reason_placeholder': 'Descreva o motivo deste ajuste',
    'balance.adjust.cancel': 'Cancelar',
    'balance.adjust.confirm': 'Confirmar Ajuste',
    'common.cancel': 'Cancelar',
    'common.confirm': 'Confirmar',
    'language.select': 'Idioma'
  },
  'en': {
    'header.title': 'Noona HQ Financial',
    'header.subtitle': 'Manage your finances with ease and complete integration',
    'tabs.dashboard': 'Dashboard',
    'tabs.expenses': 'Expenses',
    'tabs.projections': 'Projections',
    'tabs.balance': 'Balance',
    'actions.quickActions': 'Quick Actions',
    'actions.newExpense': 'New Expense',
    'actions.adjustBalance': 'Adjust Balance',
    'summary.title': 'Month Summary',
    'summary.revenue': 'Revenue',
    'summary.expenses': 'Expenses',
    'summary.balance': 'Balance',
    'expense.add.title': 'Add New Expense',
    'expense.add.description': 'Fill in the expense details to add to the system.',
    'expense.add.date': 'Date',
    'expense.add.amount': 'Amount ($)',
    'expense.add.description_label': 'Description',
    'expense.add.category': 'Category',
    'expense.add.category_placeholder': 'Select a category',
    'expense.add.notes': 'Notes (optional)',
    'expense.add.notes_placeholder': 'Additional information about this expense',
    'expense.add.recurring': 'Monthly recurring expense',
    'expense.add.cancel': 'Cancel',
    'expense.add.add': 'Add Expense',
    'expense.list.title': 'Expenses',
    'expense.list.description': 'Management of all expenses for your business',
    'expense.list.date': 'Date',
    'expense.list.description_column': 'Description',
    'expense.list.category': 'Category',
    'expense.list.amount': 'Amount',
    'expense.list.recurring': 'Recurring',
    'expense.list.actions': 'Actions',
    'expense.list.search': 'Search expenses...',
    'expense.list.empty': 'No expenses found',
    'expense.list.count': '{count} expense{plural}',
    'expense.list.total': 'Total',
    'expense.list.yes': 'Yes',
    'expense.list.no': 'No',
    'balance.current': 'Current Balance',
    'balance.cashIn': 'Today\'s Income',
    'balance.cashOut': 'Today\'s Expenses',
    'balance.projection': 'Projection (30 days)',
    'balance.evolution': 'Balance Evolution',
    'balance.history': 'History and future projection',
    'balance.transactions': 'Transaction History',
    'balance.transactions_description': 'Recent movements',
    'balance.type.revenue': 'Income',
    'balance.type.expense': 'Expense',
    'balance.type.adjustment': 'Adjustment',
    'balance.adjust.title': 'Adjust Balance',
    'balance.adjust.description': 'Manually adjust the current cash balance.',
    'balance.adjust.amount': 'Adjustment Amount ($)',
    'balance.adjust.amount_help': 'Use positive values to increase or negative values to decrease the balance.',
    'balance.adjust.reason': 'Adjustment Reason',
    'balance.adjust.reason_placeholder': 'Describe the reason for this adjustment',
    'balance.adjust.cancel': 'Cancel',
    'balance.adjust.confirm': 'Confirm Adjustment',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'language.select': 'Language'
  },
  'cs': {
    'header.title': 'Noona HQ Finance',
    'header.subtitle': 'Spravujte své finance snadno a s kompletní integrací',
    'tabs.dashboard': 'Přehled',
    'tabs.expenses': 'Výdaje',
    'tabs.projections': 'Projekce',
    'tabs.balance': 'Zůstatek',
    'actions.quickActions': 'Rychlé akce',
    'actions.newExpense': 'Nový výdaj',
    'actions.adjustBalance': 'Upravit zůstatek',
    'summary.title': 'Měsíční souhrn',
    'summary.revenue': 'Příjmy',
    'summary.expenses': 'Výdaje',
    'summary.balance': 'Zůstatek',
    'expense.add.title': 'Přidat nový výdaj',
    'expense.add.description': 'Vyplňte detaily výdaje pro přidání do systému.',
    'expense.add.date': 'Datum',
    'expense.add.amount': 'Částka (Kč)',
    'expense.add.description_label': 'Popis',
    'expense.add.category': 'Kategorie',
    'expense.add.category_placeholder': 'Vyberte kategorii',
    'expense.add.notes': 'Poznámky (volitelné)',
    'expense.add.notes_placeholder': 'Další informace o tomto výdaji',
    'expense.add.recurring': 'Měsíční opakující se výdaj',
    'expense.add.cancel': 'Zrušit',
    'expense.add.add': 'Přidat výdaj',
    'expense.list.title': 'Výdaje',
    'expense.list.description': 'Správa všech výdajů vašeho podnikání',
    'expense.list.date': 'Datum',
    'expense.list.description_column': 'Popis',
    'expense.list.category': 'Kategorie',
    'expense.list.amount': 'Částka',
    'expense.list.recurring': 'Opakující se',
    'expense.list.actions': 'Akce',
    'expense.list.search': 'Hledat výdaje...',
    'expense.list.empty': 'Žádné výdaje nenalezeny',
    'expense.list.count': '{count} výdaj{plural}',
    'expense.list.total': 'Celkem',
    'expense.list.yes': 'Ano',
    'expense.list.no': 'Ne',
    'balance.current': 'Aktuální zůstatek',
    'balance.cashIn': 'Dnešní příjmy',
    'balance.cashOut': 'Dnešní výdaje',
    'balance.projection': 'Projekce (30 dní)',
    'balance.evolution': 'Vývoj zůstatku',
    'balance.history': 'Historie a budoucí projekce',
    'balance.transactions': 'Historie transakcí',
    'balance.transactions_description': 'Nedávné pohyby',
    'balance.type.revenue': 'Příjem',
    'balance.type.expense': 'Výdaj',
    'balance.type.adjustment': 'Úprava',
    'balance.adjust.title': 'Upravit zůstatek',
    'balance.adjust.description': 'Ručně upravit aktuální zůstatek v pokladně.',
    'balance.adjust.amount': 'Částka úpravy (Kč)',
    'balance.adjust.amount_help': 'Použijte kladné hodnoty pro zvýšení nebo záporné pro snížení zůstatku.',
    'balance.adjust.reason': 'Důvod úpravy',
    'balance.adjust.reason_placeholder': 'Popište důvod této úpravy',
    'balance.adjust.cancel': 'Zrušit',
    'balance.adjust.confirm': 'Potvrdit úpravu',
    'common.cancel': 'Zrušit',
    'common.confirm': 'Potvrdit',
    'language.select': 'Jazyk'
  },
  'is': {
    'header.title': 'Noona HQ Fjármál',
    'header.subtitle': 'Stjórnaðu fjármálum þínum auðveldlega með fullkominni samþættingu',
    'tabs.dashboard': 'Yfirlitsskjár',
    'tabs.expenses': 'Útgjöld',
    'tabs.projections': 'Spár',
    'tabs.balance': 'Staða',
    'actions.quickActions': 'Flýtiaðgerðir',
    'actions.newExpense': 'Ný útgjöld',
    'actions.adjustBalance': 'Aðlaga stöðu',
    'summary.title': 'Mánaðarlegt yfirlit',
    'summary.revenue': 'Tekjur',
    'summary.expenses': 'Útgjöld',
    'summary.balance': 'Staða',
    'expense.add.title': 'Bæta við nýjum útgjöldum',
    'expense.add.description': 'Fylltu út upplýsingar um útgjöld til að bæta við kerfið.',
    'expense.add.date': 'Dagsetning',
    'expense.add.amount': 'Upphæð (kr)',
    'expense.add.description_label': 'Lýsing',
    'expense.add.category': 'Flokkur',
    'expense.add.category_placeholder': 'Veldu flokk',
    'expense.add.notes': 'Athugasemdir (valfrjálst)',
    'expense.add.notes_placeholder': 'Viðbótarupplýsingar um þessi útgjöld',
    'expense.add.recurring': 'Mánaðarleg endurtekin útgjöld',
    'expense.add.cancel': 'Hætta við',
    'expense.add.add': 'Bæta við útgjöldum',
    'expense.list.title': 'Útgjöld',
    'expense.list.description': 'Stjórnun allra útgjalda fyrir fyrirtækið þitt',
    'expense.list.date': 'Dagsetning',
    'expense.list.description_column': 'Lýsing',
    'expense.list.category': 'Flokkur',
    'expense.list.amount': 'Upphæð',
    'expense.list.recurring': 'Endurtekið',
    'expense.list.actions': 'Aðgerðir',
    'expense.list.search': 'Leita að útgjöldum...',
    'expense.list.empty': 'Engin útgjöld fundust',
    'expense.list.count': '{count} útgjöld',
    'expense.list.total': 'Samtals',
    'expense.list.yes': 'Já',
    'expense.list.no': 'Nei',
    'balance.current': 'Núverandi staða',
    'balance.cashIn': 'Innkoma dagsins',
    'balance.cashOut': 'Útgjöld dagsins',
    'balance.projection': 'Spá (30 dagar)',
    'balance.evolution': 'Þróun stöðu',
    'balance.history': 'Saga og framtíðarspá',
    'balance.transactions': 'Færslusaga',
    'balance.transactions_description': 'Nýlegar hreyfingar',
    'balance.type.revenue': 'Innkoma',
    'balance.type.expense': 'Útgjöld',
    'balance.type.adjustment': 'Aðlögun',
    'balance.adjust.title': 'Aðlaga stöðu',
    'balance.adjust.description': 'Aðlagaðu núverandi sjóðsstöðu handvirkt.',
    'balance.adjust.amount': 'Aðlögunarupphæð (kr)',
    'balance.adjust.amount_help': 'Notaðu jákvæð gildi til að auka stöðu eða neikvæð til að minnka hana.',
    'balance.adjust.reason': 'Ástæða aðlögunar',
    'balance.adjust.reason_placeholder': 'Lýstu ástæðunni fyrir þessari aðlögun',
    'balance.adjust.cancel': 'Hætta við',
    'balance.adjust.confirm': 'Staðfesta aðlögun',
    'common.cancel': 'Hætta við',
    'common.confirm': 'Staðfesta',
    'language.select': 'Tungumál'
  }
};
