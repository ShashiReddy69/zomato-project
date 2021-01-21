import { Route, BrowserRouter } from "react-router-dom";
import Details from "./Details";
import Filter from "./Filter";
import Home from "./Home";
import Header from "./Header";
import Transaction from "./Transaction";
const Router = () => {
  return (
    <BrowserRouter>
      <Header />
       <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/filter" component={Filter} />
      <Route path="/restaurants" component={Details} />
      <Route path="/transaction" component={Transaction} />
    </BrowserRouter>
  );
};
export default Router;
