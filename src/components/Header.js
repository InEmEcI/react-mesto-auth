import logo from "../images/logo.svg";

function Header({ children }) {
  return (
    <header className="header">
      <img src={logo} alt="логотип сайта" className="header__logo" />
      {children && (
        <ul className="header__menu">
        {(children.length > 1 ? children : [children]).map((item, pos) => (
          <li className="header__menu-item" key={pos}>
            {item}
          </li>
        ))}
      </ul>
        
        // <ul className="header__menu">
        //   {(children.length > 1 ? children : [children]).map((item, pos) => (            
        //     <li className="header__menu_item" key={pos}>
        //       {item}
        //     </li>
        //   ))}
        // </ul>
      )}
    </header>
  );
}

export default Header;