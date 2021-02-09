import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import bikes from './data/bikes.js';
import User from './models/userModel.js';
import Bike from './models/bikesModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config()
connectDB()

const importData = async () =>{
    try {
        await Order.deleteMany()
        await Bike.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const bikesCollection = bikes.map(b => {
            return { ...b, user: adminUser }
        })

        await Bike.insertMany(bikesCollection);
        console.log('Data Imported!');
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroyData = async () =>{
    try {
        await Order.deleteMany()
        await Bike.deleteMany()
        await User.deleteMany()

        console.log('Data Destroyed!');
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

if(process.argv[2] === '-d'){
    destroyData();
}else{
    importData();
}