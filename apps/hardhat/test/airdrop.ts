import { expect } from 'chai';
// import { BigNumberish } from "ethers";
import { ethers } from 'hardhat';

import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';
// import { arrayify }  from "ethers/lib/utils";

const toWei = (num: number) => ethers.utils.parseEther(num.toString());
// const fromWei = (num: BigNumberish) => ethers.utils.formatEther(num)

describe('AirDrop', function () {
    const TOKENS_IN_POOL = toWei(1000000000);
    const REWARD_AMOUNT = toWei(500);
    let addrs: any;
    let contractBlocknumber;
    const blockNumberCutoff = 11; // Any account that used ethSwap before or including this blocknumber are eligible for airdrop.
    let merkleTree: any;
    let airDrop: any;

    // beforeEach(async function () {
    //     accounts = await ethers.getSigners();
    // });

    it('Check that all 1 million tokens are in the pool', async function () {
        // Create an array that shuffles the numbers 0 through 19.
        // The elements of the array will represent the develeopment account number
        // and the index will represent the order in which that account will use ethSwap to buyTokens
        const shuffle = [];
        while (shuffle.length < 20) {
            const r = Math.floor(Math.random() * 20);
            if (shuffle.indexOf(r) === -1) {
                shuffle.push(r);
            }
        }

        // Get all signers
        addrs = await ethers.getSigners();
        // Deploy eth swap
        const EthSwapFactory = await ethers.getContractFactory(
            'EthSwap',
            addrs[0]
        );
        const ethSwap = await EthSwapFactory.deploy();
        const receipt = await ethSwap.deployTransaction.wait();
        contractBlocknumber = receipt.blockNumber;

        // Instantiate token
        const tokenAddress = await ethSwap.token();
        const token = (
            await ethers.getContractFactory('Token', addrs[0])
        ).attach(tokenAddress);

        // Check that all 1 million tokens are in the pool
        expect(await token.balanceOf(ethSwap.address)).to.equal(TOKENS_IN_POOL);

        // Every development account buys Tokens from the ethSwap exchange in a random order
        await Promise.all(
            shuffle.map(async (i, indx) => {
                const receipt = await (
                    await ethSwap
                        .connect(addrs[i])
                        .buyTokens({ value: toWei(10) })
                ).wait(); // Each account buys 10,000 tokens worth 10 eth
                expect(receipt.blockNumber).to.eq(indx + 2);
            })
        );

        // Query all tokensPruchases events between contract block number to block number cut off on the ethSwap contract
        // to find out all the accounts that have interacted with it
        const filter = ethSwap.filters.TokensPurchased();
        const results = await ethSwap.queryFilter(
            filter,
            contractBlocknumber,
            blockNumberCutoff
        );
        expect(results.length).to.eq(blockNumberCutoff - contractBlocknumber);

        // Get elligble addresses from events and then hash them to get leaf nodes
        const leafNodes = results.map((i) =>
            keccak256(i?.args?.account.toString())
        );
        // Generate merkleTree from leafNodes
        merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
        // Get root hash from merkle tree
        const rootHash = merkleTree.getRoot();
        // Deploy the Air Drop contract
        const AirDropFactory = await ethers.getContractFactory(
            'AirDrop',
            addrs[0]
        );
        airDrop = await AirDropFactory.deploy(rootHash, REWARD_AMOUNT);
    });

    it('Only eligible accounts should be able to claim airdrop', async function () {
        // Every eligible account claims their airdrop
        for (let i = 0; i < 20; i++) {
            const proof = merkleTree.getHexProof(keccak256(addrs[i].address));
            if (proof.length !== 0) {
                await airDrop.connect(addrs[i]).claim(proof);
                expect(await airDrop.balanceOf(addrs[i].address)).to.eq(
                    REWARD_AMOUNT
                );
                // Fails when user tries to claim tokens again.
                await expect(
                    airDrop.connect(addrs[i]).claim(proof)
                ).to.be.revertedWith('Already claimed air drop');
            } else {
                await expect(
                    airDrop.connect(addrs[i]).claim(proof)
                ).to.be.revertedWith('Incorrect merkle proof');
                expect(await airDrop.balanceOf(addrs[i].address)).to.eq(0);
            }
        }
    });

    // TODO: implment this test
    it('Not eligible accounts should not be able to claim airdrop', async function () {
        expect(1).to.eq(1);
    });

    // TODO: implment this test
    it('Fails when user tries to claim tokens again.', async function () {
        expect(1).to.eq(1);
    });
});
