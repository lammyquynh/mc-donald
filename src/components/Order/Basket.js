import React, { useState } from 'react';
import { postData } from '../../utils/callApi';

export default function Basket(props) {
    const { cartItems, setCartItems, onAdd, onRemove } = props;
    const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
    const taxPrice = itemsPrice * 0.14;
    const shippingPrice = itemsPrice > 2000 ? 0 : 20;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;
    const [userPhone, setUserPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleClick = () => {

        console.log(cartItems);

        if (userPhone == null || userPhone == "") {
            alert("Vui lòng nhập số điện thoại");
            return;
        }
        postData('order', {
            key: "1234",
            imei: "mayban",
            userPhone: userPhone,
            storedId: "123",
            cash: true,
            total: itemsPrice.toString(),
            status: "WAITING",
            checkout: "Y",
            address: address,
            orderDetail: cartItems.map((element) => {
                return {
                    foodId: element.foodid,
                    foodPrice: element.price.toString(),
                    foodQuantity: element.qty.toString()
                }
            })
        }, (data) => {
            if (data.success = 'true') {
                alert("Thanh toán đơn hàng thành công!");
                setCartItems([]);
                setUserPhone("");
                setAddress("");
            }
        })
    }

    return (
        <aside className="block col-1">
            <div>
                <input style={{
                    width: "100%",
                    paddingLeft: "8px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                }} placeholder="Nhập số điện thoại" type="number" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} />
            </div>

            <div>
                <input style={{
                    width: "100%",
                    paddingLeft: "8px",
                    paddingTop: "6px",
                    paddingBottom: "6px",
                    marginTop: "10px"
                }} placeholder="Nhập số địa chỉ" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />

            </div>
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
                            {item.qty} x {item.price.toFixed(2)}
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
                                <strong>{itemsPrice.toFixed(2)} VNĐ</strong>
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