import { Fragment, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useApp } from '@/context/useApp';

const style = {
  border: '1px solid #d9d9d9',
  padding: '20px 15px',
  marginBottom: '30px',
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

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

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
