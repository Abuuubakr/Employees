import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store/store";
import { setArchiveValue, setRoleValue } from "./store/FIltersSlice";

function Filters() {

  const filtersValue = useSelector((state : RootState) => state.filters.filtersValue)
  const dispatch = useDispatch<AppDispatch>()

  const { role, archive } = filtersValue
  console.log(role);
  console.log(archive);
  

  const roleHandleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    dispatch(setRoleValue(value));
  };

  const archiveHandleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    dispatch(setArchiveValue(value));
  };

  return (
    <div className="flex justify-between w-[22%]">
      <div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              label="Age"
              onChange={roleHandleChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="driver">Driver</MenuItem>
              <MenuItem value="waiter">Waiter</MenuItem>
              <MenuItem value="cook">Cook</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Archive</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={archive}
              label="Age"
              onChange={archiveHandleChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="true">Archived</MenuItem>
              <MenuItem value="false">Unarchived</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
    </div>
  );
}

export default Filters;
