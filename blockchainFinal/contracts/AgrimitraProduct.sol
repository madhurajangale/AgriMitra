// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AgrimitraProduct {

    uint256 public productCount;

    struct Product {
        uint256 id;
        string name;
        string farmerEmail;
        uint256 quantity;
        string unit;
        uint256 marketPrice;
        uint256 deliveryCharge;
        string category;
        uint256 timestamp;
    }

    mapping(uint256 => Product) public products;

    event ProductAdded(
        uint256 indexed productId,
        string name,
        string farmerEmail,
        uint256 quantity,
        string unit,
        uint256 marketPrice,
        string category,
        uint256 timestamp
    );

    function addProduct(
        string memory _name,
        string memory _farmerEmail,
        uint256 _quantity,
        string memory _unit,
        uint256 _marketPrice,
        uint256 _deliveryCharge,
        string memory _category
    ) external {
        productCount++;

        products[productCount] = Product(
            productCount,
            _name,
            _farmerEmail,
            _quantity,
            _unit,
            _marketPrice,
            _deliveryCharge,
            _category,
            block.timestamp
        );

        emit ProductAdded(
            productCount,
            _name,
            _farmerEmail,
            _quantity,
            _unit,
            _marketPrice,
            _category,
            block.timestamp
        );
    }

    function getProduct(uint256 _id) external view returns (Product memory) {
        return products[_id];
    }
}
