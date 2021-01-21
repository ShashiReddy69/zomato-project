import React, { Component } from 'react';
import ig from './Images/ig.png'
import axios from 'axios'
import '../styles/wallpaper.css'
import { withRouter } from 'react-router-dom'
class Wallpaper extends Component {
    constructor(props) {
      super(props)
      this.state=({
          suggestions:[],
          text:'',
          restaurantData:[]
      })
    };
    componentDidMount(){

    }
    handleChange=(event)=>{
        const cityId=event.target.selectedOptions[0].value;
         sessionStorage.setItem("city",cityId);
        axios({
            method:'GET',
            url:`http://localhost:1998/restaurantBycity/${cityId}`,
            headers:{'Content-Type':'application/json'}
        }).then(result=>{
            this.setState({
                restaurantData:result.data.restaurantData
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    onTextChange=(event)=>{
        // it finds the restaurants based on the searchInput from searchBox 
        const searchInput=event.target.value;
        const {restaurantData}=this.state;
        let suggestions=[]
        if(searchInput.length>0){
            suggestions=restaurantData.filter(
                item=>item.name.toLowerCase().includes(searchInput)
            );
        }
        this.setState({
            suggestions,
            text:searchInput
        })
    }
    renderSuggestions=()=>{
       const {suggestions}=this.state;
       if(suggestions.length==0){
           return null;
       }
       return(
           <ul className="suggestionBox">
               {
                   suggestions.map((item,index)=>{
                   return(<li key={index} onClick={()=>this.selectRestaurant(item)} value={item}>{`${item.name},${item.city_name}`}</li>)
                   })
               }
           </ul>
       )
     }
    selectRestaurant = (item) => {
       // debugger
        this.props.history.push(`/restaurants?id=${item._id}`)
    }
  render() {
      const {cityList} = this.props
     // console.log(cityList)
     const {text} = this.state;
    return (
      <React.Fragment> 
             <img src={ig} alt='sorry' style={{width:'100%',height:'450px',bottom:'100px'}} />
                                            <div>
                                                <div className="logo">
                                                    <p>e!</p>
                                                </div>
                                                <div className="headings">
                                                    Find the best restaurants, cafes, bars
                                                </div>
                                                <div className="locationSelector">
                                                    <select className="locationDropdown" onChange={this.handleChange}>
                                                        <option value="" selected disabled>Please select a city</option>
                                                       {
                                                        
                                                           cityList.map((city,index)=>{
                                                               return  <option key={index} value={city.city_id}>{city.name}</option>
                                                           })
                                                    
                                                       }
                                                    </select>
                                                    <div>
                                                        <span className="gylphicon glyphicon-search"></span>
                                                        <input className="restaurantsinput" type="text"  value={text} placeholder=" Search for restaurants" onChange={this.onTextChange}/>
                                                        {
                                                            this.renderSuggestions()
                                                        }
                                                    </div>
                                                </div>
                                            </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Wallpaper);
