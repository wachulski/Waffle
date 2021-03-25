import {use, expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {ContractFactory, utils} from 'ethers';
import {MockProvider} from '@ethereum-waffle/provider';
import {waffleChai} from '@ethereum-waffle/chai';

import {deployMockContract} from '../src';
import Counter from './helpers/interfaces/Counter.json';
import Proxy from './helpers/interfaces/Proxy.json';

use(chaiAsPromised);
use(waffleChai);

describe('Mock Contract - Integration (called by other contract)', () => {
  const [wallet] = new MockProvider().getWallets();

  const deploy = async () => {
    const mockCounter = await deployMockContract(wallet, Counter.abi);
    const capFactory = new ContractFactory(Proxy.abi, Proxy.bytecode, wallet);
    const capContract = await capFactory.deploy(mockCounter.address);

    return {mockCounter, capContract};
  };

  it('mocking returned values', async () => {
    const {capContract, mockCounter} = await deploy();

    await mockCounter.mock.read.returns(5);
    expect(await capContract.readCapped()).to.equal(5);

    await mockCounter.mock.read.returns(12);
    expect(await capContract.readCapped()).to.equal(10);
  });

  it('mocking revert', async () => {
    const {capContract, mockCounter} = await deploy();

    await mockCounter.mock.read.reverts();
    await expect(capContract.readCapped()).to.be.revertedWith('Mock revert');
  });

  it('mocking with call arguments', async () => {
    const {capContract, mockCounter} = await deploy();
    await mockCounter.mock.add.withArgs(1).returns(1);
    await mockCounter.mock.add.withArgs(2).returns(2);

    expect(await capContract.addCapped(1)).to.equal(1);
    expect(await capContract.addCapped(2)).to.equal(2);
  });

  it('mocking swap that has calldata in catch-all manner', async () => {
    const {capContract, mockCounter} = await deploy();
    await mockCounter.mock.swap.returns();

    await capContract.proxiedSwap(10, 20);

    expect('swap').to.be.calledOnContractWith(mockCounter, [10, 20, utils.toUtf8Bytes('some call data')]);
  });

  it('mocking swap that has calldata with args that DO match', async () => {
    const {capContract, mockCounter} = await deploy();
    await mockCounter.mock.swap.withArgs(10, 20, utils.toUtf8Bytes('some call data')).returns();

    await capContract.proxiedSwap(10, 20);

    expect('swap').to.be.calledOnContractWith(mockCounter, [10, 20, utils.toUtf8Bytes('some call data')]);
  });

  it('mocking swap that has calldata with args that DO NOT match', async () => {
    const {capContract, mockCounter} = await deploy();
    await mockCounter.mock.swap.withArgs(10, 20, utils.toUtf8Bytes('NOTE!!!! Other call data')).returns();

    // this fails
    await capContract.proxiedSwap(10, 20);
  });
});
