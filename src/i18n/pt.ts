const pt = {
  app: {
    title: 'WePix Admin',
  },
  auth: {
    login: 'Entrar',
    email: 'Email',
    password: 'Senha',
    signIn: 'Entrar',
    error: 'Credenciais inválidas',
  },
  dashboard: {
    title: 'Painel',
    totalUsers: 'Total de Usuários',
    totalGroups: 'Total de Grupos',
    totalExpenses: 'Total de Despesas',
    totalFeedback: 'Total de Feedback',
    userGrowth: 'Crescimento de Usuários',
    recentUsers: 'Usuários Recentes',
    period: {
      daily: 'Diário',
      weekly: 'Semanal',
      monthly: 'Mensal',
    },
  },
  resources: {
    users: {
      name: 'Usuário |||| Usuários',
      fields: {
        name: 'Nome',
        email: 'Email',
        createdAt: 'Cadastro',
        groupsCount: 'Grupos',
        photoUrl: 'Foto',
      },
    },
    groups: {
      name: 'Grupo |||| Grupos',
      fields: {
        name: 'Nome',
        description: 'Descrição',
        createdAt: 'Criado',
        participantsCount: 'Participantes',
        messagesCount: 'Mensagens',
        expensesTotal: 'Total de Despesas',
      },
    },
  },
};

export default pt;
