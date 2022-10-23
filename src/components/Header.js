import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Button from './Button';

const Header = (props) => {

  const onClick = () => {
    props.onToggle();
  };
console.log(props.location);
  return (
    <header>
     <Link to={props.link}> <h1> {props.title} </h1></Link>
      { props.location.endsWith('bout') ? null : 
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
  link: '/'
};

// Header.propTypes = {
//   title: PropTypes.string,
// };

export default Header;
