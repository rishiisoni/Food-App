import { useContext } from "react"
import "../css/FoodDisplay.css"
import { StoreContext } from "../context/StoreContext"
import FoodItem from "./FoodItem"

export default function FoodDisplay({ category }) {

    const { food_list } = useContext(StoreContext)

    return (
        <div className="food-display" id="food-dispaly">
            <h2>Top Dishes Near you </h2>
            <div className="food-display-list">
                {food_list.map((item, index) => {
                    if (category === "all" || category === item.category) {
                        return <FoodItem key={index} name={item.name} image={item.image} id={item._id} price={item.price} description={item.description} />
                    }
                })}
            </div>
        </div>
    )
}