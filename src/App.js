import './style.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Deeds from './components/Deeds';
import AddDeed from './components/AddDeed';
import Footer from './components/Footer';
import About from './components/About';
import DeedDetails from './components/DeedDetails';

export default function App() {
  const [deeds, setDeeds] = useState([
    {
      id: 1,
      text: 'Meeting at Work',
      date: 'Nov 2nd at 1:10pm',
      important: true,
      details: 'Reminder to go to the job meeting \n on Nov 2nd at 1:10pm',
    },
    {
      id: 2,
      text: 'Grocery Shopping',
      date: 'Dec 3rd at 9:30am',
      important: false,
      details: 'Grocery Shopping details \n Nov 2nd at 1:10pm',
    },
  ]);

  // Function deleteDeed
  const deleteDeed = (id) => {
    setDeeds(deeds.filter((deed) => deed.id !== id));
  };

  //Function toggle important
  const toggleImportant = (id) => {
    const deed = deeds.find((deed) => deed.id === id);
    deed.important = !deed.important;
    //    console.log(deed.important);
    setDeeds([...deeds]);
  };

  // function addDeed
  const addDeed = (deed) => {
    setDeeds([deed, ...deeds]);
  };

  // function toggleAddDeed
  const [shown, setShown] = useState(false);

  const toggleAddDeed = () => {
    setShown(!shown);
  };


  // use location to hide header button
let location = useLocation().pathname;
  
  return (
    <div className='container'>
      <Header onToggle={toggleAddDeed} shown={shown} location={location} />
      <Routes>
        <Route path='/' element={<Navigate to='/home' replace={true}/>}/>
        <Route
          path="/home"
          element={
            <div>
              {shown ? <AddDeed onAdd={addDeed} /> : null}
              {deeds.length > 0 ? (
                <div className="deeds">
                <Deeds
                  deeds={deeds}
                  onDelete={deleteDeed}
                  onToggle={toggleImportant}
                />
                </div>
              ) : (
                'You do not have any deeds yet!'
              )}
            </div>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path='/deed/:id' element={<DeedDetails deeds={deeds}/>} />
      </Routes>
      <Footer />
      </div>
  );
}
