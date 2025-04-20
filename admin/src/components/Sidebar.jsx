import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import '../css/Sidebar.css'

export default function Sidebar () {
    return (
        <div className="sidebar">
            <div className="sidebar-options">
                <NavLink to='/addproduct' className="sidebar-option">
                    <img src={assets.add_icon} alt="" />
                    <p>Add Items</p>
                </NavLink>
                <NavLink to='/productlist' className="sidebar-option">
                    <img src={assets.order_icon} alt="" />
                    <p>List Items</p>
                </NavLink>
                <NavLink to='orders'className="sidebar-option">
                    <img src={assets.order_icon} alt="" />
                    <p>Orders</p>
                </NavLink>
            </div>
        </div>
    )
}