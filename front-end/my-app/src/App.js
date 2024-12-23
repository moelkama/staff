import React from 'react';
import Search from "./components/Search";
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <Nav />
      <h1 className='text-6xl text-ellipsis text-black font-black'>FROM REACT</h1>
      <div className='mt-20 flex items-center flex-col gap-4'>
        <Search />
      </div>
      {/* <Create /> */}
    </>
  );
}

export default App;