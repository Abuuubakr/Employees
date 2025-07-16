import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
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
import type { AppDispatch, RootState } from "./store/store";
import type { Employee } from "./store/types";
import { EditHandleClick } from "./store/EditDialogSlice";
import { editEmployees, editUser } from "./store/TableSlice";

export default function EditDialog() {
  const dispatch = useDispatch<AppDispatch>();

  const editDialogStatus = useSelector(
    (state: RootState) => state.EditDialog.editDialog
  );
  const currentEmployee = useSelector(
    (state: RootState) => state.EditDialog.selectedRow
  );
  console.log(currentEmployee);

  if (!currentEmployee) {
    return null; 
  }

  const switchEditDialogStatus = () => {
    dispatch(EditHandleClick());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const newUser: Employee = {
      id: currentEmployee.id,
      name: form.fullname.value,
      isArchive: form.archived.checked,
      role: form.job.value,
      phone: form.phone.value,
      birthday: form.birthday.value,
    };

    console.log(newUser);

    dispatch(editUser(newUser));
    dispatch(editEmployees(newUser))
    switchEditDialogStatus();
  };

  return (
    <React.Fragment>
      <Dialog
        open={editDialogStatus}
        onClose={switchEditDialogStatus}
        maxWidth={"xs"}
      >
        <DialogTitle sx={{ borderBottom: "1px solid gray" }}>
          Edit this Employee
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
              defaultValue={currentEmployee?.name}
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
              defaultValue={currentEmployee?.role}
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
              defaultValue={currentEmployee?.phone}
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
              defaultValue={currentEmployee?.birthday}
            />
            {currentEmployee?.isArchive ? (
              <FormControlLabel
                control={<Checkbox name="archived" />}
                label="Archived?"
                sx={{ mt: "2%" }}
                checked
              />
            ) : (
              <FormControlLabel
                control={<Checkbox name="archived" />}
                label="Archived?"
                sx={{ mt: "2%" }}
              />
            )}
            <DialogActions sx={{ my: "2%" }}>
              <Button
                color="error"
                variant="contained"
                onClick={switchEditDialogStatus}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
