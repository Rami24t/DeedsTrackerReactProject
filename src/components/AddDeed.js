import React, { useState } from 'react';
import Button from './Button';

const AddDeed = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [important, setImportant] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert('Please add deed!');
      return false;
    } else {
      const id = Math.floor(Math.random() * 100000 + 1);
      onAdd({ text, date: (new Date(date)).toUTCString().slice(0,-7), important, id });
      setText('');
      setDate('');
      setImportant(false);
      document.querySelector('input').focus();
    }
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>
          Deed
          <input
            type="text"
            placeholder="Add Deed"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </label>
      </div>
      <div className="form-control">
        <label>
          Date &#38; Time
          <input
            type="datetime-local"
            placeholder="Date &#38; Time"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </div>
      <div className="form-control form-control-check">
        <label>
          Important
          <input
            type="checkbox"
            checked={important}
            onChange={(e) => setImportant(e.target.checked)}
          />
        </label>
      </div>
      <div className="form-control">
        <Button type="submit" text="Save" color="#122" />
      </div>
    </form>
  );
};

export default AddDeed;
