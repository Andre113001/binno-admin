import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

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
import YoutubeEmbed from '../components/YoutubeEmbed/YoutubeEmbed';

function TestComponents() {
  const [ele, setEle] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  // Retrieve contents from /api/elements
  useEffect(() => {
    fetch('/api/elements')
      .then(res => res.json())
      .then(data => setEle(data))
      .catch(err => console.log(err));
  }, []);

  console.log(ele);

  const [names, setNames] = useState(["Marcus", "Teddy", "Tuts", "Sean"]);

  const [elementsData, setElementsData] = useState([
    {
      id: 1,
      type: 'h1',
      attributes: `class="element_h1"`,
      content: "Hello World",
    },
    {
      id: 2,
      type: 'p',
      attributes: `class="element_p"`,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultrices pulvinar ante. Fusce suscipit urna ipsum, non fermentum nulla pellentesque non. Phasellus iaculis leo a viverra pulvinar. Mauris sodales feugiat augue, nec aliquam magna bibendum non. Cras ut nisi bibendum lorem elementum mollis vitae at purus. Aliquam erat volutpat. Duis a massa venenatis, bibendum ligula quis, vestibulum quam. Maecenas purus neque, consequat feugiat orci vitae, sodales pellentesque dui. Proin tristique, diam eget eleifend facilisis, nisi ante luctus dui, nec laoreet libero enim non massa. Etiam tempor tellus et tortor facilisis, tempus posuere risus ornare. Proin sed tellus ultricies, congue sem a, blandit elit. Suspendisse potenti. Nulla mi nisl, pretium ac pulvinar eu, maximus eget massa. Morbi porta ultricies lacinia. Nulla facilisi. Vestibulum faucibus sed sapien eget ultrices. Sed pretium nunc vulputate velit placerat tincidunt. Aliquam consectetur fermentum magna eu pretium. Suspendisse vel est sed nunc aliquet euismod id vitae leo. Suspendisse pulvinar dui ipsum, placerat rutrum arcu laoreet vitae. In vehicula, mi ac aliquet consectetur, enim lorem ultricies augue, ac placerat leo orci nec lacus. Nullam ac nibh in odio dignissim porttitor. Aliquam et fermentum quam. Donec consequat vel tortor at tincidunt. Etiam at hendrerit ex, nec maximus nisl. Integer laoreet efficitur tempor. Nullam massa lorem, faucibus quis est quis, suscipit auctor augue. Nullam magna nisi, laoreet a scelerisque ac, malesuada eu eros. Proin a laoreet enim. Nam eu fermentum augue. Fusce sollicitudin pellentesque orci sit amet aliquam. Mauris sem ante, imperdiet in elit at, consequat bibendum dolor. Aenean maximus urna non felis malesuada dignissim. Phasellus auctor tortor sit amet efficitur venenatis. Nunc vestibulum lobortis elit et rhoncus. Praesent elementum arcu at lacus laoreet feugiat. Fusce semper, lacus et maximus accumsan, eros magna porttitor ligula, ac gravida dolor arcu a sem. Ut vehicula lorem eget bibendum congue. Curabitur non nunc non ex consectetur viverra nec quis sem. Fusce rutrum metus eu justo convallis tempor. Etiam tempus lobortis lorem id aliquam. Curabitur turpis magna, dictum a augue ac, placerat malesuada urna. Phasellus viverra orci quis purus vestibulum sagittis. Suspendisse sit amet fringilla urna. Duis efficitur nec metus vitae semper. Etiam feugiat suscipit tellus, sed luctus elit facilisis quis. Mauris mollis, nunc in venenatis cursus, erat risus placerat nibh, bibendum vestibulum lorem nisl euismod dui. Sed id scelerisque ligula, et tristique diam. Duis non urna non mi fringilla consequat sed a ex. In id metus nec purus rutrum tincidunt ac eu mi. Pellentesque luctus felis et facilisis efficitur. Etiam semper eu neque ac finibus. Nullam in dolor nec lacus tincidunt pellentesque. In eget nisi mauris. Fusce nec dolor in nulla placerat maximus. Praesent dapibus lacus at enim interdum ullamcorper. Quisque interdum malesuada turpis, quis aliquet metus tempor nec. Etiam ut tellus eu arcu tincidunt ultricies a a leo. In quis viverra lacus, a dignissim nibh. Donec tempor urna in turpis commodo mattis. Duis pellentesque ligula nec est elementum iaculis. Nullam ac tellus non ante laoreet hendrerit a sed dui. Aenean eleifend erat sed congue dignissim. Donec maximus facilisis libero. Mauris sit amet risus nec elit rutrum euismod id eu neque. Phasellus sit amet nisl sagittis, egestas ante sed, ornare leo. Cras magna nunc, finibus vel ipsum nec, pulvinar eleifend est. Maecenas pellentesque placerat porta. Morbi venenatis, nulla at dignissim aliquam, neque nibh sollicitudin libero, eleifend consectetur magna dolor non elit. Integer porta varius velit eu suscipit. Praesent at nulla malesuada nisl aliquam tempus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque quis ipsum non sem sagittis faucibus. Duis vel dolor sit amet dolor vulputate tincidunt. Duis vehicula pulvinar nisi, aliquet posuere arcu feugiat in. Praesent urna quam, molestie id tempor ac, maximus non lectus. Nullam in erat nisi. Mauris ante arcu, ultrices id nisi eget, aliquet ultricies leo. Etiam pulvinar venenatis enim eget fermentum. Suspendisse suscipit eget dui at rutrum. Aliquam porttitor est a ultricies egestas. Maecenas eu dignissim leo. Proin sit amet mauris vel velit viverra vestibulum. Etiam vitae dolor nulla. Curabitur rhoncus cursus ipsum, at feugiat lorem tempus in. Sed ullamcorper neque eu semper ultrices. Vivamus laoreet est vel urna dignissim tristique. Ut eros mauris, ultricies eu ullamcorper semper, molestie ut nibh. Mauris ante elit, ultrices non mauris sed, bibendum feugiat lectus. Etiam laoreet massa id lorem luctus finibus in quis lorem. Nullam eget aliquet magna. Maecenas vitae consequat risus. Sed mattis ornare risus, at molestie dui efficitur in. Sed suscipit odio ut nisi hendrerit ultrices. Vestibulum commodo nisl nec sapien pulvinar rutrum. Morbi sit amet aliquet sem, ac facilisis magna. Aliquam erat volutpat. Praesent at purus et dui placerat consectetur lobortis id massa. Etiam aliquet a odio sollicitudin pharetra. Vivamus lacinia eu nulla ac condimentum. Nulla sollicitudin in massa ut ornare. Nunc euismod ipsum ipsum, quis condimentum ipsum efficitur eu. Etiam vitae nisl aliquet nisl mattis aliquet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin justo massa, ultricies eu iaculis non, consectetur ut urna. Mauris volutpat, libero sit amet porttitor malesuada, nunc leo pretium leo, et finibus erat ex eu mauris. Morbi facilisis rutrum tellus a consequat. Maecenas faucibus tincidunt magna, a ultrices sapien auctor nec. Mauris vitae metus sem. In magna nulla, semper et leo non, imperdiet rhoncus nisi. Quisque id mauris sed nibh mattis convallis id at ligula. Cras a rhoncus justo. Phasellus imperdiet consequat augue, sed volutpat nulla dictum et.",
    },
    {
      id: 3,
      type: 'img',
      attributes: `src="../../../public/img/image-1.jpg"`,
      content: "",
    },
    {
      id: 4,
      type: 'h2',
      attributes: `class="element_h2"`,
      content: "Another Heading",
    },
    {
      id: 5,
      type: 'p',
      attributes: `class="element_p"`,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultrices pulvinar ante. Fusce suscipit urna ipsum, non fermentum nulla pellentesque non. Phasellus iaculis leo a viverra pulvinar. Mauris sodales feugiat augue, nec aliquam magna bibendum non. Cras ut nisi bibendum lorem elementum mollis vitae at purus. Aliquam erat volutpat. Duis a massa venenatis, bibendum ligula quis, vestibulum quam. Maecenas purus neque, consequat feugiat orci vitae, sodales pellentesque dui. Proin tristique, diam eget eleifend facilisis, nisi ante luctus dui, nec laoreet libero enim non massa. Etiam tempor tellus et tortor facilisis, tempus posuere risus ornare. Proin sed tellus ultricies, congue sem a, blandit elit. Suspendisse potenti. Nulla mi nisl, pretium ac pulvinar eu, maximus eget massa. Morbi porta ultricies lacinia. Nulla facilisi. Vestibulum faucibus sed sapien eget ultrices. Sed pretium nunc vulputate velit placerat tincidunt. Aliquam consectetur fermentum magna eu pretium. Suspendisse vel est sed nunc aliquet euismod id vitae leo. Suspendisse pulvinar dui ipsum, placerat rutrum arcu laoreet vitae. In vehicula, mi ac aliquet consectetur, enim lorem ultricies augue, ac placerat leo orci nec lacus. Nullam ac nibh in odio dignissim porttitor. Aliquam et fermentum quam. Donec consequat vel tortor at tincidunt. Etiam at hendrerit ex, nec maximus nisl. Integer laoreet efficitur tempor. Nullam massa lorem, faucibus quis est quis, suscipit auctor augue. Nullam magna nisi, laoreet a scelerisque ac, malesuada eu eros. Proin a laoreet enim. Nam eu fermentum augue. Fusce sollicitudin pellentesque orci sit amet aliquam. Mauris sem ante, imperdiet in elit at, consequat bibendum dolor. Aenean maximus urna non felis malesuada dignissim. Phasellus auctor tortor sit amet efficitur venenatis. Nunc vestibulum lobortis elit et rhoncus. Praesent elementum arcu at lacus laoreet feugiat. Fusce semper, lacus et maximus accumsan, eros magna porttitor ligula, ac gravida dolor arcu a sem. Ut vehicula lorem eget bibendum congue. Curabitur non nunc non ex consectetur viverra nec quis sem. Fusce rutrum metus eu justo convallis tempor. Etiam tempus lobortis lorem id aliquam. Curabitur turpis magna, dictum a augue ac, placerat malesuada urna. Phasellus viverra orci quis purus vestibulum sagittis. Suspendisse sit amet fringilla urna. Duis efficitur nec metus vitae semper. Etiam feugiat suscipit tellus, sed luctus elit facilisis quis. Mauris mollis, nunc in venenatis cursus, erat risus placerat nibh, bibendum vestibulum lorem nisl euismod dui. Sed id scelerisque ligula, et tristique diam. Duis non urna non mi fringilla consequat sed a ex. In id metus nec purus rutrum tincidunt ac eu mi. Pellentesque luctus felis et facilisis efficitur. Etiam semper eu neque ac finibus. Nullam in dolor nec lacus tincidunt pellentesque. In eget nisi mauris. Fusce nec dolor in nulla placerat maximus. Praesent dapibus lacus at enim interdum ullamcorper. Quisque interdum malesuada turpis, quis aliquet metus tempor nec. Etiam ut tellus eu arcu tincidunt ultricies a a leo. In quis viverra lacus, a dignissim nibh. Donec tempor urna in turpis commodo mattis. Duis pellentesque ligula nec est elementum iaculis. Nullam ac tellus non ante laoreet hendrerit a sed dui. Aenean eleifend erat sed congue dignissim. Donec maximus facilisis libero. Mauris sit amet risus nec elit rutrum euismod id eu neque. Phasellus sit amet nisl sagittis, egestas ante sed, ornare leo. Cras magna nunc, finibus vel ipsum nec, pulvinar eleifend est. Maecenas pellentesque placerat porta. Morbi venenatis, nulla at dignissim aliquam, neque nibh sollicitudin libero, eleifend consectetur magna dolor non elit. Integer porta varius velit eu suscipit. Praesent at nulla malesuada nisl aliquam tempus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque quis ipsum non sem sagittis faucibus. Duis vel dolor sit amet dolor vulputate tincidunt. Duis vehicula pulvinar nisi, aliquet posuere arcu feugiat in. Praesent urna quam, molestie id tempor ac, maximus non lectus. Nullam in erat nisi. Mauris ante arcu, ultrices id nisi eget, aliquet ultricies leo. Etiam pulvinar venenatis enim eget fermentum. Suspendisse suscipit eget dui at rutrum. Aliquam porttitor est a ultricies egestas. Maecenas eu dignissim leo. Proin sit amet mauris vel velit viverra vestibulum. Etiam vitae dolor nulla. Curabitur rhoncus cursus ipsum, at feugiat lorem tempus in. Sed ullamcorper neque eu semper ultrices. Vivamus laoreet est vel urna dignissim tristique. Ut eros mauris, ultricies eu ullamcorper semper, molestie ut nibh. Mauris ante elit, ultrices non mauris sed, bibendum feugiat lectus. Etiam laoreet massa id lorem luctus finibus in quis lorem. Nullam eget aliquet magna. Maecenas vitae consequat risus. Sed mattis ornare risus, at molestie dui efficitur in. Sed suscipit odio ut nisi hendrerit ultrices. Vestibulum commodo nisl nec sapien pulvinar rutrum. Morbi sit amet aliquet sem, ac facilisis magna. Aliquam erat volutpat. Praesent at purus et dui placerat consectetur lobortis id massa. Etiam aliquet a odio sollicitudin pharetra. Vivamus lacinia eu nulla ac condimentum. Nulla sollicitudin in massa ut ornare. Nunc euismod ipsum ipsum, quis condimentum ipsum efficitur eu. Etiam vitae nisl aliquet nisl mattis aliquet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin justo massa, ultricies eu iaculis non, consectetur ut urna. Mauris volutpat, libero sit amet porttitor malesuada, nunc leo pretium leo, et finibus erat ex eu mauris. Morbi facilisis rutrum tellus a consequat. Maecenas faucibus tincidunt magna, a ultrices sapien auctor nec. Mauris vitae metus sem. In magna nulla, semper et leo non, imperdiet rhoncus nisi. Quisque id mauris sed nibh mattis convallis id at ligula. Cras a rhoncus justo. Phasellus imperdiet consequat augue, sed volutpat nulla dictum et.",
    },
    {
      id: 6,
      type: 'img',
      attributes: `src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-51129222-1624649306.jpg?crop=1.00xw:0.696xh;0,0.0244xh&resize=1200:*"`,
      content: "",
    },
    {
      id: 7,
      type: 'YoutubeEmbed',
      attributes: `videoLink='https://www.youtube.com/watch?v=Z8RoA_YSGDQ'`,
      content: "",
    },
    {
      id: 8,
      type: 'a',
      attributes: `href='https://www.youtube.com/watch?v=mwKJfNYwvm8' class='element_a'`,
      content: "I'm a hyperlink",
    },
  ])

    
  const saveFn = async () => {

    const newFile = JSON.stringify(elementsData)
    console.log(newFile)
  }

  useEffect(()=> {
    console.log(elementsData)
    
  }, [elementsData])

  return (
      
    <div className="container">
      <DndContext 
        onDragStart={handleDragStart}
        collisionDetection={closestCenter} 
        onDragEnd={handleDragEnd} 
      >
      <h1 className='heading-1'>Drag and Drop Demo for BiNNO</h1>
      <SortableContext
          items={elementsData.map((element) => element.id)}
          strategy={verticalListSortingStrategy}
        >
          {elementsData.map(element => <SortableObject key={element.id} id={element.id} elements={element}/>)}
      </SortableContext>
        {/* {elementsData && elementsData.sort((a, b) => a.order - b.order).map((item, index) => {

          return <div key={index} dangerouslySetInnerHTML={{ __html: `<${item.type} ${item.attributes}>${item.content}</${item.type}>` }} />;
        })} */}
      </DndContext>
      <button className='btn-orange' onClick={saveFn}>Save Elements</button>
    </div>
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






