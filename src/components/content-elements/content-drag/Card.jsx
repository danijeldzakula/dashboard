import { Fragment, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useApp } from '@/context/useApp';

const style = {
  border: '1px solid #d9d9d9',
  padding: '20px 15px',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  borderRadius: '4px',
  cursor: 'move',
};

const Card = ({ id, text, index, moveCard, handleOnClick, children, ...rest }) => {
  const { handleWidgets } = useApp();
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      handleWidgets({
        action: {
          type: 'update',
          payload: {
            dragIndex,
            hoverIndex,
          },
        },
      });
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      return { id, index };
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <Fragment>
      <div ref={ref} onClick={(e) => handleOnClick(e, rest, ref)} style={{ ...style, opacity }} data-handler-id={handlerId}>
        {children}
      </div>
    </Fragment>
  );
};

export default Card;
