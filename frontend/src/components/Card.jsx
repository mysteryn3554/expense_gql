import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_TRANSACTION } from "../graphql/mutations/transcationMutation";
import toast from "react-hot-toast";

const categoryColorMap = {
    saving: "from-green-700 to-green-400",
    expense: "from-pink-800 to-pink-600",
    investment: "from-blue-700 to-blue-400",
    // Add more categories and corresponding color classes as needed
};

const Card = ({ transaction }) => {
    const cardClass = categoryColorMap[transaction.category.toLowerCase()];
    const category = transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1);
    const paymentType = transaction.paymentType.charAt(0).toUpperCase() + transaction.paymentType.slice(1);
    const amount = `Rs.${transaction.amount}`;
    const date = new Date(transaction.date).toDateString();
    const location = transaction.location || "Not specified";
    const description = transaction.description.charAt(0).toUpperCase() + transaction.description.slice(1);

    const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION, { refetchQueries: ["GetTransactions","GetCategoryStatistics"] });
    const handleDelete = async () => {
        try {
            await deleteTransaction({variables:{transactionId:transaction._id}})
			toast.success("Successfullty removed the transaction")
        } catch (error) {
            toast.error("Unable to delete the transaction");
        }
        console.log("Delete transaction");
    };
    return (
        <div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
            <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center justify-between">
                    <h2 className="text-lg font-bold text-white">{category}</h2>
                    <div className="flex items-center gap-2">
						{!loading && <FaTrash className={"cursor-pointer"} onClick={handleDelete} />}
                        {loading && <div className="w-6 h-6 border-t-2 border-b-2 rounded-full animate-spin"  />}
                        <Link to={`/transaction/${transaction._id}`}>
                            <HiPencilAlt className="cursor-pointer" size={20} />
                        </Link>
                    </div>
                </div>
                <p className="text-white flex items-center gap-1">
                    <BsCardText />
                    Description: {description}
                </p>
                <p className="text-white flex items-center gap-1">
                    <MdOutlinePayments />
                    Payment Type: {paymentType}
                </p>
                <p className="text-white flex items-center gap-1">
                    <FaSackDollar />
                    Amount: {amount}
                </p>
                <p className="text-white flex items-center gap-1">
                    <FaLocationDot />
                    Location: {location}
                </p>
                <div className="flex justify-between items-center">
                    <p className="text-xs text-black font-bold">{date}</p>
                    <img src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"} className="h-8 w-8 border rounded-full" alt="" />
                </div>
            </div>
        </div>
    );
};
export default Card;
