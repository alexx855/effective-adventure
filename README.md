# Effective adenture
A web3 game experiment

## Automated deploy to pinata and update cloudflare dnslink
Set github secrets with keys, get from providers
```
PINATA_KEY=
PINATA_SECRET=
CLOUDFLARE_TOKEN=
CLOUDFLARE_ZONE_ID=
```

## Manually deploy to IPFS using infura service
`./deploy-webapp-ipfs-infura.sh`

## Firebase deploy
the FIREBASE_SERVICE_ACCOUNT is generated automatically by the firebase cli

# Hardhat

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'apps/hardhat/contracts/**/*.sol'
npx solhint 'apps/hardhat/contracts/**/*.sol' --fix
```
