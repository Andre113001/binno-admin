import React, { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import YoutubeEmbed from '../YoutubeEmbed/YoutubeEmbed'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const SortableObject = (props) => {
    const { elements } = props;

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
        handle
    } = useSortable({ id: props.id })

    const [isEditing, setEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(elements.content);

    const toggleEditing = () => {
        setEditing(!isEditing);
    };

    const handleDoubleClick = () => {
        toggleEditing();
    };

    const handleContentChange = (event) => {
        setEditedContent(event.target.value);
    };

    // Define a fixed size for the element while dragging
    const fixedSizeStyle = {
        width: '100%', // Set the width to your desired value
        height: 'auto', // Set the height to your desired value
    };

    const style = {
        ...fixedSizeStyle,
        transform: CSS.Translate.toString(transform),
        transition
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`draggable_style ${isEditing ? 'editable' : ''}`}
            onDoubleClick={handleDoubleClick}
        >
        {isEditing ? (
            <textarea
                value={editedContent}
                onChange={handleContentChange}
                onBlur={toggleEditing}
                autoFocus
            />
        ) : (
            <>
                {elements.type === 'YoutubeEmbed' ? (
                    <YoutubeEmbed videoLink={elements.attributes} />
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: `<${elements.type} ${elements.attributes}>${editedContent}</${elements.type}>` }} />
                )}
            </>
        )}
    </div>
    );
}

export default SortableObject;
