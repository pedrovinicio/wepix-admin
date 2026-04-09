import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  TextInput,
  SimpleList,
  Show,
  useShowController,
  useTranslate,
} from 'react-admin';
import {
  useMediaQuery,
  useTheme,
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Stack,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PixIcon from '@mui/icons-material/Key';

const userFilters = [
  <TextInput source="q" alwaysOn />,
];

export const UserList = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <List filters={userFilters} sort={{ field: 'createdAt', order: 'DESC' }} perPage={25}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name || '-'}
          secondaryText={(record) => record.email}
          tertiaryText={(record) => new Date(record.createdAt).toLocaleDateString()}
          linkType="show"
        />
      ) : (
        <Datagrid bulkActionButtons={false} rowClick="show">
          <TextField source="name" />
          <TextField source="email" />
          <DateField source="createdAt" />
          <NumberField source="groupsCount" />
        </Datagrid>
      )}
    </List>
  );
};

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  }).format(amount);
};

const UserShowLayout = () => {
  const { record, isPending } = useShowController();
  const translate = useTranslate();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  if (isPending || !record) return null;

  return (
    <Box sx={{ maxWidth: 1000, mt: 2 }}>
      {/* User Info */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction={isSmall ? 'column' : 'row'} spacing={3} alignItems={isSmall ? 'center' : 'flex-start'}>
            <Avatar
              src={record.photoUrl}
              sx={{ width: 80, height: 80, fontSize: 32 }}
            >
              {record.name?.[0]?.toUpperCase() || '?'}
            </Avatar>
            <Box sx={{ textAlign: isSmall ? 'center' : 'left' }}>
              <Typography variant="h5" gutterBottom>
                {record.name || '-'}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                <EmailIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {record.email}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                <CalendarTodayIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {translate('resources.users.show.joined')}: {new Date(record.createdAt).toLocaleDateString()}
                </Typography>
              </Stack>
              {record.pixKey && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <PixIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    PIX: {record.pixKey}
                  </Typography>
                </Stack>
              )}
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Groups */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {translate('resources.users.show.groups')}
          </Typography>
          {record.groups?.length > 0 ? (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {record.groups.map((group: { id: string; name: string }) => (
                <Chip
                  key={group.id}
                  label={group.name}
                  variant="outlined"
                  color="primary"
                />
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              {translate('resources.users.show.noGroups')}
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Recent Messages */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {translate('resources.users.show.recentMessages')}
          </Typography>
          {record.recentMessages?.length > 0 ? (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>{translate('resources.users.show.message')}</TableCell>
                    <TableCell>{translate('resources.users.show.group')}</TableCell>
                    <TableCell align="right">{translate('resources.users.show.date')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {record.recentMessages.map((msg: any) => (
                    <TableRow key={msg.id}>
                      <TableCell sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {msg.content}
                      </TableCell>
                      <TableCell>{msg.groupName}</TableCell>
                      <TableCell align="right">{new Date(msg.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body2" color="text.secondary">
              {translate('resources.users.show.noMessages')}
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Recent Expenses */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {translate('resources.users.show.recentExpenses')}
          </Typography>
          {record.recentExpenses?.length > 0 ? (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>{translate('resources.users.show.description')}</TableCell>
                    <TableCell>{translate('resources.users.show.group')}</TableCell>
                    <TableCell align="right">{translate('resources.users.show.amount')}</TableCell>
                    <TableCell align="right">{translate('resources.users.show.date')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {record.recentExpenses.map((exp: any) => (
                    <TableRow key={exp.id}>
                      <TableCell>{exp.description}</TableCell>
                      <TableCell>{exp.groupName}</TableCell>
                      <TableCell align="right">{formatCurrency(exp.amount, exp.currency)}</TableCell>
                      <TableCell align="right">{new Date(exp.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body2" color="text.secondary">
              {translate('resources.users.show.noExpenses')}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export const UserShow = () => (
  <Show>
    <UserShowLayout />
  </Show>
);
