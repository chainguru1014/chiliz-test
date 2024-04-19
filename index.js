const { Web3 } = require('web3');
const erc20ABI = require('./erc20_abi.json');

async function getTransfersWithinYears(accounts, years, rpcUrl, tokenAddress) {
    try {
        const web3 = new Web3(rpcUrl);
        const tokenContract = new web3.eth.Contract(erc20ABI, tokenAddress);

        const currentBlock = await web3.eth.getBlockNumber();

        const transfers = [];
        const blocksPerFiveDays = 5 * 24 * 60 * 20;

        for (let i = years * 365 / 5; i > 0; i --) {
            const startBlock = currentBlock - BigInt(i * blocksPerFiveDays);
            const endBlock = i === 1 ? 'latest' : currentBlock - BigInt((i - 1) * blocksPerFiveDays) - BigInt(1);

            console.log('Fetching Past Events in block: (', startBlock, ',', endBlock, ')');
            const transferEvents = await tokenContract.getPastEvents('Transfer', {
                fromBlock: startBlock,
                toBlock: endBlock
            });
    
            for (const event of transferEvents) {
                if (accounts.includes(event.returnValues.from) || accounts.includes(event.returnValues.to)) {
                    transfers.push({
                        from: event.returnValues.from,
                        to: event.returnValues.to,
                        amount: event.returnValues.value,
                        timestamp: (await web3.eth.getBlock(event.blockNumber)).timestamp
                    });
                }
            }
        }
        
        return transfers;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    }
}

// API endpoint parameters
const accounts = ['0xfb4816b2f573C9358c13F9102C071cDb5FCa428d'];
const years = 1;
const barTokenAddress = '0xFD3C73b3B09D418841dd6Aff341b2d6e3abA433b';
const chainRpcUrl = 'https://rpc.chiliz.com';

getTransfersWithinYears(accounts, years, chainRpcUrl, barTokenAddress)
    .then(transfers => {
        console.log(transfers);
        console.log(`Total transfers found: ${transfers.length}`);
    })
    .catch(error => {
        console.error(error);
    });