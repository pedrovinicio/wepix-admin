import { Login, LoginForm } from 'react-admin';
import { Box } from '@mui/material';

const LoginPage = () => (
  <Login
    sx={{
      '& .RaLogin-icon': { display: 'none' },
      backgroundImage: 'none',
      backgroundColor: '#0F172A',
      '& .RaLogin-card': {
        backgroundColor: '#FAFBFC',
        '& .MuiInputBase-input': {
          color: '#0F172A',
        },
        '& .MuiInputLabel-root': {
          color: '#64748B',
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#3A9FDB',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#CBD5E1',
          },
          '&:hover fieldset': {
            borderColor: '#3A9FDB',
          },
        },
      },
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
      <img src="/logo.png" alt="WePix" style={{ width: 200, height: 'auto' }} />
    </Box>
    <LoginForm />
  </Login>
);

export default LoginPage;
