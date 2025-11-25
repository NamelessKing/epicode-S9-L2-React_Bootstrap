// 1. Import necessari
import { useState } from "react"; // ← NUOVO: useState hook
import { ListGroup, Badge, Button } from "react-bootstrap";

// ⭐ Token API
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkZWU2OTcxNDM4ZjAwMTVkMzJhODUiLCJpYXQiOjE3NjM2NTExMTIsImV4cCI6MTc2NDg2MDcxMn0.Pyas5j_xt6OdvEzkWVOMy9EXrBumAtF_TKlFX6a9A3k";

// 2. Funzioni helper FUORI dal componente (non dipendono da props/state)
const renderStars = (rate) => {
  const stars = [];
  const numRate = parseInt(rate);

  for (let i = 1; i <= 5; i++) {
    if (i <= numRate) {
      stars.push(<span key={i}>⭐</span>);
    } else {
      stars.push(<span key={i}>☆</span>);
    }
  }

  return stars;
};

const getBadgeVariant = (rate) => {
  const numRate = parseInt(rate);
  if (numRate >= 4) return "success";
  if (numRate === 3) return "warning";
  return "danger";
};

// 3. Componente FUNZIONALE
const SingleComment = ({ comment, onDelete }) => {
  // 4. useState per gestire lo stato di eliminazione
  const [isDeleting, setIsDeleting] = useState(false);

  // 5. Funzione per eliminare il commento
  const handleDelete = async () => {
    // Chiedi conferma
    if (!window.confirm("⚠️ Sei sicuro di voler eliminare questo commento?")) {
      return;
    }

    // Imposta stato di caricamento
    setIsDeleting(true);

    try {
      // Richiesta DELETE
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${comment._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );

      // Verifica risposta
      if (response.ok) {
        // Successo! Notifica il padre
        if (onDelete) {
          onDelete();
        }
      } else {
        // Errore HTTP
        alert(`❌ Errore durante l'eliminazione: ${response.statusText}`);
        setIsDeleting(false);
      }
    } catch (err) {
      // Errore di rete
      alert(`❌ Errore: ${err.message}`);
      setIsDeleting(false);
    }
  };

  // 6. Render
  return (
    <ListGroup.Item>
      <div className="d-flex justify-content-between align-items-start">
        {/* Testo del commento */}
        <div className="flex-grow-1">
          <p className="mb-1">{comment.comment}</p>
          <small className="text-muted">{renderStars(comment.rate)}</small>
        </div>

        {/* Badge con il voto numerico e bottone elimina */}
        <div className="d-flex align-items-center gap-2">
          <Badge bg={getBadgeVariant(comment.rate)} pill>
            {comment.rate}/5
          </Badge>

          {/* Bottone DELETE */}
          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            title="Elimina commento"
          >
            {isDeleting ? "..." : "🗑️"}
          </Button>
        </div>
      </div>
    </ListGroup.Item>
  );
};

export default SingleComment;
