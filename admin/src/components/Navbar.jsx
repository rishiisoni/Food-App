import '../css/Navbar.css'
import { assets } from '../assets/assets.js'

export default function Navbar () {
    return (
        <>
        <div className="navbar">
            <img className='logo' src={assets.logo} alt="" />
            <img className='profile' src={assets.profile_image} alt="" />
        </div>
        </>
    )
}