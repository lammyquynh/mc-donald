import React from 'react';

export default function Product(props) {
    const { product, onAdd } = props;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', margin: "10px", backgroundColor: 'white', borderRadius: 8 }}>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', height: "100%", paddingLeft: 8 }}>
                <img className="small" src={product.foodimg} alt={product.foodname} style={{ alignSelf: 'center' }} />
                <h3>{product.foodname}</h3>
                <div>{product.price} VNĐ</div>
            </div>
            <button style={{ display: 'flex', flex: 0, width: "100%" }} onClick={() => onAdd(product)}>Add To Cart</button>
        </div >
    );
}