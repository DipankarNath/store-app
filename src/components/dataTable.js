import { DataGrid } from '@material-ui/data-grid';
import {Button} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const DataTable = ({ data, onDelete, onEdit }) => {
    const classes = useStyles();
    const rows = [...data];
    const columns = [
        { field: 'productName', headerName: 'Product name', width: 250 },
        { field: 'productSKU', headerName: 'SKU', width: 150 },
        { field: 'productCost', headerName: 'Price', width: 150 },
        { field: 'noOfProduct', headerName: 'Item left', width: 150 },
        {
            field: 'text',
            headerName: 'Action',
            width: 250,
            renderCell: (params) => {
                const rowData = params.row;
                return (
                    <strong>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<EditIcon/>}
                            onClick={() => onEdit(rowData)}
                        >
                            EDIT
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            className={classes.button}
                            startIcon={<DeleteIcon/>}
                            onClick={() => onDelete(rowData)}
                        >
                            Delete
                        </Button>
                    </strong>
                )
            },
        },
    ];
return (
    <div style={{ height: 300, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} />
    </div>
);
};

export default DataTable;
