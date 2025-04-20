import { menu_list } from '../assets/assets'
import '../css/ExploreMenu.css'

export default function ExploreMenu ({ category, setCategory }) {
    return (
        <div className="explore-menu" id='explore-menu'>
            <h1>Explore our Menu</h1>
            <p className="explore-menu-text">Choose from a diverse menu featuring a dectable array of dishes. Oue mission is to satisfy your craving and elevate your dining experinece, one delicious meal at a time.</p>
            <div className="explore-menu-list">
                {menu_list.map((item, index)=> {
                    return (
                        <div onClick={() => setCategory(prev => (prev === item.menu_name ? "all" : item.menu_name))} key={index} className="explore-menu-list-item">
                            <img src={item.menu_image} className={category===item.menu_name ? "active" : ""} />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr />
        </div>

    )
}