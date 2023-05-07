import React, { useState } from "react";
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
import ExcelJS from "exceljs";
import Main from "../../pages/Main"

function UserTable({ columns = [] }) {
  // columns 기본값을 빈 배열로 설정
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

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

  function getTime() {
    const today = new Date();
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    const seconds = String(today.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  const [users] = useState(() =>
    Array(53)
      .fill()
      .map((_, i) => ({
        id: i + 1,
        date: `${getDate()}`,
        time: `${getTime()}`,
        location: `광주광역시 광산구 수완동`,
        carNum: `331우 7799`,
      }))
  );

  function downloadExcel(users, columns) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Users");

    // Add header row
    const headerRow = worksheet.addRow([
      "순번",
      "단속일자",
      "단속시간",
      "단속위치",
      "차량번호",
      ...columns,
    ]);
    headerRow.font = { bold: true };

    // Add data rows
    users.forEach((user, index) => {
      worksheet.addRow([
        index + 1,
        user.date,
        user.time,
        user.location,
        user.carNum,
        ...Object.values(user),
      ]);
    });

    // Auto fit column width
    worksheet.columns.forEach((column) => {
      let maxLength = 0;
      column.eachCell((cell) => {
        maxLength =
          Math.max(maxLength, cell.value ? String(cell.value).length : 0, 10) +
          2;
      });
      column.width = maxLength;
    });

    // Download Excel file
    workbook.xlsx
      .writeBuffer()
      .then((buffer) => {
        const blob = new Blob([buffer], { type: "application/vnd.ms-excel" });
        const href = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = href;
        link.download = `users_${getDate()}_${getTime()}.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const data = downloadExcel(users,columns);
  
  return (
    <TableContainer component={Paper}>
      <Main data={data} />
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
            <StyledTableCell>
              {/* <Button
                variant="contained"
                color="primary"
                onClick={() => downloadExcel(users, columns)}
              >
                Download Excel
              </Button> */}
            </StyledTableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

UserTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string),
};

export default UserTable;
