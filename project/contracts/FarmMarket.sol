// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FarmerMarket {
    struct Product {
        string name;
        uint quantity;
        uint price;
        address farmer;
    }

    Product[] public products;

    function addProduct(string memory _name, uint _quantity, uint _price) public {
        products.push(Product(_name, _quantity, _price, msg.sender));
    }

    function getProduct(uint index) public view returns (string memory, uint, uint, address) {
        Product memory p = products[index];
        return (p.name, p.quantity, p.price, p.farmer);
    }

    function buyProduct(uint index) public payable {
        Product memory p = products[index];
        require(msg.value >= p.price, "Not enough Ether sent");
        payable(p.farmer).transfer(msg.value);
        // Remove product or reduce quantity logic can be added later
    }

    function getProductsCount() public view returns (uint) {
        return products.length;
    }
}
await instance.addProduct("Mango", 100, 5, { from: accounts[0] })
await instance.buyProduct(0, { from: accounts[1], value: web3.utils.toWei("0.01", "ether") })
let instance = await artifacts.require("FarmMarket").deployed()
