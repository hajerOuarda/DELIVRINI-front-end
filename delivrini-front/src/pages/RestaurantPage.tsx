import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect } from "react";
import { deleteRestaurantAction, listRestaurantAction } from '../store/actions/restaurantAction';
import { Button, TableHead } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import GenericDialog from '../modules/Dialog/GenericDialog';
import { DeleteRestaurantDialog } from '../modules/Dialog/DeleteRestaurantDialog';
import CreateRestaurantDialog from '../modules/Dialog/CreateRestaurantDialog';
import EditRestaurantDialog from '../modules/Dialog/EditRestaurantDialog';



interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}


export default function RestaurantPage() {
  const [open, setOpen] = React.useState(false);
  const [actionType, setActionType] = React.useState("");
  const [rowId, setrowId] = React.useState<number>();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const dispatch = useAppDispatch();
  const getListRestaurants = useAppSelector((state) => state.RestaurantReducer.restaurantInfo);
  console.log('page', page, getListRestaurants);


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - getListRestaurants.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch<any>(
      listRestaurantAction(page, rowsPerPage)
    )
  }, [page, rowsPerPage])

  // *** delete restaurant ***
  const handleDeleteResto = (id: number) => {

    dispatch<any>(deleteRestaurantAction(id))

  };
  // *** edit restaurant ***
  const handleEditResto = (id: any): any => {
    console.log(("edit test"));

  };
  const handleCreateResto = (): any => {
    console.log("create");

  };

  const handleClick = (id: number) => {
    if (actionType === "delete") { handleDeleteResto(id) }
    else {
      if (actionType === "edit") { handleEditResto(id) }

      else { handleCreateResto() }
    }
  }
  const handleBodyContent = (id: number) => {
    if (actionType === "delete") {
      return <DeleteRestaurantDialog />
    }
    else {
      if (actionType === "edit") { return <EditRestaurantDialog idRestaurant={id} /> }

      else { return <CreateRestaurantDialog /> }
    }
  }
  const handleTitle = () => {
    if (actionType === "delete") { return "Delete Confirmation " }
    else {
      if (actionType === "edit") { return "Edit Confirmation " }
      else { return "Create Restaurant " }
    }
  }
  // console.log(getListRestaurants.map((ee: any) => ee.id))

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead style={{ background: 'grey', color: 'white', }}>
            <TableRow>
              <TableCell align="left">Restaurants</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">ZipCode</TableCell>
              <TableCell align="left">Street</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(
              getListRestaurants
            ).map((row: any) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {row.fk_Rcategory}
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {row.email}
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {row.address}
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {row.zipCode}
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {row.street}
                </TableCell>
                <TableCell align="left">
                  <div className='button-container'>
                    <Button onClick={() => { setrowId(row.id); setOpen(true); setActionType("edit"); }}> <Edit /></Button>
                    <Button onClick={() => { setrowId(row.id); setOpen(true); setActionType("delete") }}> <Delete /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={7}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />

            </TableRow>
          </TableFooter>
        </Table>

      </TableContainer>
      <Button onClick={() => { setOpen(true); setActionType("create"); }}> <Add /></Button>

      <GenericDialog
        title={handleTitle()}
        open={open}
        action={() => handleClick(rowId ?? 0)}
        onClose={() => setOpen(false)}
        body={handleBodyContent(rowId ?? 0)}
      />
    </React.Fragment>

  );
}



