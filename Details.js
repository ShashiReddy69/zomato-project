import React, { Component } from 'react';
import {Tab,TabList,Tabs,TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import '../styles/details.css'
//import breakfast from './Images/breakfast.png'
import queryString from 'query-string'
import Axios from 'axios';
import Modal from 'react-modal'
//import { act } from 'react-dom/test-utils';
//import Transaction from './Transaction'
const customStyles={
  content:{
      top:'50%',
      left:'50%',
      right:'auto',
      bottom:'auto',
      marginRight:'-50%',
      transform:'translate(-50%,-50%)',
      backgroundColor:'lightblue',
      border:'solid 2px tomato'
  }
}
class Details extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        restaurants:{},
        menu:[],
        isModalOpen:false,
        order:[]
      };
    };
    handlePlaceOrder=(e)=>{
     this.setState({
       isModalOpen:true
     })
    }
  componentDidMount(){
    const queryParams=queryString.parse(this.props.location.search);
    const restaurantId=queryParams.id;
    //console.log(restaurantId)
    Axios({
      method:"GET",
      url:`http://localhost:1998/restaurantById/${restaurantId}`,
      headers:{"Content-Type":"application/json"}
    }).then(result=>{
         this.setState({
           restaurants:result.data.restaurants
          })
    }).catch(error=>{
      console.log(error)
    })
    Axios({
      method:"GET",
      url:`http://localhost:1998/menu/${restaurantId}`,
      headers:{"Content-Type":"application/json"}
    }).then(result=>{
         this.setState({
           menu:result.data.menu
          })
    }).catch(error=>{
      console.log(error)
    })
  } 
   cancelOrder=()=>{
    this.setState({
      isModalOpen:false
    })
  }
  render() {
      const {restaurants,isModalOpen,menu}=this.state
    return (
      <div>
       
        <div className="container">
            <img className="img" src={restaurants.thumb} style={{width:'100%',height:'450px',objectFit:"cover"}} />
            <div className="gallery"><button type="button" className="btn btn-primary">Click here to see images</button></div>
            <div className="po"><button type="button" className="btn btn-primary" onClick={()=>this.handlePlaceOrder()}>Place order</button></div>
           <div className="hdr"><h1>{restaurants.name}</h1></div>
           <Tabs>
               <TabList>
                   <Tab>OverView</Tab>
                   <Tab>Contact</Tab>
               </TabList>
                <TabPanel>
                            <div class="content1">
                                    <div class="about">About this place</div>
                                    <div class="head">Cuisine</div>
                                    <div class="value">
                                     {
                                       restaurants.Cuisine&&restaurants.Cuisine.length>0
                                       ?
                                       restaurants.Cuisine.map(item=>{
                                       return <span>{item.name},</span>
                                       }):null
                                     }
                                      </div>
                                    <div class="head">Average Cost</div>
                                    <div class="value">₹ {restaurants.cost}</div>
                             </div>
                </TabPanel>
                <TabPanel>
                             <div class="content1">
                                <div class="head">Phone Number</div>
                                <div class="value">+919999999999</div>
                                <div class="head">{restaurants.name}</div>
                                <div class="value">{restaurants.address}</div>
                             </div>
                </TabPanel>
           </Tabs>
           <Modal isOpen={isModalOpen} style={customStyles}>
                     <div>
                        {
                          menu.map((item,index)=>{
                            return(
                              <div className="row">
                                  <div className="col-4">{item.item} </div>
                                  <div className="col-4">{item.cost} </div>
                                  <div className="col-4"><button>Add</button></div>
                              </div>
                            )
                          })
                        }
                     </div>
                     <div>
                       <div className="col-4">Total:500</div>
                       <div><button onClick={()=>this.makePayment()}>Pay</button></div>
                       <div><button onClick={this.cancelOrder} >cancel</button></div>
                     </div>
           </Modal>
        </div>
      </div>
    );
  }
}

export default Details;
