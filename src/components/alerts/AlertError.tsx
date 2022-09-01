import { Alert } from '@mui/material';

export function AlertError(props) {
  const { title } = props;
  return (
    <Alert
      severity="error"
      color="error"
      className="mt-2 mb-3 border border-danger text-danger"
    >
      {title}
    </Alert>
  );
}
