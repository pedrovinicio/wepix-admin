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
    activeUsers: 'Usuários Ativos',
    totalGroups: 'Total de Grupos',
    totalExpenses: 'Total de Despesas',
    totalFeedback: 'Total de Feedback',
    usersWithPixKey: 'Usuários com Chave PIX',
    usersWithoutGroups: 'Usuários sem Grupos',
    userGrowth: 'Novos Cadastros',
    totalUsersOverTime: 'Total de Usuários & Usuários Ativos',
    totalUsersLine: 'Total de Usuários',
    activeUsersLine: 'Usuários Ativos',
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
        createdBy: 'Criador',
        createdAt: 'Criado',
        participantsCount: 'Participantes',
        messagesCount: 'Mensagens',
        expensesTotal: 'Total de Despesas',
      },
      summary: '%{count} participantes',
    },
  },
};

export default pt;
