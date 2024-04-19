## Blockchain Engineer Technical Assessment Task

### Run Code

````
npm install
node index.js
````

### Description for functionality


```function getTransfersWithinYears(accounts, years, rpcUrl, tokenAddress)```

This function fetches transfer list for the specified ERC20 token within the given number of years, filtering them based on the provided list of Ethereum addresses. It returns an array of transfer objects representing the filtered transfer list. Any errors that occur during the execution of this function are logged and rethrown for handling.

- Parameters
  - `accounts`: An array of wallet addresses representing the accounts for which transaction history is being fetched.
  - `years`: An integer representing the number of years for which transaction history is to be fetched.
  - `rpcUrl`: A string representing the RPC URL of the Blockchain node.
  - `tokenAddress`: A string representing the address of the ERC20 token contract.

- Response
  - `transfers`: An array containing objects representing transfer list involving any of the given accounts. Each object has the following properties:
  - `from`: The account from which the tokens were transferred.
  - `to`: The account to which the tokens were transferred.
  - `amount`: The amount of tokens transferred.
  - `timestamp`: The timestamp (in Unix epoch format) when the transfer event occurred.

### Improvement Plan
    
#### 1. Security

Calculate API call amount from certain IP address or certain device with cookie to prevent Ddos attack, use recaptcha or delay mode to prevent this

#### 2. Scalability & Maintainability

Develop another API which is capturing new transaction lists from chains and call this every day or for certain period
To capture new transactions add a blockchain node syncronized to the latest blocks and transactions for triggering new transactions. And store the transaction data to database.
And save this to database so that we can provide several option based API response including below features.

Make chain optional as a parameter for web3 provider using below parameter

- chainUrl : target chain url (e.g; https://rpc.chiliz.com)

Return ordered result using below parameter

- order : ASC or DESC for result sorting

Add category as parameter to return specific argument based transactions 

- category : "extternal", "internal", "erc20", etc

Add fromBlock or toBlock as parameter to get transactions in the certain block range

- fromBlock : starting time range to fetch transactions over
- toBlock : ending time range to fetch transactions over

Make flag detailed to return detailed response for each transaction or draft version with necessary fields only

- isDetailed : return detailed transaction info or draft transaction info

#### 3. Speed

implement pagination for API response using below parameters for bandwidth improvement

- cursor : returned in the previous response
- limit : desired page size of the result for pagination



