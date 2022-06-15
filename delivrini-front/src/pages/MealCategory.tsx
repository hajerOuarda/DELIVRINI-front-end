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
import { Button, TableHead } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import GenericDialog from '../modules/Dialog/GenericDialog';
import { deleteMealCategoryAction, listMealCategoryAction } from '../store/actions/mealCategoryAction';
import EditMealCategoryDialog from '../modules/Dialog/mealCategory/EditMealCategoryDialog';
import CreateMealCategoryDialog from '../modules/Dialog/mealCategory/CreateMealCategoryDialog';
import { GenericDeleteDialog } from '../modules/Dialog/GenericDeleteDialog';



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


export default function MealCategoryPage() {
  const [open, setOpen] = React.useState(false);
  const [actionType, setActionType] = React.useState("");
  const [rowId, setrowId] = React.useState<number>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const dispatch = useAppDispatch();
  const restaurant = useAppSelector((state) => state.authReducer.userInfo.fk_restaurant);
  const getListMealCategory = useAppSelector((state) => state.MealCategoryReducer.mealCategoryInfo);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - getListMealCategory.length) : 0;

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
      listMealCategoryAction(page, rowsPerPage)
    )
  }, [page, rowsPerPage])

  // *** delete Meal category ***
  const handleDeleteMealCategory = (id: number) => {

    dispatch<any>(deleteMealCategoryAction(id))

  };
  // *** edit Meal category ***
  const handleEditMealCategory = (id: any): any => {
    console.log(("edit test"));

  };
  const handleCreateMealCategory = (): any => {
    console.log("create");
  };

  const handleClick = (id: number) => {
    if (actionType === "delete") { handleDeleteMealCategory(id) }
    else {
      if (actionType === "edit") { handleEditMealCategory(id) }

      else { handleCreateMealCategory() }
    }
  }
  const handleBodyContent = (id: number) => {
    if (actionType === "delete") {
      return <GenericDeleteDialog />
    }
    else {
      if (actionType === "edit") { return <EditMealCategoryDialog idMealCategory={id} /> }

      else { return <CreateMealCategoryDialog /> }
    }
  }
  const handleTitle = () => {
    if (actionType === "delete") { return "Delete Confirmation " }
    else {
      if (actionType === "edit") { return "Edit Confirmation " }
      else { return "Create Meal category " }
    }
  }

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead style={{ background: 'grey', color: 'white', }}>
            <TableRow>

              <TableCell align="left">Meal Category</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Image</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(
              getListMealCategory
            ).filter((mealCategory: any) => mealCategory.fk_restaurant === restaurant).map((row: any) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {row.description}
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {row.image}
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


