import {useEffect, useState} from "react";
import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux'
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, TextField,
    DialogActions, Button, InputLabel, Select, FormControl, MenuItem, Grid
} from "@material-ui/core";
import {PROD_CATEGORY} from "../Data/dataDump";
import SaveIcon from "@material-ui/icons/Save";
import { addNew, editItem } from '../reducers'

const DialogForm = ({ open, handleClose, data }) => {
    const [defaultCategory, setDefaultCategory] = useState('');
    const dispatch = useDispatch();
    const categoryList = () => PROD_CATEGORY.map(cat => (<MenuItem key={cat.id} value={cat.id}>{cat.value}</MenuItem>));
    const ACTION = isEmpty(data) ? 'ADD' : 'EDIT';
    const dialogHeading = (ACTION === 'ADD') ? 'Add product' : 'Edit product';
    const onCatChange = ({ target }) => {
        setDefaultCategory(target.value);
    };
    useEffect(() => {
        if (!isEmpty(data)) {
            setDefaultCategory(data.category);
        } else {
            setDefaultCategory('');
        }
    }, [data])

    const onSave = (e) => {
        e.preventDefault();
        if (ACTION === 'ADD') {
            const uid = uuidv4();
            dispatch(addNew({
                id: uid,
                productName: e.target.name.value,
                productSKU: e.target.SKU.value,
                category: defaultCategory,
                productCost: e.target.productCost.value,
                noOfProduct: e.target.noOfProduct.value,
            }));
        } else {
            dispatch(editItem(
                {
                    id: data.id,
                    productName: e.target.name.value,
                    productSKU: e.target.SKU.value,
                    category: defaultCategory,
                    productCost: e.target.productCost.value,
                    noOfProduct: e.target.noOfProduct.value,
                }
            ));
        }
        document.getElementById("productForm").reset();
        handleClose();
    };
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <form id="productForm" onSubmit={onSave}>
            <DialogTitle id="form-dialog-title">{dialogHeading}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    style={{ marginBottom: '10px' }}
                    required
                    defaultValue={(ACTION === 'EDIT') ? data.productName : ''}
                />
                <TextField
                    margin="dense"
                    id="SKU"
                    label="SKU"
                    type="text"
                    fullWidth
                    style={{ marginBottom: '10px' }}
                    required
                    defaultValue={data.productSKU}
                />
                <Grid container>
                    <Grid item xs={12}>
                        <FormControl variant="standard" style={{ width: '100%', marginBottom: '10px'}}>
                            <InputLabel>Product Category*</InputLabel>
                            <Select value={defaultCategory} onChange={onCatChange} fullWidth>
                                {categoryList()}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <TextField
                    margin="dense"
                    id="productCost"
                    label="Price"
                    type="text"
                    fullWidth
                    style={{ marginBottom: '10px' }}
                    required
                    defaultValue={data.productCost}
                />
                <TextField
                    margin="dense"
                    id="noOfProduct"
                    label="Number of Items"
                    type="number"
                    fullWidth
                    style={{ marginBottom: '10px' }}
                    required
                    defaultValue={data.noOfProduct}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button
                    type={"submit"}
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon/>}
                >
                    SAVE
                </Button>
            </DialogActions>
        </form>
        </Dialog>
    );
};

export default DialogForm;
