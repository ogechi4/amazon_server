// const express =require("express")
// const app = express()

// const cors = require("cors")
// app.use(cors())

// require("dotenv").config()

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   });
  


// // body paser
// const bodyParser = require("body-parser")
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true}))
// const port =process.env.PORT



// // STRIPE
// const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)


// app.get("/", (req,res) =>{
//     res.send("Hello World")
// })

// app.post("/pay", async(req,res) =>{
//     console.log(req.body.token)
//     try {
//     await Stripe.charges.create({
//         source:req.body.token.id,
//         amount: req.body.amount,
//         currency: "usd"
//     })
//     res.status(200).send({ success: true });
// } catch (error) {
//     res.status(500).send({ success: false, error });
//   }
// })

// app.listen(port, ()=>{
//     console.log(`Server is runnin on Port ${port}`)
// })

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// Use CORS middleware with specific options
app.use(cors({
  origin: 'http://localhost:5175' // Allow requests from this origin
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT;

// STRIPE
const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Test endpoint
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Payment endpoint
app.post("/pay", async (req, res) => {
  console.log(req.body.token);
  try {
    await Stripe.charges.create({
      source: req.body.token.id,
      amount: req.body.amount,
      currency: "usd"
    });
    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
