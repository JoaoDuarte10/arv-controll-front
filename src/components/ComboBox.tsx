import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

type InputProps = {
  title: string;
  options: any[];
  selectValue: any;
  value?: any;
}

export function ComboBox(props: InputProps) {
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
