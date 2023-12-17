import { uuidv4 } from '@/helpers';
import update from 'immutability-helper';
import { ESCAPE_CODE, ESCAPE_KEY, ESC_KEY, HAS_WINDOW, STORAGE_NOTES } from '@/helpers/constant';
import { memo, useEffect, useId, useRef, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useDrag, useDrop } from 'react-dnd';
import 'react-toastify/dist/ReactToastify.css';

const style = {
  border: '1px solid #d9d9d9',
  padding: '20px 15px',
  backgroundColor: 'white',
  borderRadius: '4px',
  cursor: 'move',
};

const initForm = {
  title: '',
  _id: '',
};

const RenderNotes = memo(({ setData }) => {
  const [refetchNotes, setRefetchNotes] = useState(false);
  const [notes, setNotes] = useState(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_NOTES));

    if (data !== null) {
      return data || [];
    }

    return [];
  });

  useEffect(() => {
    if (HAS_WINDOW) {
      localStorage.setItem(STORAGE_NOTES, JSON.stringify(notes));
    }
  }, [notes, refetchNotes]);

  const inputRef = useRef(null);
  const [form, setForm] = useState(initForm);

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const payload = {
      title: form.title,
      _id: uuidv4(),
    };

    setNotes((prev) => {
      return [...prev, payload];
    });

    setForm(initForm);

    setRefetchNotes((p) => !p);

    toast.success('Create note, this is a success!', {
      position: toast.POSITION.BOTTOM_LEFT,
    });

    inputRef.current.focus();
  };

  const editNote = (data) => {
    setNotes((prev) => {
      const findNote = prev.find((p) => p._id === data._id);

      findNote.title = data.title;

      return [...prev];
    });

    setRefetchNotes((p) => !p);

    toast.info('Updated this note, this is a success!', {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  };

  const removeNote = (id) => {
    setNotes((prev) => {
      const notes = prev.filter((p) => p._id !== id);
      return notes;
    });

    setRefetchNotes((p) => !p);

    toast.error('Removed this note, this is a success!', {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  };

  const removeAllNotes = () => {
    setNotes([]);
  };

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        notes: notes,
      };
    });
  }, [notes]);

  const moveCard = (dragIndex, hoverIndex) => {
    setNotes((prev) =>
      update(prev, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prev[dragIndex]],
        ],
      })
    );
  };

  const listNotes = useCallback(() => {
    return notes.map((note, idx) => {
      return <ListItem key={note._id} note={note} index={idx} moveCard={moveCard} editNote={editNote} removeNote={removeNote} />;
    });
  }, [notes]);

  console.log('re-render notes');

  return (
    <div>
      <h2>Notes List</h2>
      <button onClick={removeAllNotes}>Clear All</button>

      <form onSubmit={onSubmit}>
        <label htmlFor="titleId">Title</label>
        <input ref={inputRef} id="titleId" type="text" name="title" placeholder="Notes" value={form.title} onChange={onChange} />
        <button type="submit">Save</button>
      </form>

      {notes.length > 0 ? <ul className="notes">{listNotes()}</ul> : <p>No found data</p>}
    </div>
  );
});

const ListItem = ({ note, index, moveCard, editNote, removeNote }) => {
  const id = useId();
  const ref = useRef(null);
  const inputRef = useRef(null);
  const [toggle, setToggle] = useState(false);
  const [form, setForm] = useState({
    updateTitle: note.title,
    _id: note._id,
  });

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const toggleEditNote = () => {
    setToggle(true);

    setTimeout(() => {
      if (inputRef) inputRef?.current.focus();
    }, 0);
  };

  const handleSaveNote = (event) => {
    event.preventDefault();
    const payload = {
      title: form.updateTitle,
      _id: form._id,
    };
    editNote(payload);
    setToggle(false);
  };

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

  const onEscape = (event) => {
    if (event.key === ESCAPE_KEY || event.key === ESC_KEY || event.which === ESCAPE_CODE) {
      setToggle(false);
    }
  };

  useEffect(() => {
    toggle && HAS_WINDOW && window.addEventListener('keydown', onEscape, false);

    return () => {
      toggle && HAS_WINDOW && window.removeEventListener('keydown', onEscape, false);
    };
  }, [toggle]);

  return (
    <li ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
      {!toggle ? (
        <div>
          <p>{note.title}</p>
          <button onClick={toggleEditNote}>Edit</button>
        </div>
      ) : (
        <form onSubmit={handleSaveNote}>
          <label htmlFor={id}>Title</label>
          <input ref={inputRef} id={id} type="text" value={form.updateTitle} name="updateTitle" placeholder="Notes" onChange={onChange} />
          <button type="submit">Save</button>
        </form>
      )}

      <button onClick={() => removeNote(note._id)}>Remove</button>
    </li>
  );
};

export default RenderNotes;
