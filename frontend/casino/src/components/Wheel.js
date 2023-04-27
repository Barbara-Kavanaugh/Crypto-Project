import { Spinner } from '@chakra-ui/react';
import React from 'react';
import { Wheel } from 'react-custom-roulette';

export default ((props) => {
    const data = [{ option: '0', style: { backgroundColor: 'green' } }];

    for (let i = 1; i <= 18; i++) {
        data.push({ option: i, style: { backgroundColor: 'red' } });
        data.push({ option: 18 + i, style: { backgroundColor: 'black' } });
    }

    let explorerUrl= `https://goerli.etherscan.io/${props.transactionHash}`;

    if (props.loading) {
        return (
            <div className="spinnerContainer">
                <Spinner color="red" thickness='7px' size='xl' />
                <br />
                <br />
                {props.loadingMessage}
                {props.transactionHash ? <a style={{ fontWeight: 'bold' }} href={explorerUrl} target="_blank">View Transaction</a> : <></>}
            </div>
        )
    }

    return (
        <>
            <Wheel prizeNumber={props.prizeNumber} style={{ margin: '20px auto', color: 'white' }} data={data} textColors={'white'}>
                mustStartSpinning={props.startSpinning}
            </Wheel>
        </>
    );
});