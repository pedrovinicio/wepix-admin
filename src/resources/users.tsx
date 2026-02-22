import { List, Datagrid, TextField, DateField, NumberField, TextInput } from 'react-admin';

const userFilters = [
  <TextInput source="q" alwaysOn />,
];

export const UserList = () => (
  <List filters={userFilters} sort={{ field: 'createdAt', order: 'DESC' }}>
    <Datagrid bulkActionButtons={false}>
      <TextField source="name" />
      <TextField source="email" />
      <DateField source="createdAt" />
      <NumberField source="groupsCount" />
    </Datagrid>
  </List>
);
