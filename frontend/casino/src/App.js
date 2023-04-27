import './App.css';
import '@rainbow-me/rainbowkit/styles.css';
import Img from './images/background.jpg';
import styled from 'styled-components';
import { ConnectButton, RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { ChakraProvider, Container, Heading, extendTheme } from '@chakra-ui/react';
import { useAccount, useSigner } from 'wagmi';
import Wheel from './components/Wheel';
import Form from './components/Form';
import { useState } from 'react';
import contract from './contracts/CryptoCrashContract.json';
import { ethers } from 'ethers';
import Message from './components/Message';
import Confetti from 'react-confetti';
import { BigNumber } from 'ethers';

const Background= styled.section`
    background-image: url(${Img});
    height: 100%;
    width: 100%;
    display: block;
    background-size: cover;
    background-repeat: no-repeat;
    position: fixed;
    overflow: scroll;
`;

const theme= extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: 'red'
      }
    })
  }
})

function App(props) {
  const [betAmount, setBetAmount] = useState('');
  const [errorMessage, setErrorMessage]= useState("");
  const [loadingMessage, setLoadingMessage]= useState();
  const [successMessage, setSuccessMessage]= useState();
  const [loading, setLoading]= useState(false);
  const [prizeNumber, setPrizeNumber]= useState(false);
  const [startSpinning, setStartSpinning]= useState(false);
  const [runConfetti, setRunConfetti]= useState(false);
  const [transactionHash, setTransactionHash]= useState();
  const { data: accountdata } = useAccount();
  const { data: signer, isError, isLoading }= useSigner();
  const [winAmount, setWinAmount] = useState(0);

  const bet= (color) => {
    if (betAmount== '' || betAmount== undefined) {
      setErrorMessage('Enter a bet amount');
      return;
    }

    if (!signer) {
      setErrorMessage('No signer found');
      return;
    }
    setLoading(true);
    setLoadingMessage('Confirm your wallet transaction');

     let cryptoCrash= new ethers.Contract('deployed address', contract, signer);
     const options= {value: ethers.utils.parseEther(betAmount)}

     cryptoCrash.spin(color, options).then((transaction) => {
        setLoadingMessage('Transaction pending');
        setTransactionHash(transaction.hash);

        transaction.wait().then((minedTransaction) => {
          setLoadingMessage('Transaction mined in block number '+ minedTransaction.blockNumber);
        });

        cryptoCrash.on('Result', (id, bet, amount, player, winColor, randomResult) => {
          setLoading(false);
          const values= [{ val: 0, place: 0}];

          for (let i=1; i<=18; i++) {
            values.push({ val: values.length, place: i });
            values.push({ val: values.length, place: i+18 });
          }

          for (let i=0; i<values.length; i++) {
            if (ethers.BigNumber.from(randomResult).toNumber() === values[i].place) {
              setPrizeNumber(values[i].val);
            }
          }

          setStartSpinning(true);
          console.log(ethers.BigNumber.from(randomResult).toNumber());
          console.log(bet);
          console.log(winColor);
    
          if (bet == winColor) {
            setSuccessMessage('Congratulations, you won ' + props.winAmount + ' ether!');
            setRunConfetti(true);
          }

        });
     });
  }

  return (
    <>
      <RainbowKitProvider chains={props.chains} theme={lightTheme({
        accentColor: '#e01212'
      })}>
        <Confetti width={window.width} height={window.height} run={successMessage} recycle={false} />
        <Background>
          <ChakraProvider theme={theme}>
            <Container maxW="xl" background="#000000">
              <ConnectButton textAlign="center"/>
            </Container>
            <Container maxW="xl" background="#eddeb9">
            {/* {!accountdata ? <div className="overlay">Connect Wallet</div> : <></>} */}
              <Message successMessage={successMessage} />
              <Heading textAlign="center" color="#eb1a1a">Crypto Crash</Heading>
                <Wheel prizeNumber={prizeNumber} transactionHash={transactionHash} startSpinning={startSpinning} bet={bet} loading={loading} loadingMessage={loadingMessage} />
                <Form loading={loading} bet={bet} betAmount={betAmount} setBetAmount={setBetAmount} />
            </Container>
          </ChakraProvider>
        </Background>
      </RainbowKitProvider>
      </>
  );
}

export default App;
