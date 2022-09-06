import React, { useState, useEffect } from 'react'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from "axios"




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

export const Add = () => {
  const [open, setOpen] = React.useState(false);
  // const [item, setItem] = useState([])
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [val, setVal] = useState({
    name: "",
    email: "",
    phone: ""
  })
  // useEffect(()=>{
  //   getData()
  //   },[]);

  const handleChange = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    setVal({ ...val, [name]: value })

  }
  const handle = (e) => {
    e.preventDefault()
    axios.post(`http://localhost:8080/item`, val)
      .then((res) =>
        
        alert("Data added Successfully"),
          // getData(),
        setVal({
          name: "",
          email: "",
          phone: ""
        })

      )



  }

  // const getData=()=>{
  //   axios.get("http://localhost:8080/item")
  //   .then((res)=>setItem(res.data))
  //   .catch((err)=>console.log(err.message))
  // }


  return (
    <div>
      <Button onClick={handleOpen}>Add Data</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Your Details
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
