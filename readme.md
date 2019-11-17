# API Documentation

### Soter(options: SoterOptions)

Options may contain a `tronweb` property with a `TronWeb` instance (defaults to
`window.tronWeb`) as well as an `isTest` property (defaults to `false`);

```
// Mainnet Soter instance using window.tronWeb
const soter = new Soter()

// Testnet Soter instance using window.tronWeb 
// If you use TronLink, make sure to switch to Shasta Testnet
const testSoter = new Soter({isTest: true});

// Soter instance using a custom TronWeb instance
const tronweb = new TronWeb({
                    fullHost: 'https://api.trongrid.io',
                    privateKey: 'your private key'
                });

const options = {
    tronweb,
    isTest: false
}

const soter = new Soter(options);

```

### inquiry
```
inquiry(file_size: number): Promise<SoterInquiryResponse>
```
Check whether your currently logged in account has sufficient BTT balance in Soter
to upload a file with the given `file_size` (in Bytes).

### add
```
add(file: File): Promise <SoterAddResponse>
```
Upload a given `File` to BTFS via Soter.

### recharge
```
recharge(amount: number): Promise<any>
```
Recharge BTT balance with the given `amount`(e.g. amount 1 will
recharge 0.000001 BTT, amount 1000000 will recharge 1 BTT) in Soter
