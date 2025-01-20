import Search from "./components/Search";
import Nav from "./components/Nav";
import Create from "./components/Create";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState, cloneElement } from 'react';
import Dashboard from "./components/Dashboard";
// import { Popover } from './tst';

import {
  FloatingTree,
  FloatingNode,
  useFloatingNodeId,
  useFloating,
  FloatingPortal,
} from '@floating-ui/react';
 
function Popover({children, content}) {
  const [isOpen, setIsOpen] = useState(false);
 
  // Subscribe this component to the <FloatingTree> wrapper:
  const nodeId = useFloatingNodeId();
 
  // Pass the subscribed `nodeId` to `useFloating`:
  const {refs, floatingStyles} = useFloating({
    nodeId,
    open: isOpen,
    onOpenChange: setIsOpen,
  });
 
  // Wrap the rendered floating element in a `<FloatingNode>`,
  // passing in the subscribed `nodeId`:
  return (
    <>
      {cloneElement(children, {ref: refs.setReference})}
      <FloatingNode id={nodeId}>
        {isOpen && (
          <FloatingPortal>
            <div ref={refs.setFloating}>{content}</div>
          </FloatingPortal>
        )}
      </FloatingNode>
    </>
  );
}

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
    // <FloatingTree>
    //   <Popover
    //     content={
    //       <Popover content="Nested content">
    //         <button>Nested reference</button>
    //       </Popover>
    //     }
    //   >
    //     <button>Root reference</button>
    //   </Popover>
    // </FloatingTree>
    <div className="">
        <Router >
            <div className="flex flex-col">
                <Nav />
                <div className="flex-1">
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
                </div>
            </div>
        </Router>
    </div>
  );
}

export default App;