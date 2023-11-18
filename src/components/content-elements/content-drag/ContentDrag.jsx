import { Fragment, useCallback, useState } from 'react';
import update from 'immutability-helper';
import Card from './Card';
import DynamicComponent from '@/widgets/DynamicComponent';

export default function ContentDrag({ data, handleOnClick }) {
  const [cards, setCards] = useState(data);

  const moveCard = (dragIndex, hoverIndex) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  };

  const renderCard = useCallback((card, index) => {
    return (
      <Card key={card._id} index={index} id={card._id} text={card.name} moveCard={moveCard} handleOnClick={handleOnClick} {...card}>
        <DynamicComponent componentName={card.name} />
      </Card>
    );
  }, []);

  return <Fragment>{cards.map((card, i) => renderCard(card, i))}</Fragment>;
}
