import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom" 
import "../css/PlaceOrder.css"
import { StoreContext } from "../context/StoreContext"
import axios from 'axios'

export default function PlaceOrder() {

    const {getTotalCartAmount, token, food_list, cartItems, url, setOrderData} = useContext(StoreContext);
    const navigate = useNavigate();

    const [data, setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        street:"",
        city:"",
        state:"",
        country:"",
        zipcode:"",
        phone:"",
    })

    const handleData = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData(prevData => ({...prevData, [name]:value}));
    }

    const placeOrder = async (event) => {
        event.preventDefault();
    
        //console.log("Token before request:", token);  // Log token
    
        let orderItems = food_list
            .filter(item => cartItems[item._id] > 0)
            .map(item => ({ ...item, quantity: cartItems[item._id] }));
    
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 4
        };
    
        try {
            //console.log("entered try block");
            const response = await axios.post(url + "/api/order/place", orderData, {
                headers: { Authorization: `Bearer ${token}` } //  Correct token format
            });
            //console.log("Order saved:", response.data);
            setOrderData(orderData);
            navigate("/myorders");
        } catch (error) {
            console.error("Order placement failed:", error.response?.data || error);
        }
    };

    useEffect(()=>{
        if(!token){
            navigate('/cart');

        }
        else if(getTotalCartAmount() === 0){
            navigate('/cart');
        }
    },[token])
    

    return (
        <form onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input name='firstName' value={data.firstName} onChange={handleData} type="text" placeholder="First name" required/>
                    <input name='lastName' value={data.lastName} onChange={handleData} type="text" placeholder="Last name" required/>
                </div>
                <input name='email' value={data.email} onChange={handleData} type="email" placeholder="@email" required/>
                <input name='street' value={data.street} onChange={handleData} type="text" placeholder="Street" required/>
                <div className="multi-fields">
                    <input name='city' value={data.city} onChange={handleData} type="text" placeholder="City" required/>
                    <input name='state' value={data.state} onChange={handleData} type="text" placeholder="State" required/>
                </div>
                <div className="multi-fields">
                    <input name='zipcode' value={data.zipcode} onChange={handleData} type="text" placeholder="Zip Code" required/>
                    <input name='country' value={data.country} onChange={handleData} type="text" placeholder="Country" required/>
                </div>
                <input name='phone' value={data.phone} onChange={handleData} type="text" placeholder="Phone" required/>
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>{getTotalCartAmount()}</p>
                        </div>
                        <div className="cart-total-details">
                            <p>Delivery</p>
                            <p>+{getTotalCartAmount() > 0 ? 4 : 0}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>{getTotalCartAmount() > 0 ? getTotalCartAmount() + 4 : 0}</b>
                        </div>
                    </div>
                    <button type="sumbit">Confirm Order</button>
                </div>
            </div>

        </form>
    )
}