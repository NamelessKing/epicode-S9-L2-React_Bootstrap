// 1. Import necessari
import { useState } from "react"; // ← NUOVO: useState hook
import { Form, Button, Alert } from "react-bootstrap";

// ⭐ Token API
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkZWU2OTcxNDM4ZjAwMTVkMzJhODUiLCJpYXQiOjE3NjM2NTExMTIsImV4cCI6MTc2NDg2MDcxMn0.Pyas5j_xt6OdvEzkWVOMy9EXrBumAtF_TKlFX6a9A3k";

// 2. Componente FUNZIONALE
const AddComment = ({ asin, onCommentAdded }) => {
  // 3. STATE UNICO per tutto il form (come suggerito dall'esercizio)
  const [formState, setFormState] = useState({
    comment: "",
    rate: "5",
    isSubmitting: false,
    successMsg: "",
    errMsg: "",
  });

  // 4. Handler generico per i campi del form
  const handleInputChange = (field, value) => {
    setFormState({
      ...formState, // ← Mantieni tutti i valori esistenti
      [field]: value, // ← Aggiorna solo il campo specifico
    });
  };

  // 5. Handler per il submit del form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validazione
    if (formState.comment.trim() === "") {
      setFormState({
        ...formState,
        errMsg: "Il commento non può essere vuoto!",
      });
      return;
    }

    // Prepara i dati
    const newComment = {
      comment: formState.comment,
      rate: formState.rate,
      elementId: asin,
    };

    // Imposta stato di caricamento
    setFormState({
      ...formState,
      isSubmitting: true,
      errMsg: "",
      successMsg: "",
    });

    try {
      // POST request
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

      // Verifica risposta
      if (response.ok) {
        // Successo! Reset del form
        setFormState({
          comment: "",
          rate: "5",
          isSubmitting: false,
          successMsg: "✅ Commento aggiunto con successo!",
          errMsg: "",
        });

        // Notifica il padre per ricaricare i commenti
        if (onCommentAdded) {
          onCommentAdded();
        }
      } else {
        // Errore HTTP
        const errorData = await response.json();
        setFormState({
          ...formState,
          isSubmitting: false,
          errMsg: `Errore ${response.status}: ${
            errorData.message || response.statusText
          }`,
        });
      }
    } catch (err) {
      // Errore di rete
      setFormState({
        ...formState,
        isSubmitting: false,
        errMsg: `Errore: ${err.message}`,
      });
    }
  };

  // 6. Render
  return (
    <div className="mt-4">
      <h6 className="mb-3">✍️ Lascia una recensione</h6>

      {/* Messaggio di successo */}
      {formState.successMsg && (
        <Alert variant="success">{formState.successMsg}</Alert>
      )}

      {/* Messaggio di errore */}
      {formState.errMsg && <Alert variant="danger">{formState.errMsg}</Alert>}

      {/* Form */}
      <Form onSubmit={handleSubmit}>
        {/* Campo: Commento */}
        <Form.Group className="mb-3">
          <Form.Label>Commento</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Scrivi la tua recensione..."
            value={formState.comment}
            onChange={(e) => handleInputChange("comment", e.target.value)}
            disabled={formState.isSubmitting}
          />
        </Form.Group>

        {/* Campo: Voto */}
        <Form.Group className="mb-3">
          <Form.Label>Voto</Form.Label>
          <Form.Select
            value={formState.rate}
            onChange={(e) => handleInputChange("rate", e.target.value)}
            disabled={formState.isSubmitting}
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
          disabled={formState.isSubmitting}
          className="w-100"
        >
          {formState.isSubmitting ? "Invio in corso..." : "Invia Recensione"}
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;
