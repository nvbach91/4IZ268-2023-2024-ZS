# App

> [Steps before first deployment](burn-after-reading.md)

## Administration

- [Contember](https://XXX.eu.contember.cloud/)

## Website

- [Beta](https://XXX-beta.vercel.app/)
- [Production](https://XXX.vercel.app/)

## Development

```sh
npm ci
npm run dev
```

### Generate local contember public token

```sh
npm run contember tenant:create-api-key
```

When prompted, select "app" project and "public" role and set api key description. Save generated token to your `website/.env.local` under `CONTEMBER_TOKEN`

### Update schema

```sh
npm run contember migration:diff "migration-name"
npm run generate-schema
```

### Import database

```sh
npm run import-database
```

## Deployment

Push to:

- `deploy/contember/beta`
- `deploy/contember/prod`
- `deploy/website/beta`
- `deploy/website/prod`
