import mongoose from "mongoose";

const nutritionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true,

    },
    foodItem: {
        type: String,
        required: true,
        index: true
    },
    gramsProtein: { 
        type: Number,
        required: true
    },
    gramsFat: { 
        type: Number,
        required: true
    },
    gramsCarb: { 
        type: Number,
        required: true
    },
    cal:{
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
});

export default mongoose.model("Nutrition", nutritionSchema);