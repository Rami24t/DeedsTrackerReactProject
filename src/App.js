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
    // {
    //   id: 1,
    //   text: 'Meeting at Work',
    //   date: 'Nov 2nd at 1:10pm',
    //   important: true,
    //   details: 'Reminder to go to the job meeting \n on Nov 2nd at 1:10pm',
    // },
    // {
    //   id: 2,
    //   text: 'Grocery Shopping',
    //   date: 'Dec 3rd at 9:30am',
    //   important: false,
    //   details: 'Grocery Shopping details \n Nov 2nd at 1:10pm',
    // },
  ]);
  // fetch data from db
  const dbURL = 'http://localhost:5000/deeds';
  async function getData(url = dbURL) {
    const response = await fetch(url);
    return await response.json();
  }
  async function updateData(url='http://localhost:5000/deeds') {
      const data = await getData(url);
      setDeeds(data);
  }
  useEffect(() => {
    updateData();
  }, [])

  async function getDeed(id, url=dbURL){
    if(!id)
    {
      console.log(id);
      return false;
    }
    return await getData(url+'/'+id);
  }
  

  // Function deleteDeed
  async function deleteDeed(id) {
    id = ((await updateData()).find((deed) => deed.id === id)).id;
    if(!id)
      return false;
    const delURL = dbURL + '/' + id;
    const settings = {
      "method": "DELETE"
//      body: null,
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    }
    const response = await fetch(delURL, settings);
//    console.log('58: response: ',response);
    if(response.status!==200 || !response.ok)
      return false;
    else
//      updateData();
    setDeeds(deeds.filter((deed) => deed.id !== id));
  }

  //Function toggle important
  const toggleImportant = (id) => {
    const deed = deeds.find((deed) => deed.id === id);
    deed.important = !deed.important;
    //    console.log(deed.important);
    setDeeds([...deeds]);
  };

  // function addDeed
  const addDeed = async (deed) => {
    const settings = {
      "method": "POST",
      "body": JSON.stringify(deed),
      "headers": {
         'Content-Type': 'application/json'
       }
    }
    const response = await fetch(dbURL, settings);
//    console.log('82: response: ',response);
    const data = await response.json();
//    console.log('84data: ',data);
    if(response.status!==201 || !response.ok)
      return false;
    else
    setDeeds([...deeds, data]);
//    setDeeds([deed, ...deeds]);
  };

  // function toggleAddDeed
  const [shown, setShown] = useState(false);

  const toggleAddDeed = () => {
    setShown(!shown);
  };


  // use location to hide header button
let location = useLocation().pathname;

//loading time bool
const [loading,setLoading] = useState(true);
useEffect(() => {
setTimeout(() => {
  setLoading(false);
}, 200);
  return () => {
    setLoading(true);
  }
}, [])


  
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
              ) : ( loading ? ('LOADING...') : 
                ('You do not have any deeds yet!')
              )}
            </div>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path='/deed/:id' element={<DeedDetails deeds={deeds} loading={loading}/>} />
        <Route path='*' element={<Navigate to='/home' replace={true}/>}/>
      </Routes>
      <Footer />
      </div>
  );
}
