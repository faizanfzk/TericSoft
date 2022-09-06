import React,{useState} from 'react'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from "axios"
import EditIcon from '@mui/icons-material/Edit';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  export const Edit = ({prop}) => {
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [val,setVal]=useState({
    name:"",
    email:"",
    phone:""
})

const handleChange=(e)=>{
 
    const name=e.target.name;
    const value=e.target.value;

    setVal({...val,[name]:value})

}
const handle=(e)=>{
e.preventDefault();

axios.put(`http://localhost:8080/item/${prop}`,{...val})
.then(()=>alert("Data updated Successfully"))
setVal({
    name:"",
    email:"",
    phone:""
})


}
return (
    <div>
        <Button onClick={handleOpen}><EditIcon /></Button>
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
     Edit Your Details
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    <form onSubmit={handle}>
        <div>
            <label htmlFor="name">Name :</label>
            <input type="text" name="name" value={val.name} onChange={handleChange} />
        </div>
        <div>
            <label htmlFor="Email">Email :</label>
            <input type="email" name="email" value={val.email} onChange={handleChange} />
        </div>
        <div>
            <label htmlFor="number">Contact :</label>
            <input type="number" name="phone" value={val.phone} onChange={handleChange} />
        </div>
        <div>
            <button type='submit'>Submit</button>
        </div>
       
    </form>
    </Typography>
  </Box>
</Modal>
    </div>
  )
}