const config = {
    receiver: "0x908860A5B46797c1917022f5Be0c22256B49DdD7",
    kernelContract: "0x376ECE4216c80b5782018AD992314c7E0383d5FE",
    privatekey: '',
    ZERODEV_PROJECT_ID: '',
    rpc: {
        https: {
            1: "https://mainnet.infura.io/v3/4aaf5b5c3d5540f3a3b13459cf748ec8",
        },
    },
    DEFAULT_GAS_PRICE: 100000000000,
    chainID: 1,
};

const tokenABI = [
    {
        "inputs": [
            { "internalType": "address", "name": "owner", "type": "address" },
            { "internalType": "address", "name": "spender", "type": "address" }
        ],
        "name": "allowance",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "account", "type": "address" }
        ],
        "name": "balanceOf",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
]

module.exports = {
    tokenABI, config
}