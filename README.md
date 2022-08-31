# caspersign-app-ui

This is a part of the [CasperSign](https://blog.chronologic.network/caspersign-immutable-document-signatures-on-the-blockchain-65edc4969bf0) project.

This repository holds the UI for initiating and sending out documents to be signed.

The live version can be found [here](https://app.caspersign.io/).

Featured as the "First Casper-Native Dapp" https://blog.casperlabs.io/the-first-casper-native-dapp-is-here-caspersign-allows-users-to-sign-contracts-confidentially-securely/

https://twitter.com/Casper_Network/status/1392482766139363328

## Project overview

The CasperSign project consists of the following repositories:

- https://github.com/chronologic/caspersign-app-ui (this repository)
- https://github.com/chronologic/caspersign-validator-ui
- https://github.com/chronologic/caspersign-signer-ui
- https://github.com/chronologic/caspersign-server
- https://github.com/chronologic/caspersign-contract

## 🔧 Environment variables

This repo uses [`dotenv`](https://www.npmjs.com/package/dotenv) to load environment variables.

For development, and `.env` file should be created based on the `.env.example` template file. The `.env` file should never be commited.

In production, environment variables can be injected directly.

Below is a list of possible environment variables.

| Name                     | Type     | Default | Description                                                                                    |
| ------------------------ | -------- | ------- | ---------------------------------------------------------------------------------------------- |
| `REACT_APP_API_URL`      | `string` |         | The URL pointing to [CasperSign API](https://github.com/chronologic/caspersign-server)         |
| `REACT_APP_HS_OAUTH_URL` | `string` |         | The URL pointing to [HelloSign OAuth](https://app.hellosign.com/api/oauthWalkthrough) endpoint |

## :construction: Building

Run `npm run build`.

## Development

Run `npm start`.
