import { List, Datagrid, TextField, DateField, NumberField, TextInput, SimpleList } from 'react-admin';
import { useMediaQuery, useTheme } from '@mui/material';

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
        />
      ) : (
        <Datagrid bulkActionButtons={false}>
          <TextField source="name" />
          <TextField source="email" />
          <DateField source="createdAt" />
          <NumberField source="groupsCount" />
        </Datagrid>
      )}
    </List>
  );
};
