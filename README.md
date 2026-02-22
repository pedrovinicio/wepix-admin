# WePix Admin

Admin backoffice for WePix. Provides a dashboard to monitor app statistics — users, groups, expenses, and feedback — with growth charts and searchable list views.

Deployed to [admin.wepix-app.com](https://admin.wepix-app.com) via GitHub Pages.

## Tech Stack

- **React** + **TypeScript** + **Vite**
- **react-admin** (data grid, auth, i18n)
- **MUI** (UI components)
- **Recharts** (growth charts)
- **ra-data-simple-rest** (REST data provider)

## Development

```bash
npm install
npm run dev
```

Login with your admin credentials. The local dev server points to `http://localhost:3000/api` — make sure `wepix-backend` is running.
