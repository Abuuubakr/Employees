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
import { useState } from "react";
import { useTranslation } from "react-i18next";

function Filters() {
  const filtersValue = useSelector(
    (state: RootState) => state.filters.filtersValue
  );
  const dispatch = useDispatch<AppDispatch>();
  const [lang, setLang] = useState("en");
  const { t, i18n } = useTranslation();


  const { role, archive } = filtersValue;
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

    const changeLanguage = (language : string) => {
    i18n.changeLanguage(language);
  };

  const langHandleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    changeLanguage(value)
    setLang(value)
  };

  return (
    <div className="flex max-[1200px]:flex-col justify-between  mr-[1%]">
      <div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{t('role')}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              label="Age"
              onChange={roleHandleChange}
            >
              <MenuItem value="all">{t('all')}</MenuItem>
              <MenuItem value="driver">{t('driver')}</MenuItem>
              <MenuItem value="waiter">{t('waiter')}</MenuItem>
              <MenuItem value="cook">{t('cook')}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{t('archive')}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={archive}
              label="Age"
              onChange={archiveHandleChange}
            >
              <MenuItem value="all">{t('all')}</MenuItem>
              <MenuItem value="true">{t('archived')}</MenuItem>
              <MenuItem value="false">{t('unarchived')}</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{t('lang')}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={lang}
              label="Language"
              onChange={langHandleChange}
            >
              <MenuItem value="en">En</MenuItem>
              <MenuItem value="ru">Ru</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
    </div>
  );
}

export default Filters;
