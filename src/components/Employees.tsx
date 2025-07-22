import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store/store";
import type { Employee as EmployeeType } from "./store/types";
import FormDialog from "./FormDialog";
import EditDialog from "./EditDialog";
import { useEffect, useState } from "react";
import { fetchEmployees } from "./store/TableSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Employee from "./Employee";
import { useTranslation } from "react-i18next";

function Employees() {
  const dispatch = useDispatch<AppDispatch>();

  const employees = useSelector((state: RootState) => state.table.employees);
  const filtersValue = useSelector(
    (state: RootState) => state.filters.filtersValue
  );

  const { role, archive } = filtersValue;
  const [newArchive, setNewArchive] = useState<"all" | boolean>("all");
  const [isNameSorted, setIsNameSorted] = useState(false);
  const [isBirthSorted, setIsBirthSorted] = useState(false);

  useEffect(() => {
    if (archive === "true") setNewArchive(true);
    else if (archive === "false") setNewArchive(false);
    else setNewArchive("all");
  }, [archive]);

  const { status } = useSelector((state: RootState) => state.table);

  const parseBirthday = (str: string): Date => {
    const [day, month, year] = str.split(".");
    return new Date(+year, +month - 1, +day);
  };
  
  const filteredEmployee = employees
    .filter((e) => role === "all" || e.role === role)
    .filter((e) => newArchive === "all" || e.isArchive === newArchive);

  const finalEmployees = [...filteredEmployee].sort((a, b) => {
    if (isNameSorted) {
      const nameCompare = a.name.localeCompare(b.name);
      if (nameCompare !== 0) return nameCompare;
    }

    if (isBirthSorted) {
      const dateA = parseBirthday(a.birthday).getTime();
      const dateB = parseBirthday(b.birthday).getTime();
      return dateA - dateB;
    }

    return 0;
  });

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

    const { t } = useTranslation();
  

  const renderSkeleton = () => (
    <TableRow>
      {Array.from({ length: 8 }).map((_, idx) => (
        <TableCell key={idx}>
          <Skeleton height={30} />
        </TableCell>
      ))}
    </TableRow>
  );

  return (
    <>
      <TableContainer component={Paper} sx={{width : '100%'}}>
        <Table sx={{ minWidth: '780px' }} >
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell align="center">
                {t("name")}{" "}
                <IconButton
                  aria-label="sort"
                  color={isNameSorted ? "info" : "default"}
                  onClick={() => setIsNameSorted(!isNameSorted)}
                >
                  <SwapVertIcon />
                </IconButton>
              </TableCell>
              <TableCell align="center">{t("archive")}</TableCell>
              <TableCell align="center">{t("role")}</TableCell>
              <TableCell align="center">{t("phone")}</TableCell>
              <TableCell align="center">
                {t("birthday")}
                <IconButton
                  aria-label="sort"
                  color={isBirthSorted ? "info" : "default"}
                  onClick={() => setIsBirthSorted(!isBirthSorted)}
                >
                  <SwapVertIcon />
                </IconButton>
              </TableCell>
              <TableCell align="center">{t("edit")}</TableCell>
              <TableCell align="center">{t("delete")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{overflowX : 'hidden'}}>
            {status === "loading"
              ? Array.from({ length: 5 }).map(() => renderSkeleton())
              : finalEmployees.map((row: EmployeeType, index : number) => (
                  <Employee key={index} row={row} index={index}/>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FormDialog />
      <EditDialog />
    </>
  );
}

export default Employees;
