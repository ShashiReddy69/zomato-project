const mealModel=require('../Model/meals')
exports.getmealData=(req,res)=>{
    
    mealModel.find().then(result=>{
        res.status(200).json({
            message:"meal data fetched successfully",
            mealsData:result,
        })
      //  console.log(result)
    }).catch(error=>{
        console.log(error)
    })
}