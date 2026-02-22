import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, Box, Typography, Select, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, Grid } from '@mui/material';
import { useDataProvider } from 'react-admin';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FeedbackIcon from '@mui/icons-material/Feedback';
import en from './i18n/en';

const t = en;

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface Overview {
  totalUsers: number;
  totalGroups: number;
  totalExpenses: number;
  totalFeedback: number;
}

interface GrowthPoint {
  period: string;
  count: number;
}

interface CumulativePoint {
  period: string;
  total: number;
  active: number;
}

interface RecentUser {
  id: string;
  name: string | null;
  email: string;
  createdAt: string;
  groupsCount: number;
}

const StatCard = ({ title, value, icon, color }: { title: string; value: number; icon: React.ReactNode; color: string }) => (
  <Card sx={{ flex: 1, minWidth: 200 }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="body2" color="text.secondary">{title}</Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1 }}>{value.toLocaleString()}</Typography>
        </Box>
        <Box sx={{ backgroundColor: color, borderRadius: 2, p: 1.5, display: 'flex' }}>
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const dataProvider = useDataProvider();
  const [overview, setOverview] = useState<Overview | null>(null);
  const [growth, setGrowth] = useState<GrowthPoint[]>([]);
  const [cumulative, setCumulative] = useState<CumulativePoint[]>([]);
  const [period, setPeriod] = useState<string>('daily');
  const [cumulativePeriod, setCumulativePeriod] = useState<string>('daily');
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);

  const fetchWithAuth = async (url: string) => {
    const token = localStorage.getItem('admin_token');
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  };

  useEffect(() => {
    fetchWithAuth(`${API_URL}/admin/stats/overview`).then((res) => {
      if (res.success) setOverview(res.data);
    });

    dataProvider.getList('users', {
      pagination: { page: 1, perPage: 10 },
      sort: { field: 'createdAt', order: 'DESC' },
      filter: {},
    }).then(({ data }) => {
      setRecentUsers(data as unknown as RecentUser[]);
    });
  }, []);

  useEffect(() => {
    fetchWithAuth(`${API_URL}/admin/stats/users/growth?period=${period}`).then((res) => {
      if (res.success) setGrowth(res.data);
    });
  }, [period]);

  useEffect(() => {
    fetchWithAuth(`${API_URL}/admin/stats/users/cumulative?period=${cumulativePeriod}`).then((res) => {
      if (res.success) setCumulative(res.data);
    });
  }, [cumulativePeriod]);

  if (!overview) return null;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>{t.dashboard.title}</Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title={t.dashboard.totalUsers} value={overview.totalUsers} icon={<PeopleIcon sx={{ color: '#fff' }} />} color="#4caf50" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title={t.dashboard.totalGroups} value={overview.totalGroups} icon={<GroupIcon sx={{ color: '#fff' }} />} color="#2196f3" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title={t.dashboard.totalExpenses} value={overview.totalExpenses} icon={<ReceiptIcon sx={{ color: '#fff' }} />} color="#ff9800" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title={t.dashboard.totalFeedback} value={overview.totalFeedback} icon={<FeedbackIcon sx={{ color: '#fff' }} />} color="#9c27b0" />
        </Grid>
      </Grid>

      <Card sx={{ mb: 3 }}>
        <CardHeader
          title={t.dashboard.userGrowth}
          action={
            <Select value={period} onChange={(e) => setPeriod(e.target.value)} size="small">
              <MenuItem value="daily">{t.dashboard.period.daily}</MenuItem>
              <MenuItem value="weekly">{t.dashboard.period.weekly}</MenuItem>
              <MenuItem value="monthly">{t.dashboard.period.monthly}</MenuItem>
            </Select>
          }
        />
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#4caf50" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardHeader
          title={t.dashboard.totalUsersOverTime}
          action={
            <Select value={cumulativePeriod} onChange={(e) => setCumulativePeriod(e.target.value)} size="small">
              <MenuItem value="daily">{t.dashboard.period.daily}</MenuItem>
              <MenuItem value="weekly">{t.dashboard.period.weekly}</MenuItem>
              <MenuItem value="monthly">{t.dashboard.period.monthly}</MenuItem>
            </Select>
          }
        />
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cumulative}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" name={t.dashboard.totalUsersLine} stroke="#2196f3" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="active" name={t.dashboard.activeUsersLine} stroke="#4caf50" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title={t.dashboard.recentUsers} />
        <CardContent>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="left">{t.resources.users.fields.name}</TableCell>
                <TableCell align="left">{t.resources.users.fields.email}</TableCell>
                <TableCell align="left">{t.resources.users.fields.createdAt}</TableCell>
                <TableCell align="right">{t.resources.users.fields.groupsCount}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell align="left">{user.name || '-'}</TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="left">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell align="right">{user.groupsCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
