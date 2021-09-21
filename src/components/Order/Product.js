import React from 'react';

export default function Product(props) {
    const { product, onAdd } = props;
    return (
        <div style={{ margin: "10px" }}>
            <div style={{ height: "100%" }}>
                <img className="small" src={product.foodimg} alt={product.foodname} />
                <h3>{product.foodname}</h3>
                <div>${product.price}</div>
            </div>
            <button style={{ flex: 1, width: "100%" }} onClick={() => onAdd(product)}>Add To Cart</button>
        </div >
    );
}