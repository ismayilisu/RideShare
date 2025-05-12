const express=require('express');
const app=express();
const helmet=require('helmet');
const axios =require('axios')
const cors=require('cors');
const encrypt =require('bcryptjs')
const http = require('http')
const {Server} = require('socket.io')

const server=http.createServer(app);//wounding with socket giving access to both socket and raw http
//attaching socket to raw http
const io= new Server(server,{
  cors:{origin:'http://localhost:5173',
    methods:['GET','POST'],
    credentials:true
  }
})
//logic


io.on('connection',(socket)=>{
  console.log('New websocket Connection',socket.id)
 try {

  socket.on('send_message',(data)=>{
    const details=data
    console.log(`${data} gettign messge`)
    
    
     db.query(`insert into chat(row_id,msg,date,time,user_id) value(?,?,?,?,?)`,[details.row_id,details.msg,details.date,details.time,details.user_id]).then(()=>{console.log("successfully message added")})
    
    io.to(data.row_id).emit('recieve_message',data)
    console.log(`${data} sending message`)
    let id=data.row_id
    socket.on('leave_room',(id)=>{
      console.log(`${id} leaving room`)
      socket.leave(id)
    })
    
   })
  
 } catch (error) {
  console.log(error)
  
 }
  
})

// app.use(cors())
// app.use(express.json())
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cors())
const jwt=require('jsonwebtoken')


const db=require('./config/db');

const connection = db.getConnection()
.then(()=>console.log("Successfully connected"))
.catch(()=>console.log("Unsuccessfull Connection"))



const authentication=async (req,res,next)=>{
    
   const {username,pp}=req.body;
   await db.getConnection()
   await db.query('use carpool')
  // console.log('database connection obtained')
  const [result]=await db.query(`
    select * from users where username=? and password=?`
,[username,pp]   
    )
    // console.log(result)
    if (result.length===0){
       return  res.json({status:"Fail"})
    }

    req.user=result[0]
   
    next();
    
}
app.get(`/getmess`,async(req,res)=>{
  // console.log(req.query)
  const id=req.query.row
  // console.log("COnnect")
  // console.log(id)
  const [result]=await db.query(`select * from chat where row_id=?`,[id])
  console.log(result)
  res.json(result)
})
// socket.on('send_message', (data) => {
  
//   db.query("INSERT INTO messages (ride_id, row_id, text, date, time, user_id) VALUES (?, ?, ?, ?, ?, ?)", 
//     [data.ride_id, data.row_id, data.text, data.date, data.time, data.user_id], 
//     (err) => {
//       if (!err) {
//         io.emit('receive_message', data);
//       }
//   });
// });

app.delete('/delete',(req,res)=>{

try {
    // console.log('try')
    
    const token_v=req.headers.authorization
    const decode=jwt.decode(token_v,"SUPER_SECRET_TOKEN")
    const userid=decode.user_id
    // console.log(userid)
    
   
    
    db.query(`delete from users where id=?`,[userid],(err,res)=>{
        if(err){console.log('failed')}
        if(res.affectedRows===0){console.log("user Not found")}
        console.log('successfully completed')
    })
    return res.json({status:"success"})
} catch (error) {
     console.log(error)
     return res.json({status:"fail due to technical issue"})
    
}
})

app.post('/checkdata',authentication, (req,res)=>{
  const user_id=req.user.id
//  console.log(user_id)
const {username,pp}=req.body

    const token=jwt.sign({user_id},"SUPER_SECRET_TOKEN");
    
    return res.json({
        token:token,
        id:user_id,
        status:"true"
    })
})
app.get('/getdir',async (req,res)=>{
    


try {
  //  console.log(req.query.fs)
  const response= await axios.get(
`https://maps.googleapis.com/maps/api/directions/json?destination=place_id:${req.query.fd}&origin=place_id:${req.query.fs}&alternatives=true&key=AIzaSyDO73QwI6MANZk0zcnPf11OhV4r3sV9ajA`  ).catch(err=>{console.log(err)})
    // console.log(response.data.routes)
  // console.log(response.data.routes[0].legs[0].steps)
  // console.log(response.data.routes)
    const cred={
      routes:response.data.routes,
    points:response.data.routes[0].legs[0].steps,
    time:response.data.routes[0].legs[0].duration.text,
    distance:response.data.routes[0].legs[0].distance.text,
    start:response.data.routes[0].legs[0].start_location,
    end:response.data.routes[0].legs[0].end_location,
    status:"success"
}
// console.log(response.data)
res.json(cred);
} catch (error) {
    res.json({status:"failed"})
    
}
    
})
app.post('/listride',async(req,res)=>{
  
  const {driver,from,to,route,time,date,pool,fare}=req.body
  const datee=date.split('T')[0]
try {
  let k=req.body
  db.query(`insert into rides(assigned,pickup,destination,date,time,av_seat,tot_fare,src,dest,op,fvicinity,tvicinity,isexpired,paid) value(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[k.driver,k.route.legs[0].start_address,k.route.legs[0].end_address,datee,k.time,k.pool,k.fare,JSON.stringify(route.legs[0].start_location),JSON.stringify(route.legs[0].end_location),k.route.overview_polyline.points,from.structured_formatting.main_text,to.structured_formatting.main_text,false,0]).then((kk)=>{

    // console.log(res)
    if(kk[0].affectedRows!=0){
      res.json({status:'success'})
    }
    else{
      res.json({status:'false'})   
    }
    
  })

  
} catch (err) {
   console.log(err)

  
}


})
app.get('/getcor',async (req,res)=>{
    
    
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${req.query.id}&key=AIzaSyDO73QwI6MANZk0zcnPf11OhV4r3sV9ajA`);
    // console.log(response.data)
    res.send(response.data);
  } catch (error) {
    console.log("Unable to Retrieve data,Please try Again")
    
  }
})
app.get('/auto',async (req,res)=>{
    
    
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
        params: {
            input: `${req.query.place}`,
            key: 'AIzaSyDO73QwI6MANZk0zcnPf11OhV4r3sV9ajA'
        }
    });
  
    res.send(response.data);
    } catch (error) {
      console.log(error)
      
    }
})

