import React, { useState, useEffect, useRef } from 'react';
import '../styles/Main.scss';
import { createWheel } from '../../utils/createWheel';
import { wheelController } from '../../utils/wheelController';

const Main = () => {
  const wheelRef= useRef()

  const colorScheme= {
    white: '#ffff',
    gold: '#FFD700',
    purple: '#984ad9',
    darkGold: '#c79408',
    warning: '#d40202'
  }

  const [wheel, setWheel]= useState([]);
  const [risk, setRisk]= useState('Medium');
  const [segment, setSegment]= useState('10');
  const [deg, setDeg]= useState(0);
  const [coordinate, setCoordinate]= useState("");
  
  let [win, setWin]= useState(null);
  let [showWin, setShowWin]= useState(null);
  let [buttonResponse, setButtonResponse]= useState(false);
  let [colorResponse, setColorResponse]= useState('');

  const initialWheel = () => {
    return createWheel(segment, risk, colorScheme);
  }

  useEffect(() => {
    const wheelValue= initialWheel();
    setCoordinate(wheelValue.degree)
    setWheel(wheelValue?.wheelData);
  }, [segment, risk]);

  const startRotate= () => {
    if (wheelRef.current) {
      let randomDegree= Math.floor(800+ Math.random()* 1000);
      const temp= randomDegree % 360;
      randomDegree= randomDegree- (temp%(360/segment));
      wheelRef.current.style.transition= 'all 3s';
      wheelRef.current.style.transform= `rotate(${randomDegree}deg)`;
      setDeg(randomDegree);
    }
  }

  useEffect(() => {
    if (wheelRef.current && deg) {
      wheelRef.current.ontransitionend= () => {
        wheelRef.current.style.transition= 'none';

        let actualDegree= deg%360;
        const winData= wheelController(coordinate, actualDegree, segment);
        setWin(winData?.winValue);
        setColorResponse(winData?.winColor);
        setShowWin(winData?.winValue);
        
        wheelRef.current.style.transform= `rotate(${actualDegree}deg)`;
      }
    }

  }, [deg]);

  return (
    <div className='main-area'>
      <div className='game-area'>
        <div className='sidebar'>
          <div className='main-control'>
            <div className='form'>
              <div className='form-group'>
                <div className='label'>
                  <span>Bet Amount</span>
                  <span>0.00055 ETH</span>
                </div>
                <div className='input-group'>
                  <input type='number' />
                </div>
                <div className='label'>
                    <span>Risk</span>
                  </div>
                  <div className='input-group'>
                    <select value={risk} onChange={(event) => setRisk(event.target.value)} id=''>
                      <option value='Low'>Low</option>
                      <option value='Medium'>Medium</option>
                      <option value='High'>High</option>
                    </select>
                  </div>

                  <div className='label'>
                    <span>Segment</span>
                  </div>
                  <div className='input-group'>
                    <select value={segment} onChange={(event) => setSegment(parseInt(event.target.value))} id=''>
                      <option value='10'>10</option>
                      <option value='20'>20</option>
                      <option value='30'>30</option>
                      <option value='50'>50</option>
                    </select>
                  </div>
              </div>
            </div>
            <div className='form'>
              <div className='form-group'>
                <button onClick={startRotate} className='bet'>Place Bet</button>
              </div>
            </div>
          </div>
        </div>
        <div className='gamebar'>
          <div className='gamebar-container'>
            <span className='marker'><img src='./marker.png' alt='marker'/></span>
            <div className='temp'>
              <div ref={wheelRef} className='wheel'>
                {
                  [...wheel]
                }
              </div> 
              <div className='mid'>
                <div className='circle'>
                  {
                    showWin!== null && <span style={{color: `${colorScheme[colorResponse]}`}}>{showWin}</span>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
