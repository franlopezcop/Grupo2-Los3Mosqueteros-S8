import { Switch, Route } from "react-router-dom";

import SideBar from "./SideBar";
import EmptyWrapper from "./EmptyWrapper";
import ContentWrapper from "./ContentWrapper";
import SearchMovies from "./SearchMovies";
import ContentRowDb from "./ContentRowDb";
import LastProductInDb from "./LastProductInDb";
import CategoriesInDb from "./CategoriesInDb";
import Chart from "./Chart";
import NotFound from "./NotFound";


function App() {
  return (
    <div id="wrapper">
      <SideBar />
      <EmptyWrapper>
        <Switch>
          <Route exact path="/" component={ContentWrapper} />
          <Route path="/search-products" component={SearchMovies} />
          <Route path="/content-app" component={ContentRowDb} />
          <Route path="/last-product-in-db" component={LastProductInDb} />
          <Route path="/categories-in-db" component={CategoriesInDb} /> 
          <Route path="/products-chart" component={Chart} />
          <Route component={NotFound} />
        </Switch>
      </EmptyWrapper>
    </div>
  );
}

export default App;


