// Import Solana web3 functinalities
const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} = require('@solana/web3.js')

// Public Key: Gwe3uTGAJUtSmxNiKjnko5C5HXEwTdW1PDqFYkqVdy7u

const publicKey = process.argv[2]

if (!publicKey) {
  console.log(
    'Public is not supplied. Please append the public key in the script.',
  )
  return false
}

console.log('Public Key: ' + publicKey)

// Connect to the Devnet
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')

// Get the wallet balance from a given private key
const getWalletBalance = async () => {
  try {
    // Make a wallet (keypair) from privateKey and get its balance
    const walletBalance = await connection.getBalance(new PublicKey(publicKey))
    console.log(
      `Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`,
    )
  } catch (err) {
    console.log(err)
  }
}

const airDropSol = async () => {
  try {
    // Request airdrop of 2 SOL to the wallet
    console.log('Airdropping some SOL to my wallet!')
    const fromAirDropSignature = await connection.requestAirdrop(
      new PublicKey(publicKey),
      2 * LAMPORTS_PER_SOL,
    )
    await connection.confirmTransaction(fromAirDropSignature)
  } catch (err) {
    console.log(err)
  }
}

// Show the wallet balance before and after airdropping SOL
const mainFunction = async () => {
  await getWalletBalance()
  await airDropSol()
  await getWalletBalance()
}

mainFunction()
