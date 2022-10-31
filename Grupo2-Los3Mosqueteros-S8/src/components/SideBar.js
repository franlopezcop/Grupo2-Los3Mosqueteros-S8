import { Link } from "react-router-dom";

import image from "../assets/images/logo-BF.png";

function SideBar() {
  return (
    <ul
      className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/*<!-- Sidebar - Brand -->*/}
      <a
        className=" d-block "
        href="/"
      >
        <div className="sidebar-brand-icon">
          <img className="w-100" src={image} alt="Blackfe" />
        </div>
      </a>

      {/*<!-- Divider -->*/}
      <hr className="sidebar-divider my-0" />

      {/*<!-- Nav Item - Dashboard -->*/}
      <li className="nav-item active">
        <Link className="nav-link" to="/">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard - Products</span>
        </Link>
      </li>

      {/*<!-- Divider -->*/}
      <hr className="sidebar-divider" />

      {/*<!-- Heading -->*/}
      <div className="sidebar-heading">Actions</div>

      {/*<!-- Nav Item - Search Movies -->*/}
      <li className="nav-item">
        <Link className="nav-link collapsed" to="/search-products">
          <i className="fas fa-fw fa-search"></i>
          <span>Search Products</span>
        </Link>
      </li>

      {/*<!-- Nav Item - Content Movies -->*/}
      <li className="nav-item">
        <Link className="nav-link collapsed" to="/content-app">
          <i className="fas fa-fw fa-folder"></i>
          <span>Content Product</span>
        </Link>
      </li>

      {/*<!-- Nav Item - Last Movie In Db -->*/}
      <li className="nav-item">
        <Link className="nav-link" to="/last-product-in-db">
          <i className="fas fa-fw fa-chart-area"></i>
          <span>Last Product In Db</span>
        </Link>
      </li>

      {/*<!-- Nav Item - Genres In Db -->*/}
      <li className="nav-item">
        <Link className="nav-link" to="/categories-in-db">
          <i className="fas fa-fw fa-film"></i>
          <span>Categories In Db</span>
        </Link>
      </li>

      {/*<!-- Nav Item - Movies Chart -->*/}
      <li className="nav-item">
        <Link className="nav-link" to="/products-chart">
          <i className="fas fa-fw fa-table"></i>
          <span>Products Chart</span>
        </Link>
      </li>

      {/*<!-- Divider -->*/}
      <hr className="sidebar-divider d-none d-md-block" />
    </ul>
  );
}

export default SideBar;
