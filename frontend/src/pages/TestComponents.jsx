import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser'
import {DndContext} from '@dnd-kit/core';
import Draggable from '../components/DND/Draggable';
import Droppable from '../components/DND/Droppable';
import { Link } from 'react-router-dom';


function TestComponents() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/elements')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container">
      {data.map((item) => (
        <div className="mt-10" key={item.test_id}>
          {parse(item.test_txt, {
            replace: (domNode) => {
              console.dir(domNode, {depth: null});
              // switch (domNode.name) {
              //   case 'h1':
              //     return (<h1 className='heading-1'>{domNode.childNodes[0].data}</h1>);
              //   case 'p':
              //     return (<p>{domNode.childNodes[0].data}</p>)
              //   case 'img':
              //     console.log('img');
              //     break;
              //   case 'br':
              //     return (<br/>)
              //   default:
              //     console.error("Element not found")
              //     break;
              // }
              // if (domNode.attribs && domNode.attribs.class === 'heading-1') {
              //   return <h1 className='heading-1'>{domNode.childNodes}</h1>
              // }
            }
          })}
          {/* {console.log(item.test_txt)} */}
        </div>
      ))}
    </div>
  );
}

export default TestComponents;






