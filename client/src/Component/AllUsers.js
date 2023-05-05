import  { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, Paper, TableRow, Button, styled } from '@mui/material'
import { getUsers, deleteUser } from '../Service/api';
import { Link } from 'react-router-dom';
import { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import axios from 'axios';
const usersUrl = 'http://localhost:8000';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.common.black,
    // backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Container = styled(TableContainer)`
    width: 80%;
    margin: 50px auto 0 auto;
    & > div {
        margin-top: 20px;
        
`;

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const deleteUserData = async (id) => {
    await deleteUser(id);
    getAllUsers();
  }


  const getAllUsers = async () => {
    let response = await getUsers();
    setUsers(response.data);
  }

  const handleOpenRazorpay = (data) => {
    const options = {
      key: 'rzp_test_cHYcYG6up0Rc0P',
      amount: Number(data.amount),
      currency: data.currency,
      order_id: data.id,
      handler: function(response){
        console.log(response,"34")
        axios.post(`${usersUrl}/varify`, {response:response})
        .then(res=> {
          console.log(res , "37");
        })
        .catch(err=>{
          console.log(err);
        })
      }

    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }
  
  
  const handlePayment = async (amount) => {
    try {
      console.log(amount);
      const _data = await axios.post(`${usersUrl}/order`, { amount: amount });
      handleOpenRazorpay(_data.data.data);
    } catch (error) {
      console.log(error);
    }
  }




  return (
    <Container sx={{
      boxShadow: '0px 4px 8px rgba(1, 1, 1, 1.15)',
    }} component={Paper}> <h2 align="center">All user</h2>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell >ID </StyledTableCell>
            <StyledTableCell >Employee Name </StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell align="left">Contact Details</StyledTableCell>
            <StyledTableCell align="left">Salary</StyledTableCell>
            <StyledTableCell> </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableHead>
          {users.map((user) => (
            <StyledTableRow key={user.id}>
              <StyledTableCell align="left" style={{ backgroundColor: 'grey' }} >{user._id}</StyledTableCell>
              <StyledTableCell align="left" style={{ backgroundColor: 'grey' }} >{user.name}</StyledTableCell>
              <StyledTableCell align="left" style={{ backgroundColor: 'grey' }} >{user.email}</StyledTableCell>
              <StyledTableCell align="left" style={{ backgroundColor: 'grey' }} >{user.phone}</StyledTableCell>
              <StyledTableCell align="left" style={{ backgroundColor: 'grey' }} >{user.salary}</StyledTableCell>
              <StyledTableCell style={{ backgroundColor: 'grey' }} >
                <Button color="primary" style={{ margin: 5, backgroundColor: '#90a4ae', color: 'white' }} component={Link} to={`/edit/${user._id}`}>Edit</Button>
                <Button color="secondary" variant="contained" style={{ margin: 5, backgroundColor: '#4e342e', color: 'white' }} onClick={() => deleteUserData(user._id)}>Delete</Button>
                <Button color="secondary" variant="contained" style={{margin: 5, backgroundColor: '#4e342e', color: 'white' }} onClick={() => handlePayment(user.salary)}>Pay</Button>

              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableHead>

      </Table>
    </Container>
  )
}

export default AllUsers;