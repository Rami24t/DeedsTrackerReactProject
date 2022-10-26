import React from 'react'
import { useParams } from 'react-router-dom';

const DeedDetails = ({deeds, loading}) => {
  const {id} = useParams();
  let found = {};
  let deed = {
    "text": "Loading",
    "date": Date('now'),
    "important": false,
    "details": "Loading details..."
  }
//  console.log(loading);
  if(!loading)
  deed =
  {
    "text": "Deed not found!",
    "date": Date('now'),
    "important": false,
    "details": "The deed with id \'"+id + "\' was not found."
  }
  if(deeds)
    (found = deeds?.find(deed=>deed.id==id)) ? deed = found : null;
  return (
    <>
    <h2>{deed?.text} Details:</h2>
  {deed?.important ? <h3> /!\ </h3> : ''}
    <p>When:  {deed?.date} </p>
    <pre>{deed?.details}</pre>
    </>
  )
}

export default DeedDetails