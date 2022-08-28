import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useEffect } from "react";
import {
  Button, Container, IconButton,
  TablePagination, TableContainer, TableBody, Table,
  Box, Card, Tooltip
} from '@mui/material';
import GenericDialog from '../modules/Dialog/GenericDialog';
import EditRestaurantCategoryDialog from '../modules/Dialog/RestaurantCategory/EditRestaurantCategoryDialog';
import CreateRestaurantCategoryDialog from '../modules/Dialog/RestaurantCategory/CreateRestaurantCategoryDialog';
import { deleteRestaurantCategoryAction, listRestaurantCategoryAction } from '../store/actions/restaurantCategoryAction';
import { GenericDeleteDialog } from '../modules/Dialog/GenericDeleteDialog';
import useTable, { emptyRows, getComparator } from '../hooks/useTable';
import useSettings from '../hooks/useSettings';
import { RestaurantCategoryTableRow, RestaurantCategoryTableToolbar } from '../sections/@dashboard/restaurant/restaurant-category';
import {
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedActions,
} from '../components/table';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import Scrollbar from '../components/Scrollbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Category', align: 'left' },
  { id: 'description', label: 'Description', align: 'center' },
  { id: '' },
];

export default function RestaurantCategoryPage() {
  const [open, setOpen] = React.useState(false);
  const [actionType, setActionType] = React.useState("");
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  // Avoid a layout jump when reaching the last page with empty rows.
  const dispatch = useAppDispatch();
  const RestaurantCategory_LIST = useAppSelector((state) => state.RestaurantCategoryReducer.restaurantCategoryInfo);

  // settings
  const { themeStretch } = useSettings();
  const [tableData, setTableData] = React.useState(new Array<any>());
  const [filterName, setFilterName] = React.useState('');

  
  useEffect(() => {
    dispatch<any>(
      listRestaurantCategoryAction(page, rowsPerPage)
    )
  }, [dispatch, page, rowsPerPage])

  useEffect(() => {
    if (RestaurantCategory_LIST.length) {
      setTableData(RestaurantCategory_LIST);
    }
  }, [RestaurantCategory_LIST]);

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  // *** delete restaurant ***
  const handleDeleteRow = (id: number) => {
    const deleteRow = tableData.filter((row: any) => row.id !== id);
    setSelected([]);
    dispatch<any>(deleteRestaurantCategoryAction(id));
    setTableData(deleteRow);
  };
  const handleDeleteRows = (selected: number[] = []) => {
    const deleteRows = tableData.filter((row: any) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  // *** edit restaurant ***
  const handleEditRow = (id: number) => {
    console.log('edit', id);
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const isNotFound = (!dataFiltered.length && !!filterName) || (!dataFiltered.length);
  
  const handleBodyContent = (id: number) => {
    if (actionType === "delete") {
      return <GenericDeleteDialog />
    }
    else {
      if (actionType === "edit") { return <EditRestaurantCategoryDialog idRestaurantCategory={id} /> }

      else { return <CreateRestaurantCategoryDialog /> }
    }
  }
  
  const handleTitle = () => {
    if (actionType === "delete") { return "Delete Confirmation " }
    else {
      if (actionType === "edit") { return "Edit Confirmation " }
      else { return "Create Restaurant " }
    }
  }
  const denseHeight = dense ? 60 : 80;

  return (
    <Page title="Restaurant: Category">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Restaurant Category"
          links={[
            { name: 'Dashboard', href: '/dashboard/app' },
            { name: 'Restaurant Category' },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={() => { setOpen(true); setActionType("create"); }}
            >
              New Category
            </Button>
          }
        />

        <Card>
          <RestaurantCategoryTableToolbar filterName={filterName} onFilterName={handleFilterName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row: any) => row.id)
                    )
                  }
                  actions={
                    <Tooltip title="Delete">
                      <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                        <Iconify icon={'eva:trash-2-outline'} />
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row: any) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any, index: number) =>
                      row ? (
                        <RestaurantCategoryTableRow
                          key={row.id}
                          row={row}
                          selected={selected.includes(row.id)}
                          onSelectRow={() => onSelectRow(row.id)}
                          onDeleteRow={() => handleDeleteRow(row.id)}
                          onEditRow={() => handleEditRow(row.id)}
                        />
                      ) : (
                        !isNotFound && <TableSkeleton key={index} sx={{ height: denseHeight }} />
                      )
                    )}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />
          </Box>
        </Card>
      </Container>
      <GenericDialog
        title={handleTitle()}
        open={open}
        onClose={() => setOpen(false)}
        body={handleBodyContent(0)}
      />
    </Page>
  );
}


// ----------------------------------------------------------------------

function applySortFilter(params: any) {
  let { tableData, comparator, filterName } = params;
  const stabilizedThis = tableData.map((el: any, index: number) => [el, index]);

  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el: any) => el[0]);

  if (filterName) {
    tableData = tableData.filter((item: any) => item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }

  return tableData;
}


