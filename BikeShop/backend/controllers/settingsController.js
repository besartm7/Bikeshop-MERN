import asyncHandler from 'express-async-handler'
import Settings from '../models/settingsModel.js'

//@desc Get Number of Items per page
//@route GET /api/settings/itemspp
//@access Public
const getSettingsItemsPerPage = asyncHandler(async (req, res) =>{
    let pageItems ={items: 12}; 
    let pageItemss = await Settings.findOne()

    if(pageItemss === null){
        const settingsitems = await Settings.create({
            items: 10
        })
        pageItemss = await Settings.findOne()
    }

    res.json(pageItemss)
})

//@desc Update Number of Items per page
//@route PUT /api/settings/itemspp
//@access Private Admin
const updateSettingsItemsPerPage = asyncHandler(async (req, res) =>{
    const{ itemspp } = req.body
    const pageItemss = await Settings.findOne()
    console.log(pageItemss)

    if(pageItemss){
        pageItemss.items = itemspp
        const updateSettings = await pageItemss.save()
        res.json(updateSettings)
    }else{
        res.status(404)
        throw new Error('Settings not found')
    }
})


export {
    getSettingsItemsPerPage,
    updateSettingsItemsPerPage
}