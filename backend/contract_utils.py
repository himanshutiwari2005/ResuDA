import os
from web3 import Web3
from dotenv import load_dotenv
import json

load_dotenv()

INFURA_URL = os.getenv("INFURA_URL")
CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
PUBLIC_ADDRESS = os.getenv("PUBLIC_ADDRESS")

# ABI from compiled contract (simplified for now)
contract_abi = json.loads("""[
  {
    "inputs": [
      { "internalType": "string", "name": "ipfsHash", "type": "string" },
      { "internalType": "uint256", "name": "score", "type": "uint256" }
    ],
    "name": "uploadResume",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "user", "type": "address" }
    ],
    "name": "getResume",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]""")

web3 = Web3(Web3.HTTPProvider(INFURA_URL))
contract = web3.eth.contract(address=CONTRACT_ADDRESS, abi=contract_abi)

def store_resume_on_chain(ipfs_hash, score):
    nonce = web3.eth.get_transaction_count(PUBLIC_ADDRESS)
    txn = contract.functions.uploadResume(ipfs_hash, int(score)).build_transaction({
    'from': PUBLIC_ADDRESS,
    'nonce': nonce,
    'gas': 300000,
    'maxFeePerGas': web3.to_wei('50', 'gwei'),
    'maxPriorityFeePerGas': web3.to_wei('2', 'gwei'),
    'chainId': 10143  # ✅ Use Monad testnet's chain ID if needed
})
    signed_txn = web3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = web3.eth.send_raw_transaction(signed_txn.raw_transaction)
    return web3.to_hex(tx_hash)

def get_resume_from_chain(address):
    return contract.functions.getResume(address).call()