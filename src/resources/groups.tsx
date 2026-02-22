import { List, Datagrid, TextField, DateField, NumberField, TextInput } from 'react-admin';

const groupFilters = [
  <TextInput source="q" alwaysOn />,
];

export const GroupList = () => (
  <List filters={groupFilters} sort={{ field: 'createdAt', order: 'DESC' }} perPage={25}>
    <Datagrid bulkActionButtons={false}>
      <TextField source="name" />
      <TextField source="createdBy" />
      <DateField source="createdAt" />
      <NumberField source="participantsCount" />
      <NumberField source="messagesCount" />
      <NumberField source="expensesTotal" options={{ style: 'currency', currency: 'BRL' }} />
    </Datagrid>
  </List>
);
