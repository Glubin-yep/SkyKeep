import { Link } from "react-router-dom";
import { Button } from "antd";
import "./Error404.css";

const Error404 = () => {
  return (
    <div className="container">
      <h1 className="heading">404 - Not Found</h1>
      <p className="textStyle">
        Oops! The page you are looking for might be in another castle.
      </p>
      <Link to="/">
        <Button type="primary" size="large">
          Go Home
        </Button>
      </Link>
    </div>
  );
};

export default Error404;
