import React, { useState } from "react";
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
} from "@material-ui/core";

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

function UserTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // 현재 시간을 HH:mm:ss 형식의 문자열로 반환하는 함수
  function getTime() {
    const today = new Date();
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    const seconds = String(today.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  // 예시 출력

  const [users] = useState(() =>
    Array(53)
      .fill()
      .map((_, i) => ({
        id: i + 1,
        date: `${getDate()}`,
        time: `${getTime()}`,
        location: `광주광역시 광산구 수완동`,
        carNum: `2023`,
      }))
  );

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" width="10%">순번</StyledTableCell>
            <StyledTableCell align="center" width="20%">단속일자</StyledTableCell>
            <StyledTableCell align="center" width="20%">단속시간</StyledTableCell>
            <StyledTableCell align="center" width="40%">단속위치</StyledTableCell>
            <StyledTableCell align="center" width="10%">차량번호</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
            .map(({ id, date, time, location, carNum }, i) => (
              <StyledTableRow key={id}>
                <StyledTableCell align="center" width="10%" component="th" scope="row">
                  {page * rowsPerPage + i + 1}
                </StyledTableCell>
                <StyledTableCell align="center" width="20%">
                  {date}
                </StyledTableCell>
                <StyledTableCell align="center" width="20%">{time}</StyledTableCell>
                <StyledTableCell align="center" width="20%">{location}</StyledTableCell>
                <StyledTableCell align="center" width="20%">{carNum}</StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={users.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default UserTable;
