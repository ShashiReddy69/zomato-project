const userSignUpModel=require('../Model/user');
exports.signUp=(req,res)=>{
    const email=req.body.email;
    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const password=req.body.password;
    const signupUser=new userSignUpModel({
        email:email,
        firstname:firstname,
        lastname:lastname,
        password:password
    })
    signupUser.save().then(result=>{
     res.status(200).json({
         message:"user signed up data has fetched successfully",
         user:result
     })
    }).catch(error=>{
        res.status(500).json({message:error})
         console.log(error);
    })
}
exports.login=(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    userSignUpModel.find({email:email,password:password}).then(result=>{
        if(result.length>=1){
        res.status(200).json({
         message:"user logged in successfully",
         isAuthenticated:true,
         Data:result
     })
    }
    else{
       res.status(200).json({
           message:"user not logged in successfully",
           isAuthenticated:false
       })
    }
    }).catch(error=>{
        res.staus(500).json({
            message:error
        })
        console.log(error);
    })
}