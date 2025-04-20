import { useState } from "react"
import ExploreMenu from "../components/ExploreMenu"
import Header from "../components/Header"
import "../css/Home.css"
import FoodDisplay from "../components/FoodDisplay";

export default function Home(){

    const [category , setCategory] = useState("all");

    return (
        <div>
            <Header/>
            <ExploreMenu category={category} setCategory={setCategory}/>
            <FoodDisplay category={category} />
        </div>
    )
}