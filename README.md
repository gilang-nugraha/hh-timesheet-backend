# hh-timesheet-backend

Timesheet Management using Next.Js & Strapi

[Demo Frontend](https://timesheet-demo.gilanglie.com)

[Demo Backend](https://api-timesheet-demo.gilanglie.com)

## Getting Started

For Fullstack Developer Take Home Test - Timesheet App

## Login account

**Frontend Admin:** admin@demo.com / Password123
**Frontend User:** testuser@gmail.com / Password123
**Backend Admin:** gilang.nugraha.h@gmail.com / Password123

## Tech Stack

**Language:** Typescript

**Client:** React, Next.js, Material UI, Tanstack Query, Refine

**Server:** Node, Strapi

**Deployment:** Vercel & AWS

## Feature

- [x] Login Admin / User
- [x] Access Control Middleware
- [x] Employee (User)
  - [x] CRUD Operation
- [x] Timesheet
  - [x] CRUD Operation
  - [x] Calculate work,overtime,total duration
  - [x] Calculate work,overtime,total income
  - [x] Recalculate if update on rate and %rate
  - [x] Filter by project
  - [x] Filter by date range
  - [x] Export to CSV, Excel & PDF
  - [ ] Import data
- [x] Setting
  - [x] Update Work Time
  - [x] Update overtime %rate
  - [x] Update password

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`HOST=0.0.0.0`
`PORT=1337`
`APP_KEYS=+ue4EoNKPeyx0aIzx3Yx/Q==,L10zeL0rQpC/52KBS8Ul5Q==,TiH2bbMrcrppylgPxY4Msw==`
`HSvaffioeWHfY7POUMkzzQ==`
`API_TOKEN_SALT=rDEHH19CC+pfZ6f5yV++vg==`
`ADMIN_JWT_SECRET=aomgwGbMhaqIFByfHpcBXA==`
`TRANSFER_TOKEN_SALT=Vwgjxo380qN1qHLyYW80Hg==`

# Database

`DATABASE_CLIENT=sqlite`
`DATABASE_FILENAME=.tmp/data.db`
`JWT_SECRET=S0alp9Lmer251cR8EtHrHw==`

### Running the development server.

Development is using Node.js v20.10.0, i recommend using same version or minimum 18^

### Running for development with autoReload enabled.

```bash
npm run develop
# or
yarn develop
```

### Running for development with autoReload disabled.

```bash
npm run start
# or
yarn start
```

### Build admin panel.

```bash
npm run build
# or
yarn build
```

## Feedback

If you have any feedback, please reach out to us at gilang.nugraha.h@gmail.com

## License

MIT
