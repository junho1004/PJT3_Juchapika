import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import styles from "../Nav/TopNav.module.css";
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
import axios from "axios";

function UserTable({ tableData = [] }) {
  // columns 기본값을 빈 배열로 설정
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [users, setUsers] = useState([]);
  const [modal, Setmodal] = useState(false);
  let [address, setAddress] = useState("");
  let [carImageUrl, setCarImageUrl] = useState("");
  const [carNum2, setCarNum] = useState("");
  let [date, setDate] = useState("");
  let [dlocation, setDlocation] = useState("");
  let [name, setName] = useState("");
  let [pay, setPay] = useState("");
  let [phoneNum, setPhoneNum] = useState("");
  let [time, settime] = useState("");
  let [PlateImageUrl,setPlateImageUrl]=useState(null);
  const sessionStorage = window.sessionStorage;

  useEffect(() => {
    const updatedUsers = Array(tableData.length)
      .fill()
      .map((_, i) => ({
        id: i + 1,
        date: tableData[i].date,
        time: tableData[i].time,
        location: tableData[i].location,
        carNum: tableData[i].carNum,
        
      }));

    setUsers(updatedUsers);
    return
  }, [tableData]);

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
      borderRight: "1px solid #ddd",
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

  const totopnav = (i, j) => {
    console.log(tableData[i - 1]);
    let info = tableData[i - 1];
    Setmodal(true);
    setCarImageUrl(info.carImageUrl); ///찍힌 차 이미지 넣어야함
    setDate(info.date); ///언제 걸렸는지
    setDlocation(info.location); ///어디서 걸렸는지 넣어야함
    setPay(info.pay);
    settime(info.time);
    setPlateImageUrl(info.plateImageUrl); ///얼마인지

    const carNum1 = {
      carNum: j,
    };
    let token = sessionStorage.getItem("token")

    axios
      .post("http://localhost:8081/api/record/search-by-carnum", carNum1,
      {
        headers: {
          Authorization: `Bearer ${token}`,
  },
      })
      .then((res) => {
        const info1 = res.data.responseData[0];
        setAddress(info1.address);
        setName(info1.name);
        setCarNum(info1.carNum);
        setPhoneNum(info1.phoneNum);
        return
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const closeModal = () => {
    Setmodal(false);
  };

  let fordate = date.replace("T", " ");
  return (
    <div>
      <div style={{ fontSize: "1em" }}>총 {users.length}개</div>
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
                <StyledTableRow
                  key={user.id}
                  onClick={() => totopnav(user.id, user.carNum)}
                >
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
                rowsPerPageOptions={[10, 30, 50]}
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
      {modal && (
        <div className={styles.container}>
          <div className={styles.modal}>
            <div onClick={closeModal} className={styles.x}>
              <div>x</div>
            </div>
            <div>
              <div className={styles.modaltext}>
                <div style={{ fontSize: "1.7em", fontWeight: "800" }}>
                  {carNum2}
                </div>
              </div>
              <div className={styles.modaltext}>
                <div style={{ fontSize: "0.9em", marginBottom: "5px" }}>
                  : {fordate} {time} 
                  <div style={{ width: "100%", textAlign: "center" }}>{dlocation} </div>
                </div>
              </div>
              <hr></hr>
              <div className={styles.modaltext1}>
                <img
                  src={carImageUrl}
                  alt="go"
                  className={styles.carimage}
                  style={{
                    width: "180px",
                    height: "120px",
                    marginRight: "20px",
                  }}
                />

                <div className={styles.contenttext}>
                  <div className={styles.name}>
                    <span style={{ width: "40%" }}>소유주</span>
                    <span className={styles.texts}> {name}</span>
                  </div>
                  <div className={styles.name}>
                    <span style={{ width: "40%" }}>전화번호</span>
                    <span className={styles.texts}> {phoneNum}</span>
                  </div>
                  <div className={styles.name}>
                    <div style={{ width: "40%" }}>소유주 주소</div>
                    <span className={styles.texts}> {address}</span>
                  </div>
                  <div className={styles.name}>
                    <span style={{ width: "40%" }}>번호판</span>
                    <span className={styles.texts}>
                      {" "}
                      <img
                        src={PlateImageUrl}
                        alt="go"
                        style={{ width: "100px" }}
                      />
                    </span>
                  </div>

                  <div className={styles.name}>
                    <span style={{ width: "40%" }}>납부유무</span>
                    <span className={styles.texts}>
                      {pay === "납부완료" ? (
                        <span style={{ color: "blue" }}>납부완료</span>
                      ) : (
                        <span style={{ color: "red" }}>미납</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.back} onClick={closeModal}></div>
        </div>
      )}
    </div>
  );
}

UserTable.propTypes = {
  // columns: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.array.isRequired,
  // Setdown: PropTypes.func.isRequired,
};

export default UserTable;
