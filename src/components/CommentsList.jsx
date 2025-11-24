// 1. Import necessari
import { ListGroup } from "react-bootstrap";
import SingleComment from "./SingleComment";

// 2. Componente FUNZIONALE (semplice, non serve state)
const CommentsList = ({ comments }) => {
  // comments = array di oggetti commento ricevuto dal padre (CommentArea)
  // Esempio: [{ _id: "123", comment: "Great!", rate: "5", elementId: "..." }, ...]

  return (
    <div>
      <h6 className="mb-3">📝 Recensioni ({comments.length})</h6>

      {/* Se non ci sono commenti, mostra un messaggio */}
      {comments.length === 0 ? (
        <p className="text-center text-muted">
          Nessun commento ancora. Sii il primo a lasciarne uno! 🎉
        </p>
      ) : (
        // Altrimenti, mostra la lista dei commenti
        <ListGroup>
          {/* 3. .map() per ciclare l'array di commenti */}
          {comments.map((comment) => (
            // 4. Per ogni commento, renderizziamo SingleComment
            // KEY: usiamo _id (univoco per ogni commento)
            <SingleComment key={comment._id} comment={comment} />
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default CommentsList;
