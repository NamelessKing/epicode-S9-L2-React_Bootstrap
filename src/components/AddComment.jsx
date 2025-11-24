// 1. Import necessari
import { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";

// ⭐ Token API (stesso di CommentArea)
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkZWU2OTcxNDM4ZjAwMTVkMzJhODUiLCJpYXQiOjE3NjM2NTExMTIsImV4cCI6MTc2NDg2MDcxMn0.Pyas5j_xt6OdvEzkWVOMy9EXrBumAtF_TKlFX6a9A3k";

// 2. Componente CLASSE (serve state per il form)
class AddComment extends Component {
  // 3. STATE iniziale del form
  state = {
    comment: "", // Testo del commento
    rate: "5", // Voto (default 5)
    isSubmitting: false, // Stato di invio
    successMsg: "", // Messaggio di successo
    errMsg: "", // Messaggio di errore
  };

  // 4. Handler per il cambio del campo "comment"
  handleCommentChange = (e) => {
    this.setState({ comment: e.target.value });
  };

  // 5. Handler per il cambio del campo "rate"
  handleRateChange = (e) => {
    this.setState({ rate: e.target.value });
  };

  // 6. Handler per il submit del form
  handleSubmit = async (e) => {
    e.preventDefault(); // Previene il reload della pagina

    // Validazione: commento non può essere vuoto
    if (this.state.comment.trim() === "") {
      this.setState({ errMsg: "Il commento non può essere vuoto!" });
      return;
    }

    // 7. Prepariamo i dati da inviare
    const newComment = {
      comment: this.state.comment,
      rate: this.state.rate,
      elementId: this.props.asin, // ASIN del libro (ricevuto da props)
    };

    // 8. Mostriamo lo stato di caricamento
    this.setState({
      isSubmitting: true,
      errMsg: "",
      successMsg: "",
    });

    try {
      // 9. Facciamo la POST
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        }
      );

      // 10. Verifichiamo la risposta
      if (response.ok) {
        // Successo! Reset del form
        this.setState({
          comment: "",
          rate: "5",
          isSubmitting: false,
          successMsg: "✅ Commento aggiunto con successo!",
          errMsg: "",
        });

        // 11. Notifichiamo il padre (CommentArea) per ricaricare i commenti
        // Questo chiamerà la funzione passata come prop
        if (this.props.onCommentAdded) {
          this.props.onCommentAdded();
        }
      } else {
        // Errore HTTP
        const errorData = await response.json();
        this.setState({
          isSubmitting: false,
          errMsg: `Errore ${response.status}: ${
            errorData.message || response.statusText
          }`,
        });
      }
    } catch (err) {
      // Errore di rete
      this.setState({
        isSubmitting: false,
        errMsg: `Errore: ${err.message}`,
      });
    }
  };

  // 12. RENDER
  render() {
    const { comment, rate, isSubmitting, successMsg, errMsg } = this.state;

    return (
      <div className="mt-4">
        <h6 className="mb-3">✍️ Lascia una recensione</h6>

        {/* Messaggio di successo */}
        {successMsg && <Alert variant="success">{successMsg}</Alert>}

        {/* Messaggio di errore */}
        {errMsg && <Alert variant="danger">{errMsg}</Alert>}

        {/* Form */}
        <Form onSubmit={this.handleSubmit}>
          {/* Campo: Commento */}
          <Form.Group className="mb-3">
            <Form.Label>Commento</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Scrivi la tua recensione..."
              value={comment}
              onChange={this.handleCommentChange}
              disabled={isSubmitting}
            />
          </Form.Group>

          {/* Campo: Voto */}
          <Form.Group className="mb-3">
            <Form.Label>Voto</Form.Label>
            <Form.Select
              value={rate}
              onChange={this.handleRateChange}
              disabled={isSubmitting}
            >
              <option value="1">⭐ 1 - Pessimo</option>
              <option value="2">⭐⭐ 2 - Scarso</option>
              <option value="3">⭐⭐⭐ 3 - Sufficiente</option>
              <option value="4">⭐⭐⭐⭐ 4 - Buono</option>
              <option value="5">⭐⭐⭐⭐⭐ 5 - Eccellente</option>
            </Form.Select>
          </Form.Group>

          {/* Bottone Submit */}
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="w-100"
          >
            {isSubmitting ? "Invio in corso..." : "Invia Recensione"}
          </Button>
        </Form>
      </div>
    );
  }
}

export default AddComment;
