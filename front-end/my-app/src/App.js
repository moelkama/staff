import React from 'react';
import Search from "./components/Search";
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <Nav />
      <div className='min-h-screen flex items-center flex-col'>
        <Search />
      </div>
      {/* <Create /> */}
    </>
  );
}

export default App;