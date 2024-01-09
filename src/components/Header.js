import { Link } from "react-router-dom";

const Title = ()=>{
    return (
    <a href="/">
      <h1 className="logo">Bhojan</h1>
    {/* <img className="logo" src ="" alt="logo"/> */}
    </a>
    )
  }
  const Header = () =>{
    return(
      <div className="header">
        <Title/>
        <div className="nav-items">
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
            <li><Link to='cart'>Cart</Link></li>
          </ul>
        </div>
  
      </div>
    )
  }
  export default Header;