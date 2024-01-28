const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js")

const {
    getKeypairFromEnvironment
} = require("@solana-developers/helpers")

require('dotenv').config()

// const wallet = new Keypair()

const wallet = getKeypairFromEnvironment("SECRET_KEY");

const publicKey = new PublicKey(wallet._keypair.publicKey)
const secretKey = wallet._keypair.secretKey

const getWalletBalance = async() => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const walletBalance = await connection.getBalance(publicKey)
        console.log(`Wallet balance is ${walletBalance}`)
    } catch (err) {
        console.error(err)
    }
}
const airDropSol = async() => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const fromAirDropSignature = await connection.requestAirdrop(publicKey, 5 * LAMPORTS_PER_SOL)
        
        // await connection.confirmTransaction(fromAirDropSignature)

        // const latestBlockHash = await connection.getLatestBlockhash();

        await connection.confirmTransaction({
            // blockhash: latestBlockHash.blockhash,
            // lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
            signature: fromAirDropSignature,
        });
    } catch (err) {
        console.error(err)
    }
}
const main = async() => {
    await getWalletBalance()
    await airDropSol()
    await getWalletBalance()
}
main()