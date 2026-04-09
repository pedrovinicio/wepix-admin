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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Stack,
  Chip,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';

const groupFilters = [
  <TextInput source="q" alwaysOn />,
];

export const GroupList = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const translate = useTranslate();

  return (
    <List filters={groupFilters} sort={{ field: 'createdAt', order: 'DESC' }} perPage={25}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => translate('resources.groups.summary', { count: record.participantsCount })}
          tertiaryText={(record) => new Date(record.createdAt).toLocaleDateString()}
          linkType="show"
        />
      ) : (
        <Datagrid bulkActionButtons={false} rowClick="show">
          <TextField source="name" />
          <TextField source="createdBy" />
          <DateField source="createdAt" />
          <NumberField source="participantsCount" />
          <NumberField source="messagesCount" />
          <NumberField source="expensesTotal" options={{ style: 'currency', currency: 'BRL' }} />
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

const GroupShowLayout = () => {
  const { record, isPending } = useShowController();
  const translate = useTranslate();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  if (isPending || !record) return null;

  return (
    <Box sx={{ maxWidth: 1000, mt: 2 }}>
      {/* Group Info */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {record.name}
          </Typography>
          {record.description && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {record.description}
            </Typography>
          )}
          <Stack direction={isSmall ? 'column' : 'row'} spacing={3}>
            <Stack direction="row" spacing={1} alignItems="center">
              <PersonIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {translate('resources.groups.show.creator')}: {record.createdBy}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <CalendarTodayIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {translate('resources.groups.show.created')}: {new Date(record.createdAt).toLocaleDateString()}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Chip label={`${record.participantsCount} ${translate('resources.groups.show.participants')}`} variant="outlined" />
            <Chip label={`${record.messagesCount} ${translate('resources.groups.show.messages')}`} variant="outlined" />
            <Chip label={formatCurrency(record.expensesTotal, 'BRL')} variant="outlined" color="primary" />
          </Stack>
        </CardContent>
      </Card>

      {/* Participants */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {translate('resources.groups.show.participants')}
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={2}>
            {record.participants?.map((p: any) => (
              <Stack key={p.id} direction="row" spacing={1} alignItems="center">
                <Avatar src={p.photoUrl} sx={{ width: 32, height: 32, fontSize: 14 }}>
                  {p.name?.[0]?.toUpperCase() || '?'}
                </Avatar>
                <Box>
                  <Typography variant="body2">{p.name || '-'}</Typography>
                  <Typography variant="caption" color="text.secondary">{p.email}</Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Recent Messages */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {translate('resources.groups.show.recentMessages')}
          </Typography>
          {record.recentMessages?.length > 0 ? (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>{translate('resources.groups.show.sender')}</TableCell>
                    <TableCell>{translate('resources.groups.show.message')}</TableCell>
                    <TableCell align="right">{translate('resources.groups.show.date')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {record.recentMessages.map((msg: any) => (
                    <TableRow key={msg.id}>
                      <TableCell>{msg.senderName}</TableCell>
                      <TableCell sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {msg.content}
                      </TableCell>
                      <TableCell align="right">{new Date(msg.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body2" color="text.secondary">
              {translate('resources.groups.show.noMessages')}
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Recent Expenses */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {translate('resources.groups.show.recentExpenses')}
          </Typography>
          {record.recentExpenses?.length > 0 ? (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>{translate('resources.groups.show.description')}</TableCell>
                    <TableCell>{translate('resources.groups.show.createdBy')}</TableCell>
                    <TableCell align="right">{translate('resources.groups.show.amount')}</TableCell>
                    <TableCell align="right">{translate('resources.groups.show.date')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {record.recentExpenses.map((exp: any) => (
                    <TableRow key={exp.id}>
                      <TableCell>{exp.description}</TableCell>
                      <TableCell>{exp.senderName}</TableCell>
                      <TableCell align="right">{formatCurrency(exp.amount, exp.currency)}</TableCell>
                      <TableCell align="right">{new Date(exp.createdAt).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body2" color="text.secondary">
              {translate('resources.groups.show.noExpenses')}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export const GroupShow = () => (
  <Show>
    <GroupShowLayout />
  </Show>
);
