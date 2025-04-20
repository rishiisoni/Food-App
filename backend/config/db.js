import mongoose from 'mongoose'
 
export const connectDB = async() => {
    try{
        await mongoose.connect('mongodb+srv://rishisoni01:Cz2uIMZeHpoEHo27@cluster0.zvghw.mongodb.net/food-app')
        .then(()=>{console.log("DB Connected")})
    }catch(err){
        console.log(err);
    }
}