import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { MintTokenDto } from './dtos/mintToken.dto';
import { SubscribersDto } from './dtos/subscribers.dto';
import { VotingDto } from './dtos/voting.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('something-else')
  getSomethingElse(): string {
    return this.appService.getSomethingElse();
  }

  @Get('contract-address')
  getContractAddress() {
    return { result: this.appService.getContractAddress() };
  }
  @Get('token-name')
  async getTokenName() {
    return { result: await this.appService.getTokenName() };
  }
  @Get('total-supply')
  async getTotalSupply() {
    return { result: await this.appService.getTotalSupply() };
  }

  @Get('token-balance/:address')
  async getTokenBalance(@Param('address') address: string) {
    return { result: await this.appService.getTokenBalance(address) };
  }

  @Get('transaction-receipt')
  async getTransactionReceipt(@Query('hash') hash: string) {
    return { result: await this.appService.getTransactionReceipt(hash) };
  }
  //
  @Get('server-wallet-address')
  getServerWalletAddress() {
    return { result: this.appService.getServerWalletAddress() };
  }

  @Get('check-minter-role')
  async checkMinterRole(@Query('address') address: string) {
    return { result: await this.appService.checkMinterRole(address) };
  }

  @Post('mint-tokens')
  async mintTokens(@Body() body: MintTokenDto) {
    const { address, value } = body;
    return { result: await this.appService.mintTokens(address, value) };
  }

  @Post('self-delegate')
  async selfDelegate(@Body() body: SubscribersDto) {
    const { address } = body;
    return { result: await this.appService.selfDelegate(address) };
  }

  @Post('granted-role')
  async givingRole(@Body() body: SubscribersDto) {
    const { address } = body;
    return { result: await this.appService.givingRole(address) };
  }

  @Post('vote')
  async vote(@Body() body: VotingDto) {
    const { proposalNumber, amount } = body;
    return { result: await this.appService.vote(proposalNumber, amount) };
  }

  @Get('get-proposals')
  async getProposals() {
    return { result: await this.appService.getProposals() };
  }

  @Get('get-votingPower/:address')
  async getVotingPower(@Param('address') address: string) {
    return { result: await this.appService.getVotingPower(address) };
  }
  @Get('proposal0')
  async proposal0() {
    return {result: await this.appService.proposal0()};
  }  

  @Get('proposal1')
  async proposal1() {
    return {result: await this.appService.proposal1()};
  }  

  @Get('proposal2')
  async proposal2() {
    return {result: await this.appService.proposal2()};
  }  

  @Get('winning-proposal')
  async getWinningProposal() {
    return {result: await this.appService.getWinningProposal()};
  }
}
