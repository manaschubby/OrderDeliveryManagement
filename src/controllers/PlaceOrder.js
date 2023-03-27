const { Order, Trip } = require("../models/Order")


const createOrder = async (req, res) => {
    const order = new Order(req.body);
    order.save((err, savedOrder) => {
        if (err) {
            return res
                .status(400)
                .send({
                    "Error saving to DB": err
                })
        }
        return res
            .status(200)
            .send({
                status: "success", 
                message: "Added to orders",
                order:savedOrder._id,
                packages:savedOrder.packages,
                trips:savedOrder.trips
            })
        
    });
}
const editTrip = async (req, res) => {
    const request = req.body;
    let tripId, newStatus;
   
    tripId = request.tripId
    newStatus = request.newStatus
    if (!tripId || !newStatus){
        return res
            .status(400)
            .send({
                "error": "Error retrieving trip from request"
            })
    }
    Order.findOneAndUpdate(
        {
            "trips._id": tripId
        },
        {
            "$set":{
                "trips.$.tripStatus":newStatus
            }
        },
        { upsert: false, new: true },
        (findErr, findRes) => {
            console.log(findRes)
            if (findErr) {
                return res
                    .status(400)
                    .send({
                        "Error retrieving from DB": findErr
                    })
            }
            return res
                .status(200)
                .send(
                    findRes
                )
        }
    )
}
const getOrders = async (req, res) => {
    if (req.body["id"]){
        Order.findById(req.body.id,(err, order)=>{
            if (err) {
                return res
                    .status(400)
                    .send({
                        "Error retrieving from DB": err
                    })
            }
            return res
                .status(200)
                .send(
                    order
                )
        })
    }
    else{
        Order.find((err, orders)=>{
            if (err) {
                return res
                    .status(400)
                    .send({
                        "Error retrieving from DB": err
                    })
            }
            return res
                .status(200)
                .send(
                    orders
                )
        })
    }
}

module.exports = {
    createOrder, getOrders, editTrip
}