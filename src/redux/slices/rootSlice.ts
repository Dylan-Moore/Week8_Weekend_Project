import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: 'root',
    initialState: {
        name: 'pokemon',
        game_id: 0,
        type: 'Any type',
        height: 0,
        weight: 0,
        moveset: 'move'

    },

    reducers: {
        chooseName: (state, action) => {state.name = action.payload},
        chooseGame_id: (state, action) => {state.game_id = action.payload},
        chooseType: (state, action) => {state.type = action.payload},
        chooseHeight: (state, action) => {state.height = action.payload},
        chooseWeight: (state, action) => {state.weight = action.payload},
        chooseMoveset: (state, action) => {state.moveset = action.payload}
    } 
})

export const reducer = rootSlice.reducer;
export const {chooseName, chooseGame_id, chooseType, chooseHeight, chooseWeight, chooseMoveset} = rootSlice.actions;