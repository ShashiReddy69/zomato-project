const cityModel=require('../Model/city');
exports.getCity=(req,res)=>{
    cityModel.find().then(result=>{
       // console.log(result)
        res.status(200).json({
            message:"city list fetched successfully",
            cityList:result
        })
    }).catch(error=>{
        console.log(error)
    })
}