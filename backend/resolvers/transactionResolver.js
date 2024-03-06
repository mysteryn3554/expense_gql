import Transaction from "../models/transactionModel.js";
import User from "../models/userModel.js";

const transactionResolver = {
	Query: {
		getTransactions: async (_, __, context) => {
			try {
				// console.log("context:", context.getUser());
				if (!context.getUser()) throw new Error("Unauthorized");
				const userId = await context.getUser()._id;

				const transactions = await Transaction.find({ userId });
				return transactions;
			} catch (err) {
				console.error("Error getting transactions:", err);
				throw new Error("Error getting transactions");
			}
		},
		transaction: async (_, { transactionId }) => {
			console.log("1")
			try {
				const transaction = await Transaction.findById(transactionId);
				return transaction;
			} catch (err) {
				console.error("Error getting transaction:", err);
				throw new Error("Error getting transaction");
			}
		},
		categoryStatistics:async (_,__,context)=>{
			if(!context.getUser()) throw new Error("Unauthorized")

			const userId=context.getUser()._id;
			const transactions=await Transaction.find({userId})
			const categoryMap={}

			transactions.forEach((transaction)=>{
				if(!categoryMap[transaction.category]){
					categoryMap[transaction.category]=0;
				}
				categoryMap[transaction.category]+=transaction.amount
			})
			// console.log(categoryMap)
			const ans=Object.entries(categoryMap).map(([category,totalAmount])=>({category,totalAmount}))
			// console.log(ans)
			return ans
		}
		// TODO => ADD categoryStatistics query
	},
	Mutation: {
		createTransaction: async (_, { input }, context) => {
			try {
				const newTransaction = new Transaction({
					...input,
					userId: context.getUser()._id,
				});
				await newTransaction.save();
				return newTransaction;
			} catch (err) {
				console.error("Error creating transaction:", err);
				throw new Error("Error creating transaction");
			}
		},
		updateTransaction: async (_, { input }) => {
			try {
				const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId, input, {
					new: true,
				});
				return updatedTransaction;
			} catch (err) {
				console.error("Error updating transaction:", err);
				throw new Error("Error updating transaction");
			}
		},
		deleteTransaction: async (_, { transactionId }) => {
			try {
				console.log(transactionId)
				const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
				return deletedTransaction;
			} catch (err) {
				console.error("Error deleting transaction:", err);
				throw new Error("Error deleting transaction");
			}
		},
	},
	Transaction:{
		user: async (parent) => {
			const userId = parent.userId;
			const user=await User.findById(userId);
			return user;
		}
	}
};

export default transactionResolver;
