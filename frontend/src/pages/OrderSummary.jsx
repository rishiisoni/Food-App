import { assets } from "../assets/assets";
import { useContext, useEffect } from "react";
import { StoreContext } from "../context/StoreContext"


export default function Payment() {

    const { orderData, url } = useContext(StoreContext);

    useEffect(()=>{
        console.log(orderData);
    }, [])

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
            <img src={assets.parcel_icon} alt="" />
                {
                    orderData.items && Array.isArray(orderData.items) ? (
                        orderData.items.map((order, index) => (
                            <div key={index} className="my-order-order">
                                <p><strong>{order.name} X ₹{order.quantity}</strong></p>
                            </div>
                        ))
                    ) : (
                        <p>No orders found</p>
                    )
                }
            </div>
        </div>
    );
}