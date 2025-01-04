import Search from "./components/Search";
import Nav from "./components/Nav";
import Create from "./components/Create";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import Dashboard from "./components/Dashboard";

function App() {

  useEffect(() => {
    fetch("/csrf/")
    .then((response) => response.json())
    .then((data) => {
      console.log('django respons::::::::::::', data);
    })
    .catch((error) => {
      console.log('errorrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
    });
  }, []);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/create" element={<Create />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="*" element={
          <div className='flex justify-center items-center h-screen w-screen'>
            <h1 className='text-6xl text-ellipsis text-black font-black'>FROM REACT</h1>
            <h1 className='text-6xl text-ellipsis text-red-500 font-black'>404</h1>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;