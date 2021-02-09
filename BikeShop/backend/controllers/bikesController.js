import Bike from '../models/bikesModel.js'
import asyncHandler from 'express-async-handler'



//@desc Get top rated bikes
//@route GET /api/bikes/top
//@access Public
const getTopRatedBikes = asyncHandler(async (req, res) =>{
    const topbikes = await Bike.find({}).sort({rating: -1}).limit(6)
    res.json(topbikes)
})


//@desc all bikes
//@route GET /api/bikes
//@access Public
const getBikes = asyncHandler(async (req, res) =>{
    const pageItems = Number(req.query.items) || 6
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'       //case insensitive
        }
    }: {}

    const count = await Bike.countDocuments({ ...keyword })
    const bikes = await Bike.find({ ...keyword}).limit(pageItems).skip(pageItems * (page-1))
    res.json({bikes, page, pages: Math.ceil(count / pageItems)});
})

//@desc Fetch single bike
//@route GET /api/bikes/:id
//@access Public
const getBikeById = asyncHandler(async (req, res) =>{
   //const bike = bikes.find(b => b._id === req.params.id);
   const bike = await Bike.findById(req.params.id);
   if(bike)
   {
       res.json(bike);
   }else{
       res.status(404)
       throw new Error('Bike not Found');
   }
})

//@desc Delete a bike
//@route GET /api/bikes/:id
//@access Private/Admin
const deleteBikeById = asyncHandler(async (req, res) =>{
    const bike = await Bike.findById(req.params.id);
    if(bike)
    {
        await bike.remove()
        res.json({ message: 'Bike deleted'});
    }else{
        res.status(404)
        throw new Error('Bike not Found');
    }
 })

//@desc Create a bike
//@route POST /api/bikes
//@access Private/Admin
const createBike = asyncHandler(async (req, res) =>{
    const{
        image, name, description, brand, category, colors, price, countInStock
    } = req.body

    const bike = new Bike({
        image,
        name,
        description,
        brand,
        category,
        colors,
        price,
        countInStock,
        numReviews: 0,
        user: req.user._id
    })

    const createdBike = await bike.save()
    res.status(201).json(createdBike)
 })

 //@desc Update bike
//@route PUT /api/bikes/:id
//@access Private/Admin
const updateBike = asyncHandler(async (req, res) =>{

    const{
        image,
        name,
        description,
        brand,
        category,
        colors,
        price,
        countInStock
    } = req.body

    const bike = await Bike.findById(req.params.id)

    if(bike){
        bike.image = image,
        bike.name = name,
        bike.description = description,
        bike.brand = brand,
        bike.category = category,
        bike.colors = colors,
        bike.price = price,
        bike.countInStock = countInStock

        const updatedBike = await bike.save()
        res.json(updatedBike)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
 })

//@desc Create new Review
//@route POST /api/bikes/:id/reviews
//@access Private
const createBikeReview = asyncHandler(async (req, res) =>{

    const{
       rating,
       comment
    } = req.body

    const bike = await Bike.findById(req.params.id)
    console.log(req.user._id)
    
    if(bike){
       const alreadyReviewed = bike.reviews.find(r => r.user.toString() === req.user._id.toString())

       if(alreadyReviewed){
           res.status(400)
           throw new Error('Bike reviewed!')
       }

       const review = {
           name: req.user.name,
           rating: Number(rating),
           comment,
           user: req.user._id
       }

       bike.reviews.push(review)

       bike.numReviews = bike.reviews.length

       bike.rating = bike.reviews.reduce((acc, item) => item.rating + acc, 0)/bike.reviews.length

       await bike.save()
       res.status(201).json({message: 'Review added'})
    }else{
        res.status(404)
        throw new Error('Bike not found')
    }
 })

 const minusCountInStockofBike = (myArray) => {
    let bike;
    myArray.map(async (b) => {
        bike = await Bike.findById(b.bikeId)
        bike.countInStock = bike.countInStock-b.qty
        await bike.save()
    });
}

export {
    getBikes,
    getBikeById,
    deleteBikeById,
    createBike,
    updateBike,
    createBikeReview,
    getTopRatedBikes,
    minusCountInStockofBike
}