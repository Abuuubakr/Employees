import { Button, Container, useMediaQuery } from "@mui/material";
import "./App.css";
import Employees from "./components/Employees";
import { useDispatch, useSelector } from "react-redux";
import { handleClick } from "./components/store/DialogSlice";
import type { RootState } from "./components/store/store";
import Filters from "./components/Filters";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";

function App() {
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.table);
  const isTabletSize = useMediaQuery("(max-width:870px)");

  const { t } = useTranslation();

  return (
    <>
      <Container maxWidth="lg" sx={{ overflowX: "auto" }}>
        <div>
          {error ? (
            <h1>An error ocurred: {error}</h1>
          ) : (
            <div>
              <div className="flex justify-between mb-[2%] items-center">
                <div className="h-[53px]">
                  <Button
                    sx={{ mb: "2%", height: "53px" }}
                    variant="contained"
                    color="success"
                    onClick={() => dispatch(handleClick())}
                  >
                    {isTabletSize ? <AddIcon /> : t('add')}
                  </Button>
                </div>
                <div>
                  <Filters />
                </div>
              </div>
              <div>
                <Employees />
              </div>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}

export default App;
