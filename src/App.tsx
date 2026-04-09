import { Admin, Resource } from 'react-admin';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import authProvider from './authProvider';
import dataProvider from './dataProvider';
import { i18nProvider } from './i18n';
import Dashboard from './Dashboard';
import LoginPage from './LoginPage';
import { theme } from './theme';
import { UserList, UserShow } from './resources/users';
import { GroupList, GroupShow } from './resources/groups';

const App = () => (
  <Admin
    authProvider={authProvider}
    dataProvider={dataProvider}
    i18nProvider={i18nProvider}
    dashboard={Dashboard}
    loginPage={LoginPage}
    theme={theme}
    basename="/"
  >
    <Resource name="users" list={UserList} show={UserShow} icon={PeopleIcon} />
    <Resource name="groups" list={GroupList} show={GroupShow} icon={GroupIcon} />
  </Admin>
);

export default App;
