const express =require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const FoodModel = require("./food");


app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/lastmern",{ useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex:true}, (error)=> {
    if(!error){
        console.log("success from lastmern_DB");
    }
    else{
        console.log('Error inDB connection : ' + JSON.stringify(err, undefined, 2)); 
    }
})

app.post("/insert", async(req,res)=> {
   const foodName = req.body.foodName;
   const days =req.body.days;

    const food = new FoodModel({ foodName: foodName, daysSinceIAte: days});

    try{
        console.log("loading...!")
        await food.save();
        console.log("food saved !")   
    } catch(err){
        console.log(err);
    }
});


app.get("/read", async(req,res)=> {
  FoodModel.find({},(err,result)=>{
      if(err){
          res.send(err);
      }else{
          res.send(result);
      }
  })
 });

 app.put("/update", async(req,res)=> {
    const newFoodName = req.body.newFoodName;
    const id =req.body.id;

     try{
        await FoodModel.findById(id, (err, updateFood)=>{
            updateFood.foodName = newFoodName;
            updateFood.save();
            res.send("update");
        });
     } catch(err){
         console.log(err);
     }
 });

 app.get("/delete/:id", async (req,res)=>{
     const id = req.params.id;
     await FoodModel.findByIdAndRemove(id).exec();
     res.send("deleted");
 })


app.listen(3006,()=> console.log("server running on port: 3006"));