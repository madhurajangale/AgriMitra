// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AgrimitraOrder {

    enum OrderStatus { Placed, Accepted, Shipped, Delivered, Cancelled }

    struct Order {
        uint256 orderId;
        address customer;
        address farmer;
        string customerName;
        string farmerName;
        string productName;
        uint256 quantity;
        uint256 totalPrice;
        uint256 timestamp;
        OrderStatus status;
    }

    uint256 public orderCounter;

    mapping(uint256 => Order) public orders;
    mapping(address => uint256[]) public customerOrders;
    mapping(address => uint256[]) public farmerOrders;

    event OrderPlaced(
        uint256 indexed orderId,
        address indexed customer,
        address indexed farmer,
        string productName,
        uint256 quantity,
        uint256 totalPrice
    );

    modifier validAddress(address _addr) {
        require(_addr != address(0), "Invalid address");
        _;
    }

    function placeOrder(
        address _farmer,
        string calldata _customerName,
        string calldata _farmerName,
        string calldata _productName,
        uint256 _quantity,
        uint256 _totalPrice
    ) external validAddress(_farmer) {

        require(_quantity > 0, "Quantity must be > 0");
        require(_totalPrice > 0, "Invalid price");

        orderCounter++;

        orders[orderCounter] = Order({
            orderId: orderCounter,
            customer: msg.sender,
            farmer: _farmer,
            customerName: _customerName,
            farmerName: _farmerName,
            productName: _productName,
            quantity: _quantity,
            totalPrice: _totalPrice,
            timestamp: block.timestamp,
            status: OrderStatus.Placed
        });

        customerOrders[msg.sender].push(orderCounter);
        farmerOrders[_farmer].push(orderCounter);

        emit OrderPlaced(
            orderCounter,
            msg.sender,
            _farmer,
            _productName,
            _quantity,
            _totalPrice
        );
    }

    function updateOrderStatus(uint256 _orderId, OrderStatus _status) external {
        Order storage order = orders[_orderId];

        require(
            msg.sender == order.farmer || msg.sender == order.customer,
            "Not authorized"
        );

        order.status = _status;
    }

    function getCustomerOrders(address _customer)
        external
        view
        returns (uint256[] memory)
    {
        return customerOrders[_customer];
    }

    function getFarmerOrders(address _farmer)
        external
        view
        returns (uint256[] memory)
    {
        return farmerOrders[_farmer];
    }
}
