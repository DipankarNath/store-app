import {useEffect, useState} from "react";
import { filter } from 'lodash';
import {Button, Container, FormControl, FormGroup, Grid, InputLabel, MenuItem, Select} from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux';
import {BASIC_DATA, CATEGORY} from "../Data/dataDump";
import DataTable from "./dataTable";
import SaveIcon from "@material-ui/icons/Save";
import DialogForm from "./dialogForm";
import {deleteItem} from "../reducers";


const AppBody = () => {
    const [defaultCategory, setDefaultCategory] = useState('ALL');
    const [productData, setProductData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState([]);
    const dispatch = useDispatch();
    const productsInStore = useSelector((state) => state.productStore.products)

    const categoryList = () => CATEGORY.map(cat => (<MenuItem key={cat.id} value={cat.id}>{cat.value}</MenuItem>));

    const handleDatasetChange = ({ target }) => {
        setDefaultCategory(target.value);
    };
    useEffect(() => {
        if (defaultCategory !== 'ALL') {
            const prodArr = filter(productsInStore, pd => (defaultCategory === pd.category));
            setProductData([...prodArr]);
        } else {
            setProductData([...productsInStore]);
        }
    }, [defaultCategory, productsInStore]);

    const onSave = () => {
        setModalData([]);
        setShowModal(true);
    };
    const onClose = () => {
        setShowModal(false);
    };
    const deleteHandler = (rowData) => {
        dispatch(deleteItem(rowData));
    };
    const editHandler = (rowData) => {
        setModalData(rowData);
        setShowModal(true);
        // dispatch(deleteItem(rowData));
    };

    return (<Container>
        <div style={{ marginTop: '20px' }}/>
        <Grid container spacing={3} justify="space-between" direction="row">
            <Grid item xs={3}>
                <FormGroup className="MuiFormGroup-options">
                    <FormControl variant="standard">
                        <InputLabel>Product Category</InputLabel>
                        <Select value={defaultCategory} onChange={handleDatasetChange}>
                            {categoryList()}
                        </Select>
                    </FormControl>
                </FormGroup>
            </Grid>
            <Grid item xs={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onSave}
                    startIcon={<SaveIcon/>}
                >
                    ADD NEW
                </Button>
            </Grid>
        </Grid>
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <DataTable data={productData} onDelete={deleteHandler} onEdit={editHandler}/>
            </Grid>
        </Grid>
        <DialogForm open={showModal} handleClose={onClose} data={modalData}/>
    </Container>);
};

export default AppBody;
