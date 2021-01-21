import React, { Component } from "react";
import queryString from "query-string";
import axios from "axios";
import Pagination from "react-js-pagination";
//import Details from './Details'
import "../styles/Filter.css";
//import breakfast from "./Images/breakfast.png";
//const imagePath=require(`./${image}`).default;
// import Pagination from './Pagination'
class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurantData: [],
      restaurants:[],
      locationList: [],
      pageCount: [],
      cityList: [],
      MealType: undefined,
      location: undefined,
      cuisine: [],
      hcost: undefined,
      lcost: undefined,
      //page: 1,
      sortType: undefined,
      //activePage: 1
      // posts:[],
      currentPage:1,
      postsPerPage:2
      // limit:2,
      // skip:0
    };
  }
    clickHandler(item){
        this.props.history.push(`/restaurants?id=${item._id}`)
    }

  componentDidMount() {
    const { cityList } = this.state;
    const querystring = queryString.parse(this.props.location.search);
    const { mealtype,city } = querystring;
    //console.log(querystring);
    const req = {
      mealtype: parseInt(mealtype)
    };
    axios({
      method: "POST",
      url: "http://localhost:1998/restaurantDataByMealType",
      headers: { "Content-Type": "application/json" },
      data: req,
    })
      .then((result) => {
        this.setState({
          restaurantData: result.data.restaurantData,
          MealType: parseInt(mealtype)
        });
      })
      .catch((error) => {
        console.log(error);
      });
    axios({
      method: "GET",
      url: `http://localhost:1998/city`,
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => {
        console.log(result);
        this.setState({
          cityList: result.data.cityList,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handlerChange=(event)=>{
    const cityId=event.target.selectedOptions[0].value;
    console.log(cityId)
    sessionStorage.setItem("city",cityId);
    const { restaurantData = [] } = this.state;
    if (restaurantData.indexOf(cityId) == -1) {
      restaurantData.push(cityId);
    } else {
      var index = restaurantData.indexOf(cityId);
      console.log(index)
      restaurantData.splice(index, 1);
    }
   axios({
       method:'GET',
       url:`http://localhost:1998/restaurantBycity/${cityId}`,
       headers:{'Content-Type':'application/json'},
   }).then(result=>{
     console.log(result)
       this.setState({
           restaurantData:result.data.restaurantData
       })
   }).catch(err=>{
       console.log(err)
   })
  }
  cuisineHandler(cuisineId) {
    const { cuisine = [], MealType } = this.state;
    if (cuisine.indexOf(cuisineId) == -1) {
      cuisine.push(cuisineId);
    } else {
      var index = cuisine.indexOf(cuisineId);
    //  console.log(index)
      cuisine.splice(index, 1);
    }
    let cuisineObj = {
      cuisine_id: cuisine,
      mealtype: MealType,
    };
    console.log(cuisineObj)
    axios({
      method: "POST",
      url: "http://localhost:1998/restaurantDataByMealType",
      headers: { "Content-Type": "application/json" },
      data: cuisineObj,
    })
      .then((result) => {
        this.setState({
          restaurantData: result.data.restaurantData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  costHandler=((cost1,cost2)=>{
    const{restaurantData=[]}=this.state;
    // if (restaurantData.indexOf(cost1) == -1) {
    //   restaurantData.push(cost1);
    // } else {
    //   var index = restaurantData.indexOf(cost1);
    //   restaurantData.splice(index, 1);
    // }
    let costObj={
      cost1:parseInt(cost1),
      cost2:parseInt(cost2)
    };
    axios({
      method: "POST",
      url: "http://localhost:1998/restaurantByCost",
      headers: { "Content-Type": "application/json" },
      data: costObj,
    })
      .then((result) => {
        console.log(result)
        this.setState({
          restaurantData: result.data.restaurantData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  })
  // handlerChange=()=>{
  //     //cost cityId=event.target.selectedOptions[0].value;
  //     // sessionStorage.setItem("city",cityId);
  //     const{cityList}=this.state
  //     axios({
  //         method:'GET',
  //         url:`http://localhost:8000/city`,
  //         headers:{'Content-Type':'application/json'}
  //     }).then(result=>{
  //        console.log(result)
  //         this.setState({
  //             cityList:result.data.cityList
  //         })
  //     }).catch(err=>{
  //         console.log(err)
  //     }
  // }
  sortHandler=(sortValue)=>{
    const {restaurantData=[]}=this.state
    const querystring1 = queryString.parse(this.props.location.search);
    const { mealtype } = querystring1;
    console.log(mealtype);
    const req1 = {
      mealtype: parseInt(mealtype),
      cost:sortValue.toString()
    }; 
    console.log(req1);
    axios({
      method: "POST",
      url: 'http://localhost:1998/restaurantBySort',
      headers: { "Content-Type": "application/json" },
      data:req1
    })
      .then((result) => {
        console.log(result)
        this.setState({
          restaurantData: result.data.restaurantData,
          MealType: parseInt(mealtype),
          sortType:sortValue
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // nextPage=()=>{
  //   const {limit,skip}=this.state
  //   this.setState({
  //     skip: this.state.skip + this.state.limit
  //   })
  // }
  // previousPage=()=>{
  //   const {limit,skip}=this.state
  //   if(this.state.skip>0){
  //     this.setState({
  //       skip: this.state.skip - this.state.limit
  //     })
  //   }
  // }
  handlePageChange(pageNumber){
    // const {activePage}=this.state
   
    this.setState({
      currentPage:pageNumber
    })
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }
  render() {
    const { restaurantData, cityList,sortType,currentPage,postsPerPage ,posts,restaurants} = this.state;
    // const sorted=restaurantData.sort((a,b)=>{
    //     const isReversed=(sortType==='asc')?1:-1;
    //     return isReversed * a.cost.localeCompare(b.cost)
    // })
    const indexOfLastPost=currentPage*postsPerPage;//2
    const indexOfFirstPost=indexOfLastPost-postsPerPage;//0
    const current=restaurantData.slice(indexOfFirstPost,indexOfLastPost);

    return (
      <React.Fragment>
        <div id="myId" className="mainheading">
          Available restaurants in India
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-4 col-md-4 col-lg-4 filter-options">
              <span
                className="glyphicon glyphicon-th-list toggle-span"
                data-toggle="collapse"
                data-target="#demo"
              ></span>
              <div id="demo" className="collapse show">
                <div className="filter-heading">Filters</div>
                <div
                  className="Select-Location" >
                  Select Location
                </div>
                <select className="Rectangle-2236" onChange={this.handlerChange} >
                  <option>Select</option>
                  {cityList.map((city, index) => {
                    return (
                      <option key={index} value={city.city_id}>
                        {city.name}
                      </option>
                    );
                  })}
                </select>
                <div className="Cuisine">Cuisine</div>
                <div style={{ display: "block" }}>
                  <input
                    type="checkbox"
                    value="0"
                    onChange={() => this.cuisineHandler(1)}
                  />
                  <span className="checkbox-items">North Indian</span>
                </div>
                <div style={{ display: "block" }}>
                  <input
                    type="checkbox"
                    onChange={() => this.cuisineHandler(2)}
                  />
                  <span className="checkbox-items">South Indian</span>
                </div>
                <div style={{ display: "block" }}>
                  <input
                    type="checkbox"
                    onChange={() => this.cuisineHandler(3)}
                  />
                  <span className="checkbox-items">Chineese</span>
                </div>
                <div style={{ display: "block" }}>
                  <input
                    type="checkbox"
                    onChange={() => this.cuisineHandler(4)}
                  />
                  <span className="checkbox-items">Fast Food</span>
                </div>
                <div style={{ display: "block" }}>
                  <input
                    type="checkbox"
                    onChange={() => this.cuisineHandler(5)}
                  />
                  <span className="checkbox-items">Street Food</span>
                </div>
                <div className="Cuisine">Cost For Two</div>
                <div style={{ display: "block" }}>
                  <input type="radio" name="rdo" id="cost_type_1" onChange={()=>this.costHandler(1,500)}/>
                  <span className="checkbox-items">Less than ₹ 500</span>
                </div>
                <div style={{ display: "block" }}>
                  <input type="radio" name="rdo" id="cost_type_2" onChange={()=>this.costHandler(500,1000)}/>
                  <span className="checkbox-items">₹ 500 to ₹ 1000</span>
                </div>
                <div style={{ display: "block" }}>
                  <input type="radio" name="rdo" id="cost_type_3" onChange={()=>this.costHandler(1000,1500)}/>
                  <span className="checkbox-items">₹ 1000 to ₹ 1500</span>
                </div>
                <div style={{ display: "block" }}>
                  <input type="radio" name="rdo" id="cost_type_4"onChange={()=>this.costHandler(1500,2000)} />
                  <span className="checkbox-items">₹ 1500 to ₹ 2000</span>
                </div>
                <div style={{ display: "block" }}>
                  <input type="radio" name="rdo" id="cost_type_5" onChange={()=>this.costHandler(2000)}/>
                  <span className="checkbox-items">₹ 2000 +</span>
                </div>
                <div className="Cuisine">Sort</div>
                <div style={{ display: "block" }}>
                  <input type="radio" name="rdo1" onClick={()=>this.sortHandler('asc')}/>
                  <span className="checkbox-items">Price low to high</span>
                </div>
                <div style={{ display: "block" }}>
                  <input type="radio" name="rdo1" onClick={()=>this.sortHandler('desc')}/>
                  <span className="checkbox-items">Price high to low</span>
                </div>
              </div>
            </div>
            <div className="col-sm-8 col-md-8 col-lg-8">
              {current.length > 0 ? (
                current.map((item) => {
                  return (
                    <div className="Item" onClick={() => this.clickHandler(item)}>
                      <div className="row pl-1">
                        <div className="col-sm-4 col-md-4 col-lg-4">
                          <img
                            className="image"
                            src={item.thumb}
                            style={{ width: "150px", height: "120px" }}
                          />
                        </div>
                        <div className="col-sm-8 col-md-8 col-lg-8">
                          <div className="rest-name">{item.name}</div>
                          <div className="res-location">
                            {item.locality},{item.city_name}
                          </div>
                          <div className="rest-address">{item.address}</div>
                        </div>
                      </div>
                      <hr />
                      <div className="row padding-left">
                        <div className="col-sm-12 col-md-12 col-lg-12">
                        
                          <div className="rest-address">
                            CUISINES :
                            {
                            
                            item.Cuisine.map((itm) => itm.name + ", ")

                          }
                          </div>
                          <div className="rest-address">
                            COST FOR TWO : {item.cost}{" "}
                          </div>

                         
                         
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="no_r_f">Sorry,no results found</div>
              )}
              <div className="pagination">
                   <Pagination
                     activePage={this.state.activePage}
                     itemsCountPerPage={2}
                     totalItemsCount={6}
                     pageRangeDisplayed={5}
                     onChange={this.handlePageChange.bind(this)}
                     /> 
                     {/* <Pagination /> */}
                    
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Filter;
