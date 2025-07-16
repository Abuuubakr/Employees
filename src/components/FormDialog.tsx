import * as React from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleClick } from "./store/DialogSlice";
import type { AppDispatch, RootState } from "./store/store";
import type { Employee } from "./store/types";
import { addEmployees, addUser } from "./store/TableSlice";

export default function FormDialog() {
  const dialogStatus = useSelector((state : RootState) => state.dialog.dialog);
  const dispatch = useDispatch<AppDispatch>();


  const switchDialogStatus = () => {
    dispatch(handleClick());
  };

  const employees = useSelector(
    (state: RootState) => state.table.employees
  );


  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement

    const newUser: Employee = {
      id: (Number(employees[employees.length - 1].id) + 1).toString(),
      name: form.fullname.value,
      isArchive: form.archived.checked,
      role: form.job.value,
      phone: form.phone.value,
      birthday: form.birthday.value,
    };

   console.log(newUser);
   
    dispatch(addUser(newUser))
    dispatch(addEmployees(newUser))
    switchDialogStatus()
  };

  return (
    <React.Fragment>
      <Dialog open={dialogStatus} onClose={switchDialogStatus} maxWidth={"xs"}>
        <DialogTitle sx={{ borderBottom: "1px solid gray" }}>
          Add a new Employee
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="fullname"
              label="Fullname"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="job"
              label="Role"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="phone"
              label="Phone"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="birthday"
              label="Birthday"
              type="text"
              fullWidth
              variant="standard"
            />
            <FormControlLabel
              control={<Checkbox name="archived" />}
              label="Archived?"
              sx={{ mt: "2%" }}
            />
            <DialogActions sx={{my : '2%'}} >
              <Button color="error" variant="contained" onClick={switchDialogStatus}>Cancel</Button>
              <Button  variant="contained" type="submit">Submit</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
