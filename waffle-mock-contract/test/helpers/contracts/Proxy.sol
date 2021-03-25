pragma solidity ^0.6.3;

import "./Counter.sol";

contract Proxy {
    Counter private counter;

    constructor (Counter _counter) public {
        counter = _counter;
    }

    function cap(uint a) public pure returns (uint) {
        if (a > 10) {
            return 10;
        }
        return a;
    }

    function readCapped() public view returns (uint) {
        return cap(counter.read());
    }

    function addCapped(uint a) public view returns (uint) {
        return cap(counter.add(a));
    }

    function proxiedSwap(uint amount0Out, uint amount1Out) public view {
      counter.swap(amount0Out, amount1Out, "some call data");
    }
}
