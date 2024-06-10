const express=require('express');
const app=express();
const cors=require('cors');
const dotenv=require('dotenv');
const routes=require('./src/routes/route')
dotenv.config();
const connection=require('./src/database/db');

app.use(cors());
app.use(express.json());    
connection();
app.use('/',routes);
const PORT=process.env.PORT;
app.listen(PORT,()=> console.log(`Server is Running on port${PORT}`));
