const {BlockChain, Transaction} = require('./blockchain.js');

let kayChain = new BlockChain();
kayChain.createTransaction(new Transaction("address1", "address2", 100));
kayChain.createTransaction(new Transaction("address2", "address1", 50));

console.log('\n Starting the miner...');
kayChain.minePendingTransactions("kumudu-address");

console.log('\nBalance of Kumudu is', kayChain.getBalaceOfAddress("kumudu-address"));



console.log('\n Starting the miner again...');
kayChain.minePendingTransactions("kumudu-address");

console.log('\nBalance of Kumudu is', kayChain.getBalaceOfAddress("kumudu-address"));

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