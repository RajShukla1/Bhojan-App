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
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Cart</li>
          </ul>
        </div>
  
      </div>
    )
  }
  export default Header;