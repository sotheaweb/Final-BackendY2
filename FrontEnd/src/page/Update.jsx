import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTransaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const incomeCategories = ['Monthly Income', 'Self Business', 'Other'];
  const outcomeCategories = ['Daily Basis', 'Health Care', 'Entertainment', 'Saving', 'Tripes', 'Other'];

  const [form, setForm] = useState({
    title: "",
    transaction_date: "",
    remark: "",
    amount: "",
    type: "Income",
    category: "",
  });

  const categoryOptions = form.type === "Income" ? incomeCategories : outcomeCategories;

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`http://localhost:8180/api/transaction/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        setForm({
          ...data,
          transaction_date: data.transaction_date?.slice(0, 10),
        });
      } catch (err) {
        console.error("Failed to fetch transaction:", err);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "type" && { category: "" }) // Reset category when type changes
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(`http://localhost:8180/api/transaction/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Transaction updated successfully!");
      navigate('/show-cotent');
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update transaction.");
    }
  };

  const handleCancel = () => {
    navigate('/show-cotent');
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="date"
          name="transaction_date"
          value={form.transaction_date}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="text"
          name="remark"
          placeholder="Remark"
          value={form.remark}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        >
          <option value="">Select Category</option>
          {categoryOptions.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>

        <div className="flex justify-between space-x-4 pt-2">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTransaction;
