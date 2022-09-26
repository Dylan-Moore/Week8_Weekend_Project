import React, { useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { useGetData } from '../../custom-hooks';
import { serverCalls } from '../../api';
import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';

import { PokemonForm } from '../../components/PokemonForm';
import { getAuth } from 'firebase/auth';

const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', flex: 1, minWidth: 130},
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        editable: true
    },
    {
        field: 'type',
        headerName: 'Type',
        width: 150,
        editable: true,
    },
    {
        field: 'height',
        headerName: 'Height',
        type: 'number',
        width: 110,
        editable:  true
    },
    {
        field: 'weight',
        headerName: 'Weight',
        type: 'number',
        width: 100,
        editable: true
    },
    {
        field: 'moveset',
        headerName: 'Moveset',
        type: 'list',
        width: 300,
        editable: true
    }
];

interface gridDate {
    data: {
        id?: string;
    }
}

export const DataTable = () => {
    const auth = getAuth()
    console.log(auth.currentUser)
    let { pokemonData, getData} = useGetData()
    let [open, setOpen] = useState(false)
    let [gridData, setData] = useState<GridSelectionModel>([])

    let handleOpen = () => {
        setOpen(true)
    }

    let handleClose = () => {
        setOpen(false)
    }

    let deleteData = () => {
        serverCalls.delete(`${gridData[0]}`)
        getData()
    }

    console.log(gridData)
    if (auth.currentUser) {
        return (
            <div style={{ height: 600, width: '100%' }}>
                <h2>Pokemon in Your Team!</h2>
                <DataGrid
                    rows={pokemonData}
                    columns={columns}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    checkboxSelection
                    onSelectionModelChange={(newSelectionModel) => {setData(newSelectionModel); }}
                    {...pokemonData}
                />
                <Button onClick={handleOpen}>Update</Button>
                <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Update Pokemon</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Pokemon Id: {gridData[0]}</DialogContentText>
                        <PokemonForm id={`${gridData[0]}`} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Cancel</Button>
                        <Button onClick={handleClose} color="secondary">Done</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
    else {
        return(
            <div>
                <h3>Please Sign In to View Your Pokemon Team</h3>
            </div>
        )
    };
}
