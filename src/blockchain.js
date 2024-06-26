const SHA256 = require('crypto-js/sha256');


class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(index, timestamp, transaction, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.transaction = transaction;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    // Mine a block with Proof of Work algorithm
    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    }
}

class BlockChain {

    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransctions = [];
        this.miningReward = 100;
    }

    createGenesisBlock(){
        return new Block(0, "06/06/2024", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    minePendingTransactions(miningRewardAddress){

        let block = new Block(this.chain.length, Date.now(), this.pendingTransctions);
        block.mineBlock(this.difficulty);

        console.log("Block successfully mined!");
        this.chain.push(block);

        this.pendingTransctions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction){
        this.pendingTransctions.push(transaction);
    }

    getBalaceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const transction of block.transaction){
                if(transction.fromAddress === address){
                    balance -= transction.amount;
                }

                if(transction.toAddress === address){
                    balance += transction.amount;
                }
            }
        }

        return balance;
    }

    // addBlock(newBlock){

    //     newBlock.previousHash = this.getLatestBlock().hash;
    //     //newBlock.hash = newBlock.calculateHash();

    //     newBlock.mineBlock(this.difficulty);
    //     this.chain.push(newBlock);
    // }

    isChainValid(){
        for(let i=1; i < this.chain.length; i++){

            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            // Check if the previous block's hash matches the current block's previous hash
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

module.exports.BlockChain = BlockChain;
module.exports.Transaction = Transaction;
module.exports.Block = Block;
