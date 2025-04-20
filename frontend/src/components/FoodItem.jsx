import { useContext, useState } from "react"
import { assets } from "../assets/assets"
import "../css/FoodItem.css"
import { StoreContext } from "../context/StoreContext";

export default function FoodItem({id, name, price, description, image}){

    const [count , setcount] = useState(0); 
    const {cartItems, addToCart, removeFromCart, url} = useContext(StoreContext)
    return (
        <div className="food-item">
            <div className="food-item-img-container">
                <img src={url+"/images/"+image} alt="" className="food-item-img" />
                {
                    !cartItems[id] ? <img onClick={()=> addToCart(id)} className="add" src={assets.add_icon_white} /> : 
                    <div className="food-item-counter">
                        <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} />
                        {cartItems[id]}
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green}  />
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">$ {price}</p>
            </div>
        </div>
    )
}