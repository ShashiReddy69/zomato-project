import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
class QuickSearchItem extends Component {
 constructor(props) {
   super(props)
 
   this.state = {
      
   };
 };
 clickHandler(id){
     this.props.history.push(`/filter?mealtype=${id}`)
 }
  render() {
      const {id,mealsData,cityList} = this.props;
      console.log(mealsData)
      const {name,content,image}=mealsData;
      const imagePath=require(`./${image}`).default;
    return (
      <React.Fragment> 
            <div className="col-sm-12 col-md-6 col-lg-4" onClick={()=>this.clickHandler(id)}>
                <div className="tileContainer">
                         <div className="tileComponent1">
                                   <img src={imagePath} alt="problem" style={{height:"150px" ,width:"140px"}} />
                         </div>
                            <div className="tileComponent2">
                                     <div className="componentHeading">
                                                 {name}
                                    </div>
                                 <div className="componentSubHeading">
                                     {content}
                                 </div>
                           </div>
                </div>
           </div>
      </React.Fragment>
    );
  }
}

export default withRouter(QuickSearchItem);
