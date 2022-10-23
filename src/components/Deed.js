import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Deed = ({ deed, onDelete, onToggle }) => {
  return (
    <div
      className={'deed clearfix ' + (deed.important ? ' important ' : '')}
      onDoubleClick={() => {
        onToggle(deed.id);
      }}
    >
      <h3 className="clearfix">
        {deed.text}
        <FaTimes
          className="delete-icon"
          title='delete'
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(deed.id)}
        />
      </h3>
      <p> {deed.date} </p>
      <Link to={('/deed/' + deed.id)}>Details:...</Link>
    </div>
  );
};

export default Deed;
