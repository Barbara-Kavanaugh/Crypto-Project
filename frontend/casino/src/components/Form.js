import React from "react";
import {
    Button,
    Grid,
    GridItem,
    InputGroup,
    InputRightAddon,
    Input,
    Text
} from '@chakra-ui/react';

export default (props) => {
    return (
        <Grid templateColumns='repeat(6, 6fr)' gap={4}>
            <GridItem colSpan={6}><Text fontWeight="bold">Enter Amount</Text></GridItem>
            <GridItem colSpan={6}><Input value={props.amount} background="white" disabled={props.loading} onChange={(e) => {props.setBetAmount(e.target.value)}} type="number" placeholder="Amount"/></GridItem>
            <GridItem colSpan={6}><Text fontWeight="bold">Select Color</Text></GridItem>
            <GridItem colSpan={3}><Button width="100%" colorScheme="red" size="lg" disabled={props.loading} onClick={() => {props.bet('red')}}>Red</Button></GridItem>   
            <GridItem colSpan={3}><Button width="100%" colorScheme="black" backgroundColor="black" size="lg" disabled={props.loading} onClick={() => {props.bet('black')}}>Black</Button></GridItem>
        </Grid>
    );

}