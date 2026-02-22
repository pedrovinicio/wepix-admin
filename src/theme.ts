import { defaultTheme } from 'react-admin';

export const theme = {
  ...defaultTheme,
  palette: {
    primary: {
      main: '#5DB4E8',
      light: '#8ECDF4',
      dark: '#3A9FDB',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#0F172A',
      light: '#1E293B',
      dark: '#020617',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FAFBFC',
    },
    error: {
      main: '#EF4444',
    },
    success: {
      main: '#10B981',
    },
    warning: {
      main: '#F59E0B',
    },
  },
};
