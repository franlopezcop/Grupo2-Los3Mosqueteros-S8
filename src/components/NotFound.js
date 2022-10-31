import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ margin: "0 auto", width: "30%" }}>
      <h2>Error 404 - Not Found</h2>
      <Link to="/">Go Back Home</Link>
    </div>
  );
};
export default NotFound;
