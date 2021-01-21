import React, { Component } from 'react';
import QuickSearchItem from './QuickSearchItem';
class QuickSearches extends Component {
    constructor(){
        super()
    }
  render() {
    const {mealsData,cityList}=this.props;
        return (
      <React.Fragment> 
                                            <div className="quicksearch">
                                                <p className="quicksearchHeading">
                                                    Quick Searches
                                                </p>
                                                <p className="quicksearchSubHeading">
                                                    Discover restaurants by type of meal
                                                </p>
                                                <div className="container-fluid">
                                                    <div className="row">
                                                     {
                                                         mealsData.map((mealsData,index)=>{
                                                          return  <QuickSearchItem key={index} id={index+1} mealsData={mealsData} cityList={cityList}/>  
                                                         })
                                                     }
                                                    </div>
                                                 
                                                </div>
                                            </div>
      </React.Fragment>
    );
  }
}

export default QuickSearches;
