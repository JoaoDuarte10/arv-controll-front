import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export function ComboBox(props) {
  const { title, options, selectValue, value } = props;

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      freeSolo
      options={options}
      renderInput={(params) => <TextField {...params} label={title} />}
      value={value}
      onInputChange={selectValue}
      onChange={selectValue}
    />
  );
}
