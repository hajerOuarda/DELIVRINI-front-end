
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect } from "react";
import {
  Card, Button, Container, Stack,
  Table, TableCell, TableBody, TableContainer, TablePagination, TableRow,
  IconButton, Typography, Checkbox, Avatar, Box
} from '@mui/material';
import {
  KeyboardArrowLeft, KeyboardArrowRight,
  FirstPage, LastPage
} from '@mui/icons-material';
import GenericDialog from '../modules/Dialog/GenericDialog';
import { GenericDeleteDialog } from '../modules/Dialog/GenericDeleteDialog';
import { deleteUserAction, listUserAction } from '../store/actions/userAction';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import EditRestaurantCategoryDialog from '../modules/Dialog/RestaurantCategory/EditRestaurantCategoryDialog';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import CreateRestaurantCategoryDialog from '../modules/Dialog/RestaurantCategory/CreateRestaurantCategoryDialog';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import { sentenceCase } from 'change-case';
import { filter } from 'lodash';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'fk_restaurant', label: 'Company', alignRight: false },
  { id: 'fk_role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

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
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
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
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
}

// ----------------------------------------------------------------------

function descendingComparator(a: any, b: any, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: any, orderBy: string) {
  return order === 'desc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array: any[], comparator: any, query: any) {
  const stabilizedThis = array.map((el: any, index: number) => [el, index]);
  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user: any) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el: any) => el[0]);
}

export default function UserPage() {
  const [open, setOpen] = React.useState(false);
  const [actionType, setActionType] = React.useState("");
  const [order, setOrder] = React.useState('asc');
  const [selected, setSelected] = React.useState(new Array<any>());
  const [orderBy, setOrderBy] = React.useState('name');
  const [filterName, setFilterName] = React.useState('');

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const dispatch = useAppDispatch();
  const USERLIST = useAppSelector((state) => state.UserReducer.userInfo);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

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
      listUserAction(page, rowsPerPage)
    )
  }, [dispatch, page, rowsPerPage])

  // *** delete user ***
  const handleDeleteUser = (id: number) => {

    dispatch<any>(deleteUserAction(id))

  };
  // *** edit user ***
  const handleEditUser = (id: any): any => {
    console.log(("edit test"));

  };
  const handleCreateUser = (): any => {
    console.log("create");
  };

  const handleBodyContent = (id: number) => {
    if (actionType === "delete") {
      return <GenericDeleteDialog />
    }
    else {
      // if (actionType === "edit") { return <EditRestaurantCategoryDialog idRestaurantCategory={id} /> }

      // else { return <CreateRestaurantCategoryDialog /> }
    }
  }
  const handleTitle = () => {
    if (actionType === "delete") { return "Delete Confirmation " }
    else {
      if (actionType === "edit") { return "Edit Confirmation " }
      else { return "Create User " }
    }
  };

  const handleRequestSort = (event: any, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n: any) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: any, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: any = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    } else if (name === "delete") { handleDeleteUser(0) }
    else if (name === "edit") { handleEditUser(0) }
    else { handleCreateUser() };
    setSelected(newSelected);
  };

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFilterName(event.target.value);
  };

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => { setOpen(true); setActionType("create"); }}
          >
            New User
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index: number) => {
                    const { id, name, fk_role, status, fk_restaurant } = row;
                    const avatarUrl = `/static/mock-images/avatars/avatar_${index + 1}.jpg`;
                    const isVerified = true;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{fk_restaurant}</TableCell>
                        <TableCell align="left">{sentenceCase(fk_role)}</TableCell>
                        <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                            {sentenceCase(status || 'Active')}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <UserMoreMenu />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </Card>
      </Container>
      <GenericDialog
        title={handleTitle()}
        open={open}
        action={() => { }}
        onClose={() => setOpen(false)}
        body={handleBodyContent(0)}
      />
    </Page>
  );
}