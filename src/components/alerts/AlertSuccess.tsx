import { Alert } from '@mui/material';

export function AlertSuccess(props) {
  const { title } = props;
  return (
    <Alert
      severity="success"
      color="success"
      className="mt-2 mb-3 border border-success text-success"
    >
      {title}
    </Alert>
  );
}
