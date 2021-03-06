// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from 'hardhat';

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    const [deployer] = await ethers.getSigners();

    console.log('Deploying contract with the account:', deployer.address);

    // We get the contract to deploy
    const Greeter = await ethers.getContractFactory('Greeter');
    const greeter = await Greeter.deploy('Hello, Hardhat!');

    await greeter.deployed();

    console.log('Greeter deployed to:', greeter.address);

    // Bee
    const Bee = await ethers.getContractFactory('Bee');
    const bee = await Bee.deploy();

    await bee.deployed();

    console.log('Bee deployed to:', bee.address);

    // Hive
    const Hive = await ethers.getContractFactory('Hive');
    const hive = await Hive.deploy(bee.address);

    await hive.deployed();

    console.log('Hive deployed to:', hive.address);

    // Token
    const Token = await ethers.getContractFactory('Token');
    const initialSupply = 1000000;
    const token = await Token.deploy(initialSupply);

    await token.deployed();

    console.log('Token deployed to:', token.address);

    // TODO: Deploy the DAO contract
    // const cryptoDevsDaoAddress = await deployCryptoDevsDAO(
    //     cryptoDevsNftAddress,
    //     fakeNftMarketplaceAddress
    // );

    // console.log(
    //     `Deployed CryptoDevsDAO contract at address: ${cryptoDevsDaoAddress}`
    // );

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
