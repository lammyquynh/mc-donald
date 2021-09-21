import React from "react";

export default function Header(props) {
    return (
        <header className="block row center">
            <div>
                <h1>Menu Mc.Donald</h1>
            </div>
            <div>
                Order Detail{' '}
                {props.countCartItems ? (
                    <button className="badge">{props.countCartItems}</button>
                ) : (
                    ''
                )}
            </div>
        </header>
    );
}