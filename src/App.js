import React, { useState, useEffect } from 'react';
import './style.css';
import Header from './components/Header';
import Deeds from './components/Deeds';
import AddDeed from './components/AddDeed';
import Footer from './components/Footer';
import About from './components/About';
import { Routes, Route, useLocation } from 'react-router-dom';

export default function App() {
  let locationR = useLocation();
  const [deeds, setDeeds] = useState([
    {
      id: 1,
      text: 'Meeting at Work',
      date: 'Nov 2nd at 1:10pm',
      important: true,
    },
    {
      id: 2,
      text: 'Grocery Shopping',
      date: 'Dec 3rd at 9:30am',
      important: false,
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


  // headerButton
const [location, setLocation] = useState('app');

useEffect(() => {
    setLocation(locationR.pathname);
  }, [locationR]);
  
  return (
    <div className='container'>
      <Header onToggle={toggleAddDeed} shown={shown} location={location} />
      <Routes>
        <Route
          path="/"
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
      </Routes>
      <Footer />
      </div>
  );
}
