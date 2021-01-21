const restaurantModel=require('../Model/restaurant')
exports.getRestaurantData = (req,res)=>{
    
    restaurantModel.find().then(result=>{
        res.status(200).json({
            message:"data fetched successfully",
            restaurantData:result,
        })
      //  console.log(result)
    }).catch(error=>{
        console.log(error)
    })
}
exports.getRestaurantDataByCity=(req,res)=>{
    var cityName=req.body.city_name
    console.log(cityName)
    restaurantModel.find({city_name:cityName}).then(result=>{
        res.status(200).json({
            message:"data fetched successfully",
            restaurantData:result
        })
    }).catch(error=>{
        console.log(error)
    })
}
exports.getRestaurantMealType=(req,res)=>{
    const mealType=req.body.mealtype;
    const cuisine_id=req.body.cuisine_id
    const payload={
         "type.mealtype":mealType,
         
    }
    if(cuisine_id && cuisine_id.length>0){
        payload["Cuisine.cuisine"]={
            $in:cuisine_id
        }
    }
    restaurantModel.find(payload).then(result=>{
        res.status(200).json({
            message:"data fetched successfully",
            restaurantData:result
        })
    }).catch(error=>{
        console.log(error)
    })
}
exports.getRestaurantsByCity=(req,res)=>{
    const city_Id=req.params.city;
    restaurantModel.find({city:city_Id}).then(result=>{
        res.status(200).json({
            message:"Data fetched by city_id successfully",
            restaurantData:result
        })
    }).catch(error=>{
        console.log(error)
    })

}
exports.getRestaurantById=(req,res)=>{
   // const Id=req.params._id;
    restaurantModel.find({_id:req.params.id}).then(result=>{
        res.status(200).json({
            message:"Data fetched by _id successfully",
            restaurants:result[0]
        })
    }).catch(error=>{
        console.log(error)
    })

}
exports.getRestaurantsByCost=(req,res)=>{
    const cost1=req.body.cost1;
    const cost2=req.body.cost2;
    //console.log(cost1)
restaurantModel.find({cost:{$gt:cost1,$lt:cost2}}).then(result=>{
    res.status(200).json({
        message:"data fetched successfully",
        restaurantData:result,
    })
  //  console.log(result)
}).catch(error=>{
    console.log(error)
})
}
exports.getRestaurantByPage=(req,res)=>{
    const pageOptions = {
        page: parseInt(req.params.page)-1,
       // limit: parseInt(req.params.limit)
        limit: 2
       
    }
    // const startIndex=(pageOptions.page-1 * pageOptions.limit);
    // const endIndex=(pageOptions.page * pageOptions.limit);
    // const resultData=restaurantData.slice(startIndex,endIndex)
    restaurantModel.find().skip((pageOptions.page )* pageOptions.limit).limit(pageOptions.limit).then(result=>{
        // console.log(result)
        res.status(200).json({
            message:"Data fetched by page successfully",
            restaurantData:result
        })
    }).catch(error=>{
        console.log(error)
    })

}
exports.getRestaurantsBySort = (req,res)=>{
    const mealtype=req.body.mealtype
    const sortType={
        "cost":req.body.cost
    }
    restaurantModel.find({'type.mealtype':mealtype}).sort(sortType).then(result=>{
        res.status(200).json({
            message:"data fetched by mealtype and sortType successfully",
            restaurantData:result,
        })
      //  console.log(result)
    }).catch(error=>{
        console.log(error)
    })
}