# API Documentation

### Soter
The Soter `constructor` takes two optional arguments. A `TronWeb` instance and a `boolean`
indicating whether to use the Testnet or Mainnet parameters internally. If no
`TronWeb` instance is passed to the constructor, it will default to `window.tronWeb`.
If no `isTest` parameter is passed, it will default to `true`

```
// Testnet Soter instance using window.tronWeb
const testSoter = new Soter()

// Mainnet Soter instance using window.tronWeb
const tronLinkSoter = new Soter(undefined, false);

// Soter instance using a custom TronWeb instance
const tronweb = new TronWeb({
                    fullHost: 'https://api.trongrid.io',
                    privateKey: 'your private key'
                });

const soter = new Soter(tronweb, false);

```

### Soter.inquiry(file_size: number): Promise < SoterInquiryResponse >
Check whether your currently logged in account has sufficient BTT balance in Soter
to upload a file with the given `file_size` (in Bytes).

### Soter.add(file: File): Promise < SoterAddResponse >
Upload a given `File` to BTFS via Soter.

### Soter.recharge( amount: number )
Recharge BTT balance with the given `amount` in Soter
