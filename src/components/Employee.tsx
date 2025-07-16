import { Button, Checkbox, TableCell, TableRow } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteEmployees, removeUser } from "./store/TableSlice";
import { EditHandleClick } from "./store/EditDialogSlice";
import type { Employee as EmployeeType } from "./store/types";
import type { AppDispatch } from "./store/store";




type myProps = {
  row: EmployeeType;
};

function Employee({ row }: myProps) {
  const dispatch = useDispatch<AppDispatch>();

const handleClick = (id: string) => {
  dispatch(removeUser(id))
  dispatch(deleteEmployees(id));
};


  return (
    <TableRow
      key={row.name}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {row.id}
      </TableCell>
      <TableCell align="center">{row.name}</TableCell>
      <TableCell align="center">
        {row.isArchive === false ? (
          <Checkbox disabled />
        ) : (
          <Checkbox disabled checked />
        )}
      </TableCell>
      <TableCell align="center">{row.role}</TableCell>
      <TableCell align="center">{row.phone}</TableCell>
      <TableCell align="center">{row.birthday}</TableCell>
      <TableCell align="center">
        <Button variant="contained" color="warning" onClick={() => dispatch(EditHandleClick(row))}>
          EDIT
        </Button>
      </TableCell>
      <TableCell align="center">
        <Button
          onClick={() => handleClick(row.id)}
          variant="contained"
          color="error"
        >
          DELETE
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default Employee;
