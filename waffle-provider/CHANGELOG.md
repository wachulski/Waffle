# @ethereum-waffle/provider

## 3.3.2

### Patch Changes

- 7b85871: Updates ganache-core to 2.13.2 to take advantage of the [recent removal](https://github.com/trufflesuite/ganache-core/commit/a74efcec6b868e5778609dd95d26e5cd1f32e43a#diff-7ae45ad102eab3b6d7e7896acd08c427a9b25b346470d7bc6507b6481575d519) of a few bundled dependencies, making waffle a lighter dependency itself :)
- Updated dependencies [7b85871]
  - @ethereum-waffle/ens@3.2.4

## 3.3.1

### Patch Changes

- 6952eb9: Fixes HardHat problem: @ethereum-waffle/provider breaks source maps #281 (Lazy load ganache-core to avoid loading source-map-support too early)

## 3.3.0

### Minor Changes

- 1d7b466: Fix changeTokenBalance and changeTokenBalances matchers for contracts with overloaded balanceOf

  New matchers for BigNumber: within and closeTo

  Typechain integration

  Fix revertedWith functionality
