
const main =async ()=> {

  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactons = await Transactions.deploy();

  await transactons.deployed();

  console.log("Transactions deployed to:", transactons.address);
}

const runMain= async ()=> {
  try {
     await main(); 
     process.exit(0);
  } catch(error){
    console.error(error);
    process.exit(1);
  }

};
runMain();