

import { Box, Typography, styled } from '@mui/material';


const Header = styled(Box)`
    margin: 50px;
    & > div {
        margin-top: 50px;
    }
`;


const Payroll = () => {

    return (
        <Header>
            <Typography variant="h4">Welcome to Payroll</Typography>
            <Box style={{display: 'flex'}}>
             
            </Box>
        </Header>
    )
}

export default Payroll;