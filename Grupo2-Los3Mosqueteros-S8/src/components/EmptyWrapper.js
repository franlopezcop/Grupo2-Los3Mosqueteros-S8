import Footer from "./Footer";
import TopBar from "./TopBar";

const EmptyWrapper = (props) => {
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <TopBar />
        <div className="container-fluid">
          <div className="d-sm-flex aligns-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
          </div>
          {props.children}
        </div>
        <Footer />
      </div>
    </div>
  );
};
export default EmptyWrapper;
