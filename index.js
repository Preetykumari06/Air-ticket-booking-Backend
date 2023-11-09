const express=require("express")
const {connection}=require("./Config/db");
const UserRouter = require("./Routes/user.router");
const FlightRouter = require("./Routes/flight.router");
const BookingRouter = require("./Routes/booking.router");


require('dotenv').config()
const port= process.env.PORT || 4000;


const app=express();
app.use(express.json());



app.use("/api",UserRouter)
app.use("/api",FlightRouter)
app.use("/api",BookingRouter)

app.get("/", (req,res)=>{
    res.send("Welcome")
})

app.listen(port, async () => {
  try {
   await connection;
   console.log("Connected to the DB...")
  } catch(error){
   console.log(error)
   console.log('Something went wrong...')
}
    console.log(`Server running at ${port}`)
})