app.get('/userrides',async (req,res)=>{
const val=req.query.d
await  db.query(`UPDATE rides
SET isexpired = CASE 
  WHEN DATE(date) <= CURDATE() and time<curtime() THEN true
  ELSE false
END;`)

const [result] = await db.query(
  `SELECT 
    rides.id,
    rides.assigned, 
    rides.pickup, 
    rides.destination, 
    rides.date, 
    rides.time, 
    rides.isexpired,
    bookings.row_id
FROM 
    rides
JOIN 
    bookings 
ON 
    bookings.driver_id = rides.assigned
WHERE 
    bookings.user_id = ?;
`,
  [val]
);
const [list]=await db.query(`select * from rides where assigned=?`,[val])
// console.log(list)
// console.log(result)
   res.json({result:result,list:list})
})



app.get('/getinfo',async(req,res)=>{
try {
  const td=jwt.decode(req.query.d,"SUPER_SECRET_TOKEN")
 const k=td.user_id
 
  const [val]= await db.query(`
  select * from users where id = ?`,[k])

  if(val.length>0){
    res.json({
      data:val[0],
      status:"Success"
    })
  }
  else{
    res.json({status:"Failed"})
  }
  
   
} catch (error) {
  console.log(error)
}


})
//login implementend get ride_id an duseid achekc if the ride exists and ac s0eats exits then enter them in the bookings sections

app.post('/bookride',async(req,res)=>{
  const data=req.body
  const {ride_id,date,time ,seats_req,token}=req.body//listed,current
  let final=false
  
  await db.query(`select * from rides where  assigned= ? and av_seat>= ? and DATE(date)>=CURDATE() `,[ride_id,seats_req]).then( async(res1)=>{
   
    if(res1[0].length>0){
      
    
   
    db.query(`insert into bookings(user_id,driver_id,seats) value(?,?,?);

              update rides
              set av_seat=av_seat-?
              where assigned=?;
              update rides
              set paid = paid+?
              where assigned=?
      
      
      `,[token,ride_id,seats_req,seats_req,ride_id,seats_req,ride_id]).then((res2)=>{
     
      
        res.json({status:"Success"})
      
      
      
    })

    }
    else{
      res.json({status:"Failed"})

    }
    
   
  })
  
 



})

app.post('/delentry',async(req,res)=>{
  const {detail,id}=req.body
 try {
  const [response]=await db.query(`select seats from bookings where row_id=?`,[detail.row_id])
 const seat=response[0].seats
    await db.query(`delete from bookings where row_id=? `,[detail.row_id])
    await db.query(`
      update rides 
      set av_seat=av_seat + ?
      where assigned=?;
       update rides 
      set paid=paid- ?
      where assigned=?;
      `,[seat,detail.assigned,seat,detail.assigned])
      res.json({status:'Sucess'})
  
 } catch (error) {
  res.json({status:"Failed"})
  
 }

})

app.get('/getrides',async(req,res)=>{

  try {
    // console.log("req")
  await db.query('use carpool')

      const date=JSON.parse(decodeURIComponent(req.query.req)).date
      const time=JSON.parse(decodeURIComponent(req.query.req)).time
      // console.log(time)


  const extractChunks = (address) => {
    return address
      .split(',')
      .map(part => part.trim())
      .filter(part => part.length > 0); 
  };
  
  const s_chunks = extractChunks(JSON.parse(decodeURIComponent(req.query.source)));
  const d_chunks = extractChunks(JSON.parse(decodeURIComponent(req.query.destination)));
  
  // console.log("Source Chunks:", s_chunks);
  // console.log("Destination Chunks:", d_chunks);
  
  let result = [];
  
  for (let i = 0; i < s_chunks.length; i++) {
    for (let j = 0; j < d_chunks.length; j++) {
      const pickupTerm = `%${s_chunks[i]}%`;
      const destTerm = `%${d_chunks[j]}%`;
  //expire logic
      const matches = await db.query(
        `SELECT * FROM rides WHERE pickup LIKE ? AND destination LIKE ? AND av_seat > 0 and DATE(date)>=?  `,
        [pickupTerm, destTerm,date,time]
      );
  
      if (matches[0].length > 0) {
        result = matches[0];
        break; 
      }
    }
    if (result.length > 0) break;
  }
  // console.log(result)
  res.json(result);
  
    
  } catch (error) {
    console.log(error)
  }
 

})
app.post('/register',async(req,res)=>{
  
    const {username,e,pp}=req.body;
  try {
    await  db.getConnection()
  const [result]=  await  db.query(`insert into users (username,email,password) value(?,?,?)`,[username,e,pp]).catch((err)=>{console.log(err)});
      const t=result
      
      const user_id=t.insertId
      // console.log(user_id)
          const token=jwt.sign({user_id},"SUPER_SECRET_TOKEN")
          return res.json({
              id:user_id,
              token_v:token
              
          })
          
    
  } catch (error) {
    console.log(error)
    
  }

})
app.get('/explore',(req,res)=>{
    return res.json({apikey:process.env.MAPS_API_KEY})
})
const port=5000;
server  .listen(5000,(port)=>{
    console.log(`The port has started on 5000..`)
})
