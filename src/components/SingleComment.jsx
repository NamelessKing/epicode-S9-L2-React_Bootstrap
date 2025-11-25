// 1. Import necessari
import { Component } from "react";
import { ListGroup, Badge, Button } from "react-bootstrap";

// ⭐ Token API (stesso usato in AddComment e CommentArea)
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkZWU2OTcxNDM4ZjAwMTVkMzJhODUiLCJpYXQiOjE3NjM2NTExMTIsImV4cCI6MTc2NDg2MDcxMn0.Pyas5j_xt6OdvEzkWVOMy9EXrBumAtF_TKlFX6a9A3k";

// 2. Componente CLASSE (serve state per gestire il loading della delete)
class SingleComment extends Component {
  // State per gestire lo stato di eliminazione
  state = {
    isDeleting: false,
  };

  // 3. Funzione helper per mostrare stelle in base al rate
  renderStars = (rate) => {
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
  getBadgeVariant = (rate) => {
    const numRate = parseInt(rate);
    if (numRate >= 4) return "success"; // Verde per voti alti
    if (numRate === 3) return "warning"; // Giallo per voti medi
    return "danger"; // Rosso per voti bassi
  };

  // 5. Funzione per eliminare il commento
  handleDelete = async () => {
    // 1. Chiediamo conferma all'utente
    if (!window.confirm("⚠️ Sei sicuro di voler eliminare questo commento?")) {
      return; // Se l'utente clicca "Annulla", fermiamo tutto
    }

    // 2. Impostiamo lo stato di caricamento
    this.setState({ isDeleting: true });

    try {
      // 3. Facciamo la richiesta DELETE all'API
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${this.props.comment._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );

      // 4. Verifichiamo la risposta
      if (response.ok) {
        // Successo! Notifichiamo il padre (CommentArea) per ricaricare i commenti
        if (this.props.onDelete) {
          this.props.onDelete();
        }
      } else {
        // Errore HTTP
        alert(`❌ Errore durante l'eliminazione: ${response.statusText}`);
        this.setState({ isDeleting: false });
      }
    } catch (err) {
      // Errore di rete
      alert(`❌ Errore: ${err.message}`);
      this.setState({ isDeleting: false });
    }
  };

  render() {
    const { comment } = this.props;
    const { isDeleting } = this.state;
    // comment = oggetto singolo commento
    // Struttura: { _id, comment, rate, elementId }

    return (
      <ListGroup.Item>
        <div className="d-flex justify-content-between align-items-start">
          {/* Testo del commento */}
          <div className="flex-grow-1">
            <p className="mb-1">{comment.comment}</p>
            <small className="text-muted">
              {this.renderStars(comment.rate)}
            </small>
          </div>

          {/* Badge con il voto numerico e bottone elimina */}
          <div className="d-flex align-items-center gap-2">
            <Badge bg={this.getBadgeVariant(comment.rate)} pill>
              {comment.rate}/5
            </Badge>

            {/* Bottone DELETE */}
            <Button
              variant="danger"
              size="sm"
              onClick={this.handleDelete}
              disabled={isDeleting}
              title="Elimina commento"
            >
              {isDeleting ? "..." : "🗑️"}
            </Button>
          </div>
        </div>
      </ListGroup.Item>
    );
  }
}

export default SingleComment;
