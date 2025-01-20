
import React, {useState, cloneElement} from 'react';

import {
  FloatingNode,
FloatingPortal,
useFloating,
  useFloatingNodeId,
} from '@floating-ui/react';
 
export default function Popover({children, content}) {
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