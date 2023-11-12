import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import data from '../../../backend/public/collection/1.json'

// DND-KIT
import {
  DndContext,
  closestCenter,
  DragOverlay
} from "@dnd-kit/core"

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable"  

// Custom Components
import SortableObject from '../components/DND/SortableObject';
import Topbar from '../components/Topbar/Topbar';

function TestComponents() {
  const [ele, setEle] = useState();
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(true);

  const elementId = 1;

  // Retrieve contents from /api/elements
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(`/api/elements/${elementId}`);
        if (response.ok) {
          const data = await response.json();
          setEle(data);
          setElementsData(data); // Set initial data
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    loadData();
  }, [elementId]);

  const [names, setNames] = useState(["Marcus", "Teddy", "Tuts", "Sean"]);

  const parsedData = JSON.stringify(ele);

  const [elementsData, setElementsData] = useState(parsedData)
 
  const saveFn = async () => {
    try {
      if (!elementsData) {
        alert('No elements data to save');
        return;
      }
  
      const response = await fetch(`/api/elements/save-elements/${elementId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newFile: elementsData }),
      });
  
      if (response.ok) {
        alert('Elements saved successfully');
      } else {
        alert('Failed to save elements');
      }
    } catch (error) {
      alert('Error saving elements:', error);
    }
  };

  // useEffect(()=> {
  //   console.log(JSON.stringify(elementsData))
  // }, [elementsData])

  return (
    <>
      <Topbar />
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : (
            <main>
              <DndContext 
                onDragStart={handleDragStart}
                collisionDetection={closestCenter} 
                onDragEnd={handleDragEnd} 
              >
              <SortableContext
                  items={elementsData.map((element) => element.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {elementsData.map(element => <SortableObject key={element.id} id={element.id} elements={element}/>)}
              </SortableContext>
              </DndContext>
              <button className='btn-orange' onClick={saveFn}>Save Elements</button>
            </main>
        )}
      </div>
    </>
  );

  function handleDragStart() {
    setIsDragging(true);
    console.log(isDragging);
  }

  function handleDragEnd(event) {
    console.log("Drag end called");
    const {active, over} = event;
    console.log("ACTIVE: " + active.id);
    console.log("OVER: " + over.id);
    setIsDragging(false);
    
    console.log(isDragging);
  
    if (active.id !== over.id) {
      setElementsData((items) => {
        const activeIndex = items.findIndex(item => item.id === active.id);
        const overIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, activeIndex, overIndex)
      });
    }
  }
}



export default TestComponents;






