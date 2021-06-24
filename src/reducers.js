import { createSlice } from '@reduxjs/toolkit'
import { filter } from 'lodash'
import { BASIC_DATA } from './Data/dataDump'

export const productData = createSlice({
    name: 'products',
    initialState: {
        products: [...BASIC_DATA],
    },
    reducers: {
        addNew: (state, action) => {
            const newArr = [action.payload, ...state.products];
            state.products = [...newArr];
        },
        deleteItem: (state, action) => {
            const newArr = filter(state.products, prod => (prod.id !== action.payload.id));
            state.products = [...newArr];
        },
        editItem: (state, action) => {
            const filteredArr = filter(state.products, prod => (prod.id !== action.payload.id));
            state.products = [action.payload, ...filteredArr];
        },
    },
})

// Action creators are generated for each case reducer function
export const { addNew, deleteItem, editItem } = productData.actions

export default productData.reducer
