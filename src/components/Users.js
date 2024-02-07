import axios from 'axios';
import { useEffect,useState } from 'react';
import {Dialog,Button, IconButton, Typography} from '@mui/material'
import UsersEdit from './usersAddEdit';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
export default function Users(){

    const [usersList,setUsersList]= useState()
    const [open,setOpen] = useState(false)
    const [rowData,setRowData]=useState()
    useEffect(()=>{
        usersData()
    },[])
    const usersData = () => {
        let config = {
            method: 'GET',
            headers: {}
        };
    
        fetch('https://jsonplaceholder.typicode.com/posts', config)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response is throwing Error');
                }
                return response.json();
            })
            .then(data => {
                console.log(JSON.stringify(data));
                setUsersList(data);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
    };
    const handleDeleteRow =(item)=>{
        let config = {
            method: 'DELETE',
            headers: {}
        };
    
        fetch('https://jsonplaceholder.typicode.com/posts/'+`${item?.id}`, config)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response is throwing Error');
                }
                return response.json();
            })
            
            .catch(error => {
                console.error('There was a problem while Deleting:', error);
            });
    }
    const handleOpenDialog=()=>{
        setOpen(true)
    }
    const handleCloseDialog=()=>{
        setOpen(false)
    }
    const handleRowClick=(item)=>{
        setRowData(item)
        handleOpenDialog()
    }
    return (
        <>
 <Typography variant="subtitle1" sx={{fontWeight:700}}>Users List</Typography>
   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
  <table style={{ borderCollapse: 'collapse', border: '1px solid black' }}>
    <thead>
      <tr>
        <th style={{ border: '1px solid black', padding: '8px' }}>ID</th>
        <th style={{ border: '1px solid black', padding: '8px' }}>UserID</th>
        <th style={{ border: '1px solid black', padding: '8px' }}>Title</th>
      </tr>
    </thead>
    <tbody>
      {usersList?.map((item, index) => {
        return (
          <tr key={index} >
            <td style={{ border: '1px solid black', padding: '8px' }}>{item?.id}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{item?.userId}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>{item?.title}</td>
            <td style={{ border: '1px solid black', padding: '8px' }}>
                <IconButton onClick={() => handleRowClick(item)} color="success"><EditIcon/></IconButton>
                <IconButton onClick={() => handleDeleteRow(item)} color="error"><DeleteIcon/></IconButton>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
  <div style={{ position: 'fixed', top: '85vh', right: 0, zIndex: 100, margin: '20px' }}>
    <Button color="primary" variant="contained" onClick={handleOpenDialog}>Add User</Button>
  </div>
</div>


  <Dialog
    open={open}
    onClose={handleCloseDialog}
    aria-labelledby="customized-dialog-title"
    PaperProps={{
        sx:{maxWidth:700,overflow:'auto'}
      }}
    >
     <UsersEdit handleCloseDialog={handleCloseDialog} open={open} rowData={rowData}/>
    </Dialog>


        </>
    )
}