import { List, Datagrid, TextField, DateField, NumberField, TextInput, SimpleList, useTranslate } from 'react-admin';
import { useMediaQuery, useTheme } from '@mui/material';

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
        />
      ) : (
        <Datagrid bulkActionButtons={false}>
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
