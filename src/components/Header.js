import { Link } from "react-router-dom";
import "../logo.jpeg";

const Title = ()=>{
    return (
    <a href="/">
      <img className="logo" src="../logo.png" alt="logo"/>
    </a>
    )
  }
  const Header = () =>{
    return(
      <div className="header">
        <Title/>
        <div className="nav-items">
          <ul>
            <li><Link className="nav-links" to='/'>🏠 Home</Link></li>
            <li><Link className="nav-links" to='/about'>📙 About</Link></li>
            <li><Link className="nav-links" to='/contact'>📱 Contact</Link></li>
            <li><Link className="nav-links" to='cart'>🛒 Cart</Link></li>
          </ul>
        </div>
  
      </div>
    )
  }
  export default Header;