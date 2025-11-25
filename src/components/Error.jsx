// Componente Error - Mostra messaggi di errore
import { Alert } from "react-bootstrap";

const Error = ({ message }) => {
  return (
    <Alert variant="danger">
      <strong>⚠️ Errore!</strong> {message}
    </Alert>
  );
};

export default Error;
