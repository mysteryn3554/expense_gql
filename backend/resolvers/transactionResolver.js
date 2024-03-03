import Transaction from "../models/transactionModel.js"
const transactionResolver = {
    Query: {
        transactions: async(_, __context)=>{
            try{
                if (!context,getUser()) throw new Error("unauthorized")

                const userId=await context.getUser()._id;

                const transactions=await Transaction.find({userId})
                return transactions
            }catch(err){
                console.log("Error in getting transaction");
                throw new Error(err.message||"Internal server error")
            
            }
        },
        transaction: async(_,{transactionId},)=>{
            try {
                const transaction=await Transaction.findById("transactionId");
                return transaction
            } catch (err) {
                console.log("Error in login");
                throw new Error(err.message||"Internal server error")
            
            }
        }
    },
    Mutation: {
        createTransaction: async(_,{input},context)=>{
            const newTransaction=new Transaction({
                ...input,
                userId:context.getUser()._id
            })

            await newTransaction.save()
        },
        updateTransaction: async(_,{input},__)=>{

            try {
                const updatedTransaction=await Transaction.findByIdAndUpdate(input.transactionId,input,{new:true});
                return updatedTransaction
            } catch (error) {
                console.log("Error in update")
                throw new Error("Error updating transaction")
            }
        },
        deleteTransaction: async(_,{transactionId},context)=>{
            try {
                const deletedTransaction=await Transaction.findByIdAndDelete(transactionId)
                return deletedTransaction
            } catch (error) {
                console.log("Error in delete")
                throw new Error("Error deleting transaction")
            }
        },
    }
}

export default transactionResolver;
