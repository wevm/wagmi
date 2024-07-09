// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Foo {
  string public bar;

  function setFoo(string memory baz) public {
    bar = baz;
  }
}
