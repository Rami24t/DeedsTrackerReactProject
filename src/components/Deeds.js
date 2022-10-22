// import React, { useState } from 'react';
import Deed from './Deed';

const Deeds = ({ deeds, onDelete, onToggle }) => {
  return (
    <>
      {deeds.map((deed) => (
        <Deed
          key={deed.id}
          deed={deed}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};

export default Deeds;
