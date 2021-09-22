import React, { useEffect } from "react";
import Basket from "./Basket";
import Main from "./Main";
import Header from "./Header";
import './Order.css'
import { useState } from 'react';
import { getData } from "../../utils/callApi";

export default function Order(props) {

    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const onAdd = (product) => {
        console.log('product', product);
        const exist = cartItems.find((x) => x.foodid === product.foodid);
        if (exist) {
            setCartItems(
                cartItems.map((x) =>
                    x.foodid === product.foodid ? { ...exist, qty: exist.qty + 1 } : x
                )
            );
        } else {
            setCartItems([...cartItems, { ...product, qty: 1 }]);
        }
    };
    const onRemove = (product) => {
        const exist = cartItems.find((x) => x.foodid === product.foodid);
        if (exist.qty === 1) {
            setCartItems(cartItems.filter((x) => x.foodid !== product.foodid));
        } else {
            setCartItems(
                cartItems.map((x) =>
                    x.foodid === product.foodid ? { ...exist, qty: exist.qty - 1 } : x
                )
            );
        }
    };

    useEffect(() => {
        getData('allfood', {
            key: 1234
        }, (data) => {
            setProducts(data)
        });
        //value of state is used here therefore must be passed as a dependency
    }, []);
    return (
        <div>
            <Header countCartItems={cartItems.length}></Header>
            <div className="row">
                <Main products={products} onAdd={onAdd}></Main>
                <Basket
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    onAdd={onAdd}
                    onRemove={onRemove}
                ></Basket>
            </div>
        </div>
    );
}