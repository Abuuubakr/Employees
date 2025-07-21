import { Button, Container } from "@mui/material";
import "./App.css";
import Employees from "./components/Employees";
import { useDispatch, useSelector } from "react-redux";
import { handleClick } from "./components/store/DialogSlice";
import type { RootState } from "./components/store/store";
import Filters from "./components/Filters";
import { useTranslation } from "react-i18next";

function App() {
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.table);

  const  { t } = useTranslation()

  return (
    <>
      <div>
        {error ? (
          <h1>An error ocurred: {error}</h1>
        ) : (
          <div>
            <div className="flex justify-between mb-[2%] items-center">
              <div className=" h-[53px]">
                <Button
                  sx={{ mb: "2%", height : '53px' }}
                  variant="contained"
                  color="success"
                  onClick={() => dispatch(handleClick())}
                >
                  {t('add')}
                </Button>
              </div>
              <div className="max-[1200px]:w-[10%] w-[32%] h-[10vh]">
                <Filters />
              </div>
            </div>
            <div>
              <Employees />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
