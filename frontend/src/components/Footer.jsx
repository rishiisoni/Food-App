import { assets } from "../assets/assets"
import "../css/Footer.css"

export default function Footer() {
    return (
        <div className="footer" id="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <img src={assets.logo} />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, tempora quod commodi omnis odio modi reprehenderit illum consequuntur obcaecati eveniet quia at unde, qui officiis temporibus totam, est laboriosam perferendis.</p>
                    <div className="social-img">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-center">
                    <h2>Company</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-right">
                    <h2>Get In Touch</h2>
                    <ul>
                        <li>+993 878 9903</li>
                        <li>contact@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p>Copyright @ All right Reserved</p>
        </div>
    )
}