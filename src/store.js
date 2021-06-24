import { configureStore } from '@reduxjs/toolkit'
import productData from './reducers'

export default configureStore({
    reducer: {
        productStore: productData,
    },
})
