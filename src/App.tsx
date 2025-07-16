import { Button, Container } from "@mui/material";
import "./App.css";
import Employees from "./components/Employees";
import { useDispatch, useSelector } from "react-redux";
import { handleClick } from "./components/store/DialogSlice";
import type { RootState } from "./components/store/store";
import Filters from "./components/Filters";

function App() {
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.table);

  return (
    <>
      <div>
        {error ? (
          <h1>An error ocurred: {error}</h1>
        ) : (
          <Container>
            <div className="flex justify-between mb-[2%]">
              <div className="flex start">
                <Button
                  sx={{ mb: "2%" }}
                  variant="contained"
                  color="success"
                  onClick={() => dispatch(handleClick())}
                >
                  Add Employees
                </Button>
              </div>
                <Filters/>
            </div>
            <Employees />
          </Container>
        )}
      </div>
    </>
  );
}

export default App;
