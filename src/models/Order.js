const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    itemName:{
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
})
const PackageSchema = new Schema({
    length:{
        type: String,
        required: true,
    },
    breadth:{
        type: String,
        required: true,
    },
    height:{
        type: String,
        required: true,
    },
    weight:{
        type: String,
        required: true,
    },
    items:{
        type: [ItemSchema],
    }
})
const TripSchema = new Schema({
    shipper:{
        type:String,
        required:true
    },
    startLocation:{
        type:String,
        required:true
    },
    endLocation:{
        type:String,
        required:true
    },
    tripStatus:{
        type:String,
        enum:["Not started", "Out for pickup","In transit","Out for delivery", "Delivered"],
        required:true
    },
})

const OrderSchema = new Schema({
    senderName:{
        type: String,
        required: true,
    },
    senderAddress:{
        type: String,
        required: true,
    },
    recipientName:{
        type: String,
        required: true,
    },
    recipientAddress:{
        type: String,
        required: true,
    },
    packages:{
        type: [PackageSchema],
        required: true,
        
    },
    trips:[TripSchema]
})
const Order = mongoose.model("order", OrderSchema);
const Trip = mongoose.model("trip", TripSchema)

module.exports = {
    Order, Trip
}