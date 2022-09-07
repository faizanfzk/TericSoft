import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import { Add } from './Add';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Edit } from './Edit';

export const Tabla = () => {
  const [item, setItem] = useState([])

  useEffect(() => {
    getData()
  }, []);

  const getData = () => {
    axios.get(" https://tericsoft-assignment.herokuapp.com/task")
      .then((res) => setItem(res.data))
      .catch((err) => console.log(err.message))
  }
  var newList;
  const del = (i) => {
    axios.delete(`https://tericsoft-assignment.herokuapp.com/task/${i}`)
      .then(() => {

        newList = item.filter((id) => {
          return id != item.id
        })
        setItem(newList)
        getData()
      })
    alert("Data deleted ")
  }

  return (
    <div>
      <Add />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Contact</TableCell>
              <TableCell align="center">DOB</TableCell>
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">Hobbies</TableCell>
           
              <TableCell align="center">Delete</TableCell>
              <TableCell align="center">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {item.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">{row.dob}</TableCell>
                <TableCell align="center">{row.gender}</TableCell>
                
                <TableCell align="center">{row.hobbies}</TableCell>
                <TableCell align="center" ><IconButton onClick={() => del(row.id)} aria-label="delete">
                  <DeleteIcon />
                </IconButton></TableCell>
                <TableCell align="center"><IconButton aria-label="edit">
                  <Edit prop={row.id} />
                </IconButton></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

