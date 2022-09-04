import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

type InputProps = {
  title: string;
  options: string[];
  selectValue: any;
  value?: any;
  className?: string;
  style?: React.CSSProperties
}

export function ComboBox(props: InputProps) {
  const { title, options, selectValue, value, className, style } = props;

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
      className={className}
      style={style}
    />
  );
}
