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
  const [amount, setAmount]= useState();
  const [errorMessage, setErrorMessage]= useState();
  const [loading, setLoading]= useState(false);
  const { data: accountdata } = useAccount();
  const { data: signer, isError, isLoading }= useSigner();

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
  }

  return (
    <>
      <RainbowKitProvider chains={props.chains} theme={lightTheme({
        accentColor: '#e01212'
      })}>
        <Background>
          <ChakraProvider theme={theme}>
            <Container maxW="xl" background="#000000">
              <ConnectButton textAlign="center"/>
            </Container>
            <Container maxW="xl" background="#eddeb9">
            {/* {!accountdata ? <div className="overlay">Connect Wallet</div> : <></>} */}
              <Heading textAlign="center" color="#eb1a1a">Crypto Crash</Heading>
                <Wheel style={{ margin: '20px auto' }} />
                <Form />
            </Container>
          </ChakraProvider>
        </Background>
      </RainbowKitProvider>
      </>
  );
}

export default App;
