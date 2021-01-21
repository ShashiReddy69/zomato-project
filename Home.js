import React ,{Component} from 'react';
import axios from 'axios'
import '../styles/home.css'
import Wallpaper from './Wallpaper';
import QuickSearches from './QuickSearches';
class Home extends Component{
  constructor(props) {
    super(props)
  
    this.state = {
       mealsData:[],
       cityList:[]
    };
  };
  componentDidMount(){
      
     axios.get('http://localhost:1998/city').then(result=>{
         this.setState({
             cityList:result.data.cityList
         })
     }).catch(error=>{
         console.log(error)
     })
     axios.get('http://localhost:1998/mealdata').then(result=>{
         this.setState({
             mealsData:result.data.mealsData
         })
     }).catch(error=>{
         console.log(error)
     })
  }
  
    
    render(){
        const {cityList, mealsData} = this.state
        return(
            <React.Fragment>
                 <Wallpaper cityList={cityList}/>      
                  <QuickSearches mealsData={mealsData} cityList={cityList}/>                          
            </React.Fragment>
        )
    }
}
export default Home;