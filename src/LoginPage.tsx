import { Login, LoginForm } from 'react-admin';
import { Box } from '@mui/material';

const LoginPage = () => (
  <Login>
    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
      <img src="/logo.png" alt="WePix" style={{ width: 120, height: 120 }} />
    </Box>
    <LoginForm />
  </Login>
);

export default LoginPage;
