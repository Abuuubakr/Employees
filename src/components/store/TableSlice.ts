import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Employee, newEmployee } from "./types";

type sliceType = {
  employees: Employee[];
  status: "idle" | "loading" | "resolved" | "failed";
  error: string | null;
};

const initialState: sliceType = {
  employees: [],
  status: "idle",
  error: null,
};

export const fetchEmployees = createAsyncThunk<
  Employee[],
  void,
  { rejectValue: string }
>("employees/fetchEmployees", async function (_, { rejectWithValue }) {
  try {
    const response = await fetch(
      "https://63849be33fa7acb14ffa868f.mockapi.io/api/Table"
    );

    if (!response.ok) {
      throw new Error("Fauled to fetch");
    }

    const data: Employee[] = await response.json();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Uncaught error");
  }
});

export const deleteEmployees = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("employees/deleteEmployees", async function (id, { rejectWithValue }) {
  try {
    const response = await fetch(
      `https://63849be33fa7acb14ffa868f.mockapi.io/api/Table/${id}`,
      { method: "DELETE" }
    );

    if (!response.ok) {
      throw new Error("Failed to delete");
    }

    return id;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const addEmployees = createAsyncThunk<
  newEmployee,
  newEmployee,
  { rejectValue: string }
>("employees/addEmployees", async function (newUser, { rejectWithValue }) {
  try {
    const response = await fetch(
      "https://63849be33fa7acb14ffa868f.mockapi.io/api/Table/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const editEmployees = createAsyncThunk<
  Employee,
  Employee,
  { rejectValue: string }
>(
  "employees/editEmployees",
  async function (selectedUser, { rejectWithValue }) {
    try {
      const response = await fetch(
        `https://63849be33fa7acb14ffa868f.mockapi.io/api/Table/${selectedUser.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify(selectedUser),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const tableSlice = createSlice({
  name: "employees",
  initialState: initialState,
  reducers: {
    removeUser(state, action: PayloadAction<string>) {
      state.employees = state.employees.filter(
        (emp) => emp.id !== action.payload
      );
    },
    addUser(state, action) {
      state.employees.push(action.payload);
    },
    editUser(state, action) {
      const { payload } = action;

      state.employees.map((e) => {
        if (e.id === payload.id) {
          e.name = payload.name;
          e.isArchive = payload.isArchive;
          e.role = payload.role;
          e.birthday = payload.birthday;
          e.phone = payload.phone;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmployees.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.status = "resolved";
      state.employees = action.payload;
    });
    builder.addCase(fetchEmployees.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload || "Something went wrong";
    });
  },
});

export default tableSlice.reducer;
export const { removeUser, addUser, editUser } = tableSlice.actions;
