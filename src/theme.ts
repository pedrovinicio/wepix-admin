import { defaultDarkTheme } from 'react-admin';

export const theme = {
  ...defaultDarkTheme,
  palette: {
    ...defaultDarkTheme.palette,
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
  },
  components: {
    ...defaultDarkTheme.components,
    MuiTableCell: {
      styleOverrides: {
        root: {
          whiteSpace: 'nowrap' as const,
        },
      },
    },
    RaList: {
      styleOverrides: {
        root: {
          '& .RaList-content': {
            overflowX: 'auto' as const,
          },
        },
      },
    },
  },
};
