import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    description: {
        type: String,
        required: true,
    },
    paymentType: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        default: "Unknown",
    },
    date: {
        type: Date,
        required: true,
    },
    },{timestamps: true});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
