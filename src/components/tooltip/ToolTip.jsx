
import "./ToolTip.css"
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";

const ToolTip = () => {
  return (
    <>
      <ul className="example-2">
        <li className="icon-content">
          <a href="https://www.facebook.com/" aria-label="Facebook" data-social="facebook">
            <div className="filled" />
           <FaFacebook size={30}/>
          </a>
          <div className="tooltip">Facebook</div>
        </li>
        <li className="icon-content">
          <a href="https://www.Twitter.com/" aria-label="Twitter" data-social="twitter">
            <div className="filled" />
            <FaTwitter size={30}/>

          </a>
          <div className="tooltip">Twitter</div>
        </li>
        <li className="icon-content">
          <a href="https://Instagram.com/" aria-label="Instagram" data-social="instagram">
            <div className="filled" />
            <FaInstagram size={30}/>

          </a>
          <div className="tooltip">Instagram</div>
        </li>
        <li className="icon-content">
          <a href="https://telegram.org/" aria-label="Telegram" data-social="telegram">
            <div className="filled" />
<FaTelegramPlane size={30} />
          </a>
          <div className="tooltip">Telegram</div>
        </li>
      </ul>
    </>
  );
}


 

export default ToolTip;
