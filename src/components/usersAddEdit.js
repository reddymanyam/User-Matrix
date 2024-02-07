import {Card, CardContent, CardHeader, Grid, TextField,Box,Typography, Button} from '@mui/material';
import { useEffect,useState } from 'react';



export default function UsersEdit({handleCloseDialog,open,rowData}){

    const [title,setTitle]=useState(rowData?rowData?.title:"")
    const [body,setBody]=useState(rowData?rowData?.body:"")
    const [userID,setUserID]=useState(rowData?rowData?.userId:0)

    const AddUser = () => {
        let config = {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: body,
                userId: userID,
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        };
    
        fetch('https://jsonplaceholder.typicode.com/posts', config)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response is throwing Error');
                }
                return response.json();
            })
           
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
            handleCloseDialog()
    };
    const EditUser = () => {
        let config = {
            method: 'PUT',
            body: JSON.stringify({
                title: title,
                id:rowData?.id,
                body: body,
                userId: userID,
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        };
    
        fetch('https://jsonplaceholder.typicode.com/posts/'+`${rowData?.id}`, config)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response is throwing Error');
                }
                return response.json();
            })
           
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
            handleCloseDialog()
    };
    console.log(rowData,"rowDataaa")
    return (
        <>
       <Card>
       <Box
      height="30px"
      backgroundColor="#3B82F6"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h6" style={{ color: '#FFFFFF' }}>
      {rowData?"Edit User":"Add User"}
      </Typography>
    </Box>
          <CardContent>
            <Grid container flexDirection="row" justifyContent="space-between" spacing={2}>
              <Grid item xs={12} md={6}>
               <TextField 
               aria-label='text-field'
               label="Title"
               fullWidth
               value={title}
               onChange={(e)=>setTitle(e.target.value)}
               placeholder='Please Enter Title...'/>
              </Grid>
              <Grid item xs={12} md={6}>
               <TextField 
               aria-label='text-field'
               label="UserID"
               fullWidth
               value={userID}
               onChange={(e)=>setUserID(e.target.value)}
               placeholder='Please Enter UserID...'/>
              </Grid>
            </Grid>
            <Grid container flexDirection="row" justifyContent="space-between" spacing={2} sx={{marginTop:0.5}}>
              <Grid item xs={12} md={12}>
               <TextField 
               aria-label='text-field'
               label="Body"
               fullWidth
               value={body}
               onChange={(e)=>setBody(e.target.value)}
               placeholder='Please Enter Body...'/>
              </Grid>
           
            </Grid>
<div style={{display:'flex',justifyContent:'right'}}>
<Button variant="contained" color="primary" sx={{float:'right !important',marginTop:1,marginBottom:0.5}} onClick={rowData?EditUser:AddUser}>{rowData?"Edit User":"Add User"}</Button>
<Button variant="outlined" color="warning" sx={{marginLeft:1,marginTop:1,marginBottom:0.5}} onClick={handleCloseDialog}>Cancel</Button>
</div>
           
          </CardContent>
       </Card>
        </>
    )
}