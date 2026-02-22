import { Login } from 'react-admin';
import { Box } from '@mui/material';

const LoginPage = () => (
  <Login>
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
      <img src="/logo.png" alt="WePix" style={{ width: 120, height: 120 }} />
    </Box>
  </Login>
);

export default LoginPage;
