import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const StoreContext = createContext(null);


const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "https://food-app-backend-3d51.onrender.com";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const [orderData, setOrderData] = useState({});

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    
        if (token) {
            await axios.post(
                url + "/api/cart/add",
                { itemId },
                { headers: { Authorization: `Bearer ${token}` } } //Corrected header format
            );
        } else {
            console.warn(" No token found. User might be logged out.");
        }
    };
    

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(
                url + "/api/cart/remove",
                { itemId },
                { headers: { Authorization: `Bearer ${token}` } } //Fixed format
            );
        }
    };
    

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(
                url + "/api/cart/get",
                {},
                { headers: { Authorization: `Bearer ${token}` } } // Fixed format
            );
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error("Failed to load cart data:", error.response?.data || error);
        }
    };
    

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    };

    useEffect(() => {
        async function loadData() {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken); 
                await loadCartData(storedToken); // use the storedToken directly
            }
            await fetchFoodList();
        }
        loadData();
    }, []);
    

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                } else {
                    console.warn(`Item with ID ${item} not found in food_list`);
                }
            }
        }
        return totalAmount;
    };
    

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        orderData,
        setOrderData
    }

    return (
        <StoreContext.Provider value={contextValue} >
            {props.children}
        </StoreContext.Provider>

    )
}

export default StoreContextProvider;
