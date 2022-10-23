import React from 'react'
import { useParams } from 'react-router-dom';

const DeedDetails = ({deeds}) => {
  const {id} = useParams();



  const deed = deeds.find(deed=>deed.id==id);
  console.log(deed.details);
  return (
    <>
    <h2>{deed.text}- Details:</h2>
    <pre>{deed.details}</pre>
    </>
  )
}

export default DeedDetails