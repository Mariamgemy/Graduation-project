


import React, { useState } from 'react';
import ButtonGroup from '../components/ButtonGroup';
import AccorDion from '../components/AccorDion';
import Line from "../components/Line"

function Questions() {
  const [selectedButton, setSelectedButton] = useState("button1");

  const handleButtonClick = (buttonValue) => {
    setSelectedButton(buttonValue);
  };

  return (
    <>
    <div className="container">
  <h2 className=" text-color fw-bold mt-5 text-center mb-4">الاسئلة الشائعة </h2>
<Line/>
 <hr/>
 <div className="row">
 <div className="col-md-3 ">
      <ButtonGroup onButtonClick={handleButtonClick} />
      </div>
      <div className="col-md-9  align-items-start">
      <AccorDion contentKey={selectedButton} />
      </div>
      </div>
    </div>
    </>
  );
}

export default Questions;