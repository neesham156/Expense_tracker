import { timeStamp } from "console";
import mongoose from "mongoose";

const ExpensesSchema = new mongoose.Schema(
  {
   expense:
   [
    {
      type: new mongoose.Schema(
   {name: {
      type: String,
      required: [true, "Please provide a name for this Admin."],
    },
    amount: {
      type: Number,
      required: [true, "Please provide a amount for this Admin."],
    }}
    ),
    default:null,
        },
      ],

    date1: {
      type:String,
      default:null,
  
      
    },
  },
  { timestamps: true }
);

export default mongoose.models.Expenses || mongoose.model("Expenses", ExpensesSchema);
