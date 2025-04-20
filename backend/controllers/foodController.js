import foodModel from "../models/foodModel.js";
import fs from 'fs';

const addFood = async (req, res) => {
    
    const image_url = `${req.file.filename}`

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        image: image_url
    })

    try {
        await food.save();
        res.json({success: true, message: "Food Added"
        })
    } catch (error) {
        console.log(error)
    }
}

const listFood = async(req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success: true, data: foods});
    } catch (error) {
        console.log(error)
    }
}

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, ()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message: "Food Item Removed Successfully"});
    } catch (error) {
        res.json({success:false, message: "Failed to remove food item"});
    }

}

export { addFood , listFood, removeFood};