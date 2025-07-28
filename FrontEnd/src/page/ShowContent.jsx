import React from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import axios from "axios";

const ShowContent = ({ expenses, setExpenses }) => {

  const deleteTransaction = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this item?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8180/api/transaction/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // ✅ Remove the deleted item from the state
      setExpenses(expenses.filter(item => item.id !== id));
    } 
    catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  };

  return (
    <div className="page-size overflow-x-auto ">
      <div className="t flex justify-center ">
        <table className="bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Remark</th>
              <th className="py-3 px-6 text-left">Amount</th>
              <th className="py-3 px-6 text-left">Type</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-6 text-left">{item.title}</td>
                <td className="py-3 px-6 text-left">{item.transaction_date?.slice(0, 10)}</td>
                <td className="py-3 px-6 text-left">{item.remark}</td>
                <td className={`py-3 px-6 text-left ${item.type == "expense" ? "text-red-500" : "text-green-500"}`}>
                  ${Math.abs(item.amount)}
                </td>
                <td className="py-3 px-6 text-left">
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${
                    item.type === "income" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                  }`}>
                    {item.type}
                  </span>
                </td>
                <td className="py-3 px-6 text-left">{item.category}</td>
                <td className="py-3 px-6 text-left">
                  <div className="flex items-center justify-around text-left">
                    <div className="text-2xl text-red-400">
                      <button onClick={() => deleteTransaction(item.id)} className="cursor-pointer"><MdDelete /></button>
                    </div>
                    <div className="text-2xl text-sky-300 ">
                      <Link to={`/update/${item.id}`} className="text-2xl text-sky-300">
                        <TbListDetails />
                      </Link>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowContent;
