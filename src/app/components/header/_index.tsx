import { Link } from "react-router-dom";

const HeaderComponent = () => {
  return (
    <header>
      <div className="header">
        <ul>
          <Link to="/">Home</Link>
          <Link to="/experience">Experience</Link>
          <Link to="/hobbies">Hobbies</Link>
          <Link to="/contact">Contact</Link>
        </ul>
      </div>
    </header>
  );
};

export default HeaderComponent;
