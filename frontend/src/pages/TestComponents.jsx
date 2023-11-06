import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser'
import {DndContext} from '@dnd-kit/core';
import Draggable from '../components/DND/Draggable';
import Droppable from '../components/DND/Droppable';
import { Link } from 'react-router-dom';


function TestComponents() {
  const [data, setData] = useState([]);

  // Retrieve contents from /api/elements
  useEffect(() => {
    fetch('/api/elements')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  function handleH1Element(domNode) {
    return (<h1 className='heading-1'>{domNode.childNodes[0].data}</h1>);
  }

  function handlePElement(domNode) {
    return (<p>{domNode.childNodes[0].data}</p>)
  }

  function handleBrElement() {
    return (<br/>)
  }

  function handleImgElement(domNode) {
    return(<img src={domNode.attribs.src} />)
  }

  return (
    <div className="container">
      <div dangerouslySetInnerHTML={{__html: `<h1 class='heading-1'>I'm From DB</h1><br/><p>This is a paragraph from DB<p><br /><img src='../../../public/img/image-1.jpg'></img>` }}/>
      {data.map((item) => (
        <div className="mt-10" key={item.test_id}>
          {parse(item.test_txt, {
            replace: (domNode) => {
              console.dir(domNode, {depth: null});
              // console.log(domNode.name == 'img' && domNode.attribs.src)
              switch (domNode.name) {
                case 'h1':
                  return handleH1Element(domNode)
                case 'p':
                  return handlePElement(domNode)
                case 'img':
                  return console.log('there is an image');
                case 'br':
                  return handleBrElement()
                default:
                  console.error("Element not found")
                  break;
              }
            }
          })}
          {/* {console.log(item.test_txt)} */}
        </div>
      ))}
    </div>
  );
}

export default TestComponents;






