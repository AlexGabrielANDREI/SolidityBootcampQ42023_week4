import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
//import * as tokenJson from './assets/MyToken.json';
import * as tokenJson from './assets/TokenizedBallot.json'; //for voting feature
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  contract: ethers.Contract;
  provider: ethers.Provider;
  wallet: ethers.Wallet;

  constructor(private configService: ConfigService) {
    this.provider = new ethers.JsonRpcProvider(
      this.configService.get<string>('RPC_ENDPOINT_URL'),
    );
    this.wallet = new ethers.Wallet(
      this.configService.get<string>('PRIVATE_KEY'),
      this.provider,
    );
    this.contract = new ethers.Contract(
      this.configService.get<string>('TOKEN_ADDRESS'),
      tokenJson.abi,
      this.wallet,
    );
  }

  getHello(): string {
    return 'Hello ljjjd!';
  }

  getSomethingElse(): string {
    return 'Something else';
  }

  getContractAddress(): string {
    return this.configService.get<string>('TOKEN_ADDRESS');
  }

  async getTokenName(): Promise<string> {
    const name = await this.contract.name();
    return name;
  }

  async getTotalSupply() {
    const totalSupply = await this.contract.totalSupply();
    return ethers.formatUnits(totalSupply);
  }
  async getTokenBalance(address: string) {
    const balance = await this.contract.balanceOf(address);
    return ethers.formatUnits(balance);
  }
  async getTransactionReceipt(hash: string) {
    const txReceipt = await this.provider.getTransaction(hash);
    return txReceipt;
  }

  getServerWalletAddress() {
    return this.wallet.address;
  }
  async checkMinterRole(address: string) {
    const MINTER_ROLE = await this.contract.MINTER_ROLE(); //geting the address of the deployed SC FROM .ENV
    const hasRole = await this.contract.hasRole(MINTER_ROLE, address);
    return hasRole;
  }

  async givingRole(address: string) {
    try {
      const code = await this.contract.MINTER_ROLE();
      const roleTx = await this.contract.grantRole(code, address);
      await roleTx.wait(); // Wait for the transaction to be mined
      return { success: true, transactionHash: roleTx.hash };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async mintTokens(address: string, value: string) {
    try {
      const tx = await this.contract.mint(address, ethers.parseUnits(value));
      await tx.wait(); // Wait for the transaction to be mined
      return { success: true, transactionHash: tx.hash };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async vote(proposalNumber: string, amount: string) {
    try {
      const tx = await this.contract.vote(
        proposalNumber,
        ethers.parseUnits(amount),
      );
      await tx.wait(); // Wait for the transaction to be mined
      return { success: true, transactionHash: tx.hash };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
