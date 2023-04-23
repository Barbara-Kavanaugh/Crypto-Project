import React from 'react';
import { Wheel } from 'react-custom-roulette';

export default ((props) => {
    const data = [{ option: '0', style: { backgroundColor: 'green' } }];

    for (let i = 1; i <= 18; i++) {
        data.push({ option: i, style: { backgroundColor: 'red' } });
        data.push({ option: 18 + i, style: { backgroundColor: 'black' } });
    }

    return (
        <>
            <Wheel style={{ margin: '20px auto' }} data={data} textColors={'#ffffff'} />
        </>
    );
});