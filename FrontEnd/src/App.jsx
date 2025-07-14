import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './page/Home'
import AddContent from './page/AddContent'
import ShowContent from './page/ShowContent'
import Search from './page/Search'
import SignUp from './page/SignUp'
import Analyst from './page/Analyst'
import { ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react'
import Sigin from'./page/Sigin'
import axios from 'axios'


function App() {
  const [expenses, setExpenses] = useState([]);
  
    // ✅ Fetch data from API once when component mounts
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ យក token ពី localStorage

        const response = await axios.get('http://localhost:8180/api/transaction', {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ បញ្ជូល token ក្នុង headers
          },
        });

        setExpenses(response.data); // ✅ ផ្ទុក data ទៅក្នុង state
      } catch (error) {
        console.error("Error fetching data from database:", error);
      }
    };

    fetchExpenses();
  }, []);


  return (
    <div>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home expenses={expenses}/>} />
        <Route path='/add-cotent' element={<AddContent expenses={expenses} setExpenses={setExpenses}/>} />
        <Route path='/show-cotent' element={<ShowContent expenses={expenses} setExpenses={setExpenses} />} />
        <Route path='/sigup' element={<SignUp />} />
        <Route path='/signin' element={<Sigin/>} />
        <Route path='/search' element={<Search expenses={expenses} setExpenses={setExpenses}/>} />
        <Route path='/analyst' element={<Analyst />}/>
      </Routes>
    </div>
  )
}

export default App;
