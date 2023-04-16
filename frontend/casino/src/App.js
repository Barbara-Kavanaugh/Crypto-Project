import './App.css';
import '@rainbow-me/rainbowkit/styles.css';
import Img from './images/background.jpg';
import styled from 'styled-components';
import { ConnectButton, RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import { ChakraProvider, Container, Heading, extendTheme } from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import { Wheel } from './components/Wheel/Wheel';

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
  const { data: accountdata } = useAccount();
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
            <Container maxW="xl" background="#000000">
              {!accountdata ? <div className="overlay">Connect Wallet</div> : <></>}
              <Heading textAlign="center">Crypto Crash</Heading>
              <Wheel />
            </Container>
          </ChakraProvider>
        </Background>
      </RainbowKitProvider>
      </>
  );
}

export default App;
