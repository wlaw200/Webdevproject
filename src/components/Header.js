import "../styles/Header.css";
const Header = () => {
    return (
        <div className="header">
            <div className="header-logo">
                <a href="#app">
                    <h3 className="header-name">Loop the loop</h3>
                </a>
            </div>
            <div className="btn-header">
                <div><a href="#login">Log In</a></div>
                <div><a href="#signup">Sign Up</a></div>
            </div>
        </div>
    )
}

export default Header;