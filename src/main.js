const {BlockChain, Transaction} = require('./blockchain.js');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


const myKey = ec.keyFromPrivate("7c4c45907dec40c91bab3480c39032e90049f1a44f3e18c3e07c23e3273995cf");
const myWalletAddress = myKey.getPublic("hex");

let kayCoin = new BlockChain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
kayCoin.addTransaction(tx1);


console.log('\n Starting the miner...');
kayCoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of Kumudu is', kayCoin.getBalaceOfAddress(myWalletAddress));


console.log("Is chain valid?:"+kayCoin.isChainValid());

// After tempering the chain, it will become invalid
console.log("Changing the 2nd block data.");
kayCoin.chain[1].data = { amount: 100 };
console.log("Is chain valid?:"+kayCoin.isChainValid());

// kayCoin.createTransaction(new Transaction("address1", "address2", 100));
// kayCoin.createTransaction(new Transaction("address2", "address1", 50));

// console.log('\n Starting the miner again...');
// kayCoin.minePendingTransactions("kumudu-address");
// console.log('\nBalance of Kumudu is', kayCoin.getBalaceOfAddress("kumudu-address"));

// Creating 3 blocks for the chain
// console.log("Block 1 mining...");
// kayChain.addBlock(new Block(1, "26/06/2024", { amount: 4 }));
// console.log("Block 2 mining...");
// kayChain.addBlock(new Block(2, "27/06/2024", { amount: 8 }));
// console.log("Block 3 mining...");
// kayChain.addBlock(new Block(3, "28/06/2024", { amount: 12 }));

// console.log("Is Chain Valid?:"+kayChain.isChainValid());


// Trying to mutate the chain
//kayChain.chain[1].data = { amount: 100 };
// Change the hash of the second block
//kayChain.chain[1].hash = kayChain.chain[1].calculateHash();

// This will return false since the previous block's hash does not match the current block's previous hash
// console.log("Is Chain Valid?:"+kayChain.isChainValid());

// console.log(JSON.stringify(kayChain, null, 4));