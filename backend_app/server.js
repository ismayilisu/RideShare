const express=require('express');
const app=express();
const helmet=require('helmet');
const axios=require('axios');
const cors=require('cors');
// app.use(cors())

app.use(express.json())
app.use(cors())
const jwt=require('jsonwebtoken')


const db=require('./config/db');

const connection = db.getConnection()
.then(()=>console.log("Successfully connected"))
.catch(()=>console.log("Unsuccessfull Connection"))



const authentication=async (req,res,next)=>{

   const {u,pp}=req.body;
   db.getConnection()
  const result=await db.query(
    
   "select * from users where username=? and password=? "
,[u,pp]   
    )
    if (result.length==0){
       return  res.json({message:"Fail"})

    }
    next();
    
}

app.post('/checkdata',authentication, (req,res)=>{
const {u}=req.body

    const token=jwt.sign({u},"SUPER_SECRET_TOKEN");
    console.log(token)
    return res.json({
        token:token,
        status:"true"
    })
})
    
 



// })
app.post('/register',(req,res)=>{
    const {username,e,p}=req.body;
    // console.log(req.body)
    db.getConnection()
    db.query(`insert into users (username,email,password) value(?,?,?)`,[username,e,p]);

        const token=jwt.sign({e},"SUPER_SECRET_TOKEN")
        return res.json({
            token_v:token
            
        })
        

})
app.get('/explore',(req,res)=>{
    return res.json({apikey:process.env.MAPS_API_KEY})
})
const port=5000;
app.listen(5000,(port)=>{
    console.log(`The port has started on 5000..`)
})
