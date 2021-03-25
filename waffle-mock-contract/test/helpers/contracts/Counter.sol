pragma solidity ^0.6.3;

contract Counter {
    uint private value;

    function increment() public {
        value += 1;
    }

    function increaseBy(uint a) public {
        require(a > 0, "A must be greater than 0");

        value += a;
    }

    function increaseByThreeValues(uint a, uint b, uint c) public {
        require(a > 0, "A must be greater than 0");
        require(b > 0, "B must be greater than 0");
        require(c > 0, "C must be greater than 0");

        value += a;
        value += b;
        value += c;
    }

    function read() public view returns (uint) {
        return value;
    }

    function add(uint a) public view returns (uint) {
        return value + a;
    }

    function addThree(uint a, uint b, uint c) public view returns (uint) {
        require(a > 0, "A must be greater than 0");
        require(b > 0, "B must be greater than 0");
        require(c > 0, "C must be greater than 0");

        return value + a + b + c;
    }

    function testArgumentTypes(uint a, bool b, string memory s, bytes memory bs) public pure returns (bytes memory ret) {
        ret = abi.encodePacked(a, b, s, bs);
    }

  function swap(uint amount0Out, uint amount1Out, bytes calldata data) external view {

  }
}
