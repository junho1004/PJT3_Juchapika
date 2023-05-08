import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  // Button,
} from "@material-ui/core";
// import ExcelJS from "exceljs";
// import Main from "../../pages/Main"

function UserTable({ tableData = [] }) {
  // columns 기본값을 빈 배열로 설정
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const updatedUsers = Array(tableData.length)
    .fill()
    .map((_, i) => ({
      id: i + 1,
      date: tableData[i].date,
      time: tableData[i].time,
      location: tableData[i].location,
      carNum: tableData[i].carNum,
    }))

    setUsers(updatedUsers);
  }, [tableData]);

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // const data = downloadExcel(users, columns)
    // Setdown(data)
    console.log(tableData);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const btn =()=>{
    console.log("========");

    tableData.forEach( test => {
      console.log(test);
    });

    users.forEach( test => {
      console.log(test);
    });

    console.log(tableData.length);
    console.log(users.length);

    // console.log(tableData)
    // console.log(tableData[0].date);
  }

  return (
    <div>
      <div onClick={btn} style={{ fontSize: "0.7em" }}>총 {users.length}개</div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" width="10%">
                순번
              </StyledTableCell>
              <StyledTableCell align="center" width="20%">
                단속일자
              </StyledTableCell>
              <StyledTableCell align="center" width="20%">
                단속시간
              </StyledTableCell>
              <StyledTableCell align="center" width="40%">
                단속위치
              </StyledTableCell>
              <StyledTableCell align="center" width="10%">
                차량번호
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <StyledTableRow key={user.id}>
                    <StyledTableCell align="center" width="10%">
                      {user.id}
                    </StyledTableCell>
                    <StyledTableCell align="center" width="20%">
                      {user.date}
                    </StyledTableCell>
                    <StyledTableCell align="center" width="20%">
                      {user.time}
                    </StyledTableCell>
                    <StyledTableCell align="center" width="40%">
                      {user.location}
                    </StyledTableCell>
                    <StyledTableCell align="center" width="10%">
                      {user.carNum}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[20, 50, 100]}
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
              {/* <StyledTableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => downloadExcel(users, columns)}
                >
                  Download Excel
                </Button>
              </StyledTableCell> */}
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}

UserTable.propTypes = {
  // columns: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.array.isRequired
  // Setdown: PropTypes.func.isRequired,
};

export default UserTable;
