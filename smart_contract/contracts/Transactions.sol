//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;                               //veraion of solidity
contract Transactions{
    uint256 transactionCount;    //a number variable that is going to hold the number of transactions

    event Transfer(address from, address receiver,uint amount, string message, uint256 timestamp, string keyword); //event is like a function

 struct TransferStruct{
     address sender;
     address receiver;
     uint amount;
     string message;
     uint256 timestamp;
     string keyword;
 }
 TransferStruct [] transactions;    //an array
  function addToBlockchain(address payable receiver,uint amount,string memory message,string memory keyword) public{
          transactionCount+=1;
          transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));
          emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
 }
 function getAllTransactions() public view returns (TransferStruct[]memory){
     return transactions;

 }
 function getTransactionCount() public view returns (uint){
     return transactionCount;
 }
}