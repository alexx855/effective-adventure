# Effective adenture
a web3 nx nextjs hardhat monorepo template

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