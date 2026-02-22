import { Login, LoginForm } from 'react-admin';
import { Box } from '@mui/material';

const LoginPage = () => (
  <Login sx={{ '& .RaLogin-icon': { display: 'none' } }}>
    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
      <img src="/logo.png" alt="WePix" style={{ width: 200, height: 'auto' }} />
    </Box>
    <LoginForm />
  </Login>
);

export default LoginPage;
