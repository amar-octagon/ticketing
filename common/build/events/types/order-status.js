<<<<<<< HEAD
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    //When the order has been created, but the
    // ticket it is trying to order has not been reserved
    OrderStatus["Created"] = "created";
    // The ticket the order is trying to reserve has already
    // been reserved, or when the user has cancelled the order
    // The order expires before payment
    OrderStatus["Cancelled"] = "cancelled";
    OrderStatus["AwaitingPayment"] = "awaiting:payment";
    OrderStatus["Complete"] = "complete";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
=======
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    // When the order has been created, but the
    // ticket it is trying to order has not been reserved
    OrderStatus["Created"] = "created";
    // The ticket the order is trying to reserve has already
    // been reserved, or when the user has cancelled the order.
    // The order expires before payment
    OrderStatus["Cancelled"] = "cancelled";
    // The order has successfully reserved the ticket
    OrderStatus["AwaitingPayment"] = "awaiting:payment";
    // The order has reserved the ticket and the user has
    // provided payment successfully
    OrderStatus["Complete"] = "complete";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
>>>>>>> 9e80ec38869d84def7dd15bd1cd674018ce4b4b4
