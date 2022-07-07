import React, {useState,useEffect} from "react";
import {ethers}from "ethers";
import {contractABI,contractAddress} from "../utils/constants";
export  const TransactionContext = React.createContext();
const {ethereum}=window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
  
    return transactionContract;
  };
  
export const TransactionProvider =({children})=>{
    const[currentAccount, setCurrentAccount]= useState('');
    const [formData, setFormData]=useState({addressTo:'', amount:'', keyword:'', message:''});
    const[isLoading, setIsLoading]=useState(false);
    const [transactionCount, setTransactionCount]=useState(localStorage.getItem('transactionsCount'));
    const handleChange=(e, name) => {
        setFormData((prevState) => ({...prevState,[name]:e.target.value}));
    }

    const checkIfWalletIsConnected = async ()=>{
        try {
            if(!ethereum) return alert("Please Install Metamask");
            const accounts = await ethereum.request({method:'eth_accounts'})
            if(accounts.length){
                setCurrentAccount(accounts[0]);
                //getAllTrransactions()
            }else{
                console.log("No Accounts Found");
            }
            
            
        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum Object")
            
        }        
    }
    const connectWallet= async ()=>{
        try{
            if(!ethereum) return alert("Please Install Metamask");
            const accounts = await ethereum.request({method:'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);

        }catch(error){
            console.log(error);
            throw new Error("No Ethereum Object")
        }
    }
   const sendTransaction= async ()=>{
       try {
        if(!ethereum) return alert("Please Install Metamask");
        const {addressTo,amount,keyword,message}= formData;
      const transactionContract =  getEthereumContract();
      const parsedAmount= ethers.utils.parseEther(amount);//as amount entered will be in decimal but we need hexadecimal
       await ethereum.request({
        method:'eth_sendTransaction',
        params:[{
            from:currentAccount,
            to:addressTo,
            gas:'0x5208', //21000 gwei
            value:parsedAmount._hex,
        }]
       });
       const transactionHash= await transactionContract.addToBlockchain(addressTo,parsedAmount,message,keyword);
       setIsLoading(true);
       console.log('Loading - ${transactionHash.hash}');
       await transactionHash.wait();
       setIsLoading(false);
       console.log('Sucess - ${transactionHash.hash}');
       transactionCount= await transactionContract.getTransactionCount();
       transactionCount(transactionCount.toNumber());
       } catch (error) {
        console.log(error);
        throw new Error("No Ethereum Object")
       }
   } 
    useEffect(()=>{
        checkIfWalletIsConnected();
    },[]);
return(
    <TransactionContext.Provider value={{connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction}}>
        {children}
    </TransactionContext.Provider>
);
}