import React, { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Css } from '@mui/icons-material'
import YoutubeEmbed from '../YoutubeEmbed/YoutubeEmbed'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';


const SortableObject = (props) => {
    const {elements} = props;

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id: props.id})

    // Define a fixed size for the element while dragging
    const fixedSizeStyle = {
        width: '100%', // Set the width to your desired value
        height: 'auto', // Set the height to your desired value
    };

    const style = {
        ...fixedSizeStyle,
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className='draggable_style'>
        <div className='drag-handle'>
            <DragIndicatorIcon className='hover:bg-[#cccccc] rounded-md hover:cursor-grab active:cursor-grabbing'/>
        </div>
        {elements.type == 'YoutubeEmbed' ? 
            <YoutubeEmbed videoLink={elements.attributes}/> 
            :
            <div dangerouslySetInnerHTML={{ __html: `<${elements.type} ${elements.attributes}>${elements.content}</${elements.type}>` }}
        />
        }
    </div>
  )
}

export default SortableObject
