import React from 'react';
import {
    Alert,
    AlertIcon,
    Box,
    AlertDescription
} from '@chakra-ui/react';

export default (props) => {
    if (props.successMessage)
    return (
        <Alert>
            <AlertIcon />
            <Box>
                <AlertDescription>
                    {props.successMessage}
                </AlertDescription>
            </Box>
        </Alert>
    );
}