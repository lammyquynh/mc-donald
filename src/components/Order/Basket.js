import React from 'react';
import { postData } from '../../utils/callApi';

export default function Basket(props) {
    const { cartItems, setCartItems, onAdd, onRemove } = props;
    const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
    const taxPrice = itemsPrice * 0.14;
    const shippingPrice = itemsPrice > 2000 ? 0 : 20;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    const handleClick = () => {
        postData('order', {
            key: "1234",
            imei: "mayban",
            userPhone: "0933330632",
            storedId: "123",
            cash: true,
            total: itemsPrice,
            status: "WAITING",
            checkout: "Y",
            address: "83 Hoàn Thế Thiện, Hải An, Hải Phòng",
            orderDetail: cartItems.map((element) => {
                return {
                    foodId: element.foodid,
                    foodPrice: element.price,
                    foodQuantity: element.qty
                }
            })
        }, null, null, (data) => {
            if (data.success = 'true') {
                setCartItems([]);
            }
        })
    }

    return (
        <aside className="block col-1">
            <h2>Cart Items</h2>
            <div>
                {cartItems.length === 0 && <div>Cart is empty</div>}
                {cartItems.map((item) => (
                    <div key={item.id} className="row">
                        <div className="col-2">{item.foodname}</div>
                        <div className="col-2">
                            <button onClick={() => onRemove(item)} className="remove">
                                -
                            </button>{' '}
                            <button onClick={() => onAdd(item)} className="add">
                                +
                            </button>
                        </div>

                        <div className="col-2 text-right">
                            {item.qty} x ${item.price.toFixed(2)}
                        </div>
                    </div>
                ))}

                {cartItems.length !== 0 && (
                    <>
                        <hr></hr>
                        {/* <div className="row">
                            <div className="col-2">Items Price</div>
                            <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
                        </div> */}
                        {/* <div className="row">
                            <div className="col-2">Tax Price</div>
                            <div className="col-1 text-right">${taxPrice.toFixed(2)}</div>
                        </div>
                        <div className="row">
                            <div className="col-2">Shipping Price</div>
                            <div className="col-1 text-right">
                                ${shippingPrice.toFixed(2)}
                            </div>
                        </div> */}

                        <div className="row">
                            <div className="col-2">
                                <strong>Total Price</strong>
                            </div>
                            <div className="col-1 text-right">
                                <strong>${itemsPrice.toFixed(2)}</strong>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <button style={{ width: "100%" }} onClick={() => handleClick()}>
                                Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </aside>
    );
}