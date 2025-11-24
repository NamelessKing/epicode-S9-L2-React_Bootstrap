// 1. Import necessari
import { ListGroup, Badge } from "react-bootstrap";

// 2. Componente FUNZIONALE
const SingleComment = ({ comment }) => {
  // comment = oggetto singolo commento
  // Struttura: { _id, comment, rate, elementId }

  // 3. Funzione helper per mostrare stelle in base al rate
  const renderStars = (rate) => {
    const stars = [];
    const numRate = parseInt(rate); // Converti stringa in numero

    // Crea un array di stelle piene e vuote
    for (let i = 1; i <= 5; i++) {
      if (i <= numRate) {
        stars.push(<span key={i}>⭐</span>); // Stella piena
      } else {
        stars.push(<span key={i}>☆</span>); // Stella vuota
      }
    }

    return stars;
  };

  // 4. Determina il colore del badge in base al voto
  const getBadgeVariant = (rate) => {
    const numRate = parseInt(rate);
    if (numRate >= 4) return "success"; // Verde per voti alti
    if (numRate === 3) return "warning"; // Giallo per voti medi
    return "danger"; // Rosso per voti bassi
  };

  return (
    <ListGroup.Item>
      <div className="d-flex justify-content-between align-items-start">
        {/* Testo del commento */}
        <div className="flex-grow-1">
          <p className="mb-1">{comment.comment}</p>
          <small className="text-muted">{renderStars(comment.rate)}</small>
        </div>

        {/* Badge con il voto numerico */}
        <Badge bg={getBadgeVariant(comment.rate)} pill>
          {comment.rate}/5
        </Badge>
      </div>
    </ListGroup.Item>
  );
};

export default SingleComment;
