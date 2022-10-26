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
  const dbURL = 'https://api.jsonbin.io/v3/b/635705b265b57a31e6a13759/latest/?meta=false';
  async function getData(url = dbURL) {
    const response = await fetch(url);
    return (await response.json()).deeds;
  }
  async function updateData(url = dbURL) {
    const data = await getData(url);
    setDeeds(data);
    return deeds;
  }
  useEffect(() => {
    updateData();
  }, [])

  async function getDeed(id, url = dbURL) {
    if (!id) {
      // console.log(id);
      return false;
    }
    return await getData(url + '/' + id);
  }

  //function check id
  async function checkID(id) {
    try {
      id = ((await updateData())?.find((deed) => deed.id === id))?.id;
      if (!id) {
        console.log('Deleting failed! ID not found!');
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }
  const putURL = "https://api.jsonbin.io/v3/b/635705b265b57a31e6a13759/";

async function putData(data) {
  // console.log(JSON.parse(data));
    const putURL = "https://api.jsonbin.io/v3/b/635705b265b57a31e6a13759/";
    const settings = {
      "method": "PUT",
      "body": data,
      headers: {
        "Content-Type": "application/json"
        //  "X-Master-Key": "$2b$10$JRnVji8T7bax1B6iBoABP.E6J0/WocI7U6ZEyJqFbRt5l2J0RtVcC",
        //    "X-JSON-Path": '$.deeds[?(@.id=="'+id+'")]'
      }
    }
    const response = await fetch(putURL, settings);
    if (response.status !== 200 || !response.ok) {
      console.log('response failed: ', response);
      return false;
    }
    else {
      setDeeds((await response.json()).record.deeds);
      return true
    }
  }

// Function deleteDeed
async function deleteDeed(id) {
  if (!(await checkID(id)))
    return false;
    const updatedArr = deeds.filter((deed) => deed.id !== id);
    setDeeds(updatedArr);
  await putData(JSON.stringify({"deeds": updatedArr}));
}

//Function toggle important
const toggleImportant = async (id) => {
  if (!(await checkID(id)))
    return false;
  const deed = deeds?.find((deed) => deed.id === id);
    deed.important = !deed.important;
     setDeeds([...deeds]);
   await putData(JSON.stringify({ "deeds": deeds}));
};

// function addDeed
const addDeed = async (deed) => {
  if (!deed)
    return false;
  if(!deed.id)
  {let newID=0;
  do {
  newID= Math.floor(Math.random()*1000000+1);
  } while (deeds.find(deed=>deed.id==newID))
  deed.id=newID;
}
  const updatedArr = [deed,...deeds];
  // setDeeds(updatedArr);
  await putData(JSON.stringify({"deeds": updatedArr}));
  // const putURL = "https://api.jsonbin.io/v3/b/635705b265b57a31e6a13759/";
  // const settings = {
  //   "method": "POST",
  //   "body": JSON.stringify(deed),
  //   "headers": {
  //     "Content-Type": "application/json"
  //     //  "X-Master-Key": "$2b$10$JRnVji8T7bax1B6iBoABP.E6J0/WocI7U6ZEyJqFbRt5l2J0RtVcC",
  //     //    "X-JSON-Path": '$.deeds[?(@.id=="'+id+'")]'
  //   }
  // }
  // const response = await fetch(putURL, settings);
  // //   const response = await fetch(putURL, settings);
  // if (response.status !== 200 || !response.ok) {
  //   console.log('response failed: ', response);
  //   return false;
  // }
  // else {
  //   setDeeds((await response.json()).record.deeds);
  // // //    setDeeds([deed, ...deeds]);
  // //     setDeeds([...deeds, data]);
  //   return true

  // const settings = {
  //   "method": "POST",
  //   "body": JSON.stringify(deed),
  //   headers: {
  //     "Content-Type": "application/json"
  // }
  // }
  // try {
  //   const response = await fetch(putURL, settings);
  //   //    console.log('82: response: ',response);
  //   const data = await response.json();
  //   //    console.log('84data: ',data);
  //   if (response.status !== 201 || !response.ok)
  //     return false;
  //   else
  //     setDeeds([...deeds, data]);
  // } catch (error) {
  //   console.log(error);
  // }
  // //    setDeeds([deed, ...deeds]);
};

// function toggleAddDeed
const [shown, setShown] = useState(false);

const toggleAddDeed = () => {
  setShown(!shown);
};


// use location to hide header button
let location = useLocation().pathname;

//loading time bool
const [loading, setLoading] = useState(true);
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
      <Route path='/' element={<Navigate to='/home' replace={true} />} />
      <Route
        path="/home"
        element={
          <div>
            {shown ? <AddDeed onAdd={addDeed} /> : null}
            {deeds?.length > 0 ? (
              <div className="deeds">
                <Deeds
                  deeds={deeds}
                  onDelete={deleteDeed}
                  onToggle={toggleImportant}
                />
              </div>
            ) : (loading ? ('LOADING...') :
              ('You do not have any deeds yet!')
            )}
          </div>
        }
      />
      <Route path="/about" element={<About />} />
      <Route path='/deed/:id' element={<DeedDetails deeds={deeds} loading={loading} />} />
      <Route path='*' element={<Navigate to='/home' replace={true} />} />
    </Routes>
    <Footer />
  </div>
);
}
