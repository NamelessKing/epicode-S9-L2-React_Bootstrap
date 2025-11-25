// Componente Loading - Mostra spinner durante il caricamento
import { Spinner } from "react-bootstrap";

const Loading = ({ message = "Caricamento..." }) => {
  return (
    <div className="text-center my-3">
      <Spinner animation="border" variant="primary" />
      <p className="mt-2 text-muted">{message}</p>
    </div>
  );
};

export default Loading;
