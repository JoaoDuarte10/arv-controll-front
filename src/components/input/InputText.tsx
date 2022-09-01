import { TextField } from '@mui/material';

export function InputText(props) {
  const { type, id, label, onChange, className, value } = props;

  return (
    <TextField
      type={type}
      id={id}
      label={label}
      value={value}
      variant="outlined"
      onChange={onChange}
      sx={{
        width: '100%',
        fontFamily: 'Montserrat',
      }}
      className={className}
    />
  );
}
