import { useContext } from "react"
import "../css/Cart.css"
import { StoreContext } from "../context/StoreContext"
import { useNavigate } from 'react-router-dom'

export default function Cart(){

    const {cartItems, food_list, removeFromCart, getTotalCartAmount, url} = useContext(StoreContext);

    const navigate = useNavigate();

    return (
        <div className="cart">
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {
                    food_list.map((item, index)=> {
                        if(cartItems[item._id] > 0){
                            return (
                                <div className="cart-items-title cart-items-item" key={index}>
                                    <img src={url+"/images/"+item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>${item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>${item.price*cartItems[item._id]}</p>
                                    <p onClick={()=> removeFromCart(item._id)} className="cross">X</p>
                                </div>
                            )
                        }
                    })
                }
            </div>

            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>{getTotalCartAmount()}</p>
                        </div>
                        <div className="cart-total-details">
                            <p>Delivery</p>
                            <p>{getTotalCartAmount() > 0 ? 4 : 0}</p>
                        </div>
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>{getTotalCartAmount() > 0 ? getTotalCartAmount() + 4 : 0}</b>
                        </div>
                    </div>
                    <button onClick={()=>navigate('/placeorder')}>Proceed To Checkout</button>
                </div>
                <div className="cart-promo-code">
                    <div>
                        <p>Have promo code? Enter it here.</p>
                        <div className="cart-promo-code-input">
                            <input type="text" placeholder="promo "/>
                            <button>Sumbit</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}