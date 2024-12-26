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
      {/* <h1 className='text-6xl text-ellipsis text-black font-black'>FROM REACT</h1> */}
      {/* <div className='mt-20 flex items-center flex-col gap-4'> */}
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/create" element={<Create />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;