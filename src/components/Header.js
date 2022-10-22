import React from 'react';
// import PropTypes from 'prop-types';
import Button from './Button';

const Header = (props) => {

  const onClick = () => {
    props.onToggle();
  };
console.log(props.location);
  return (
    <header>
      <h1> {props.title} </h1>
      { props.location.endswith('bout') ? null : 
      <Button
        color={props.shown ? '#b11' : 'green'}
        text={props.shown ? 'Close' : 'Add'}
        onClick={onClick}
      />}
    </header>
  );
};

Header.defaultProps = {
  title: 'Deed Tracker',
};

// Header.propTypes = {
//   title: PropTypes.string,
// };

export default Header;
