// 1. Import necessari
import { Component } from "react";
import { Card, Badge, Spinner, Alert } from "react-bootstrap";
import CommentsList from "./CommentsList";
import AddComment from "./AddComment";

// ⭐ IMPORTANTE: Sostituisci con il TUO token!
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkZWU2OTcxNDM4ZjAwMTVkMzJhODUiLCJpYXQiOjE3NjM2NTExMTIsImV4cCI6MTc2NDg2MDcxMn0.Pyas5j_xt6OdvEzkWVOMy9EXrBumAtF_TKlFX6a9A3k";

// 2. Definizione componente CLASSE
class CommentArea extends Component {
  // 3. STATE iniziale (lo popoleremo nel Punto 2)
  state = {
    comments: [], // Array di commenti (vuoto inizialmente)
    isLoading: false, // Stato di caricamento
    errMsg: "", // Messaggio di errore
  };

  // ⭐ Metodo per fare fetch dei commenti (riutilizzabile)
  fetchComments = async () => {
    // 1. Estraiamo l'ASIN dalle props
    const { asin } = this.props;

    // 2. Costruiamo l'URL per la fetch
    const url = `https://striveschool-api.herokuapp.com/api/comments/${asin}`;

    // 3. Mostriamo il loader
    this.setState({ isLoading: true });

    try {
      // 4. Facciamo la fetch con headers di autenticazione
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });

      // 5. Verifichiamo se la risposta è OK
      if (response.ok) {
        // 6. Convertiamo la risposta in JSON
        const data = await response.json();

        // 7. Salviamo i commenti nello state + nascondiamo loader
        this.setState({
          comments: data,
          isLoading: false,
          errMsg: "",
        });

        console.log(`✅ Caricati ${data.length} commenti per ASIN: ${asin}`);
      } else {
        // 8. Errore HTTP (401, 404, 500, ecc.)
        this.setState({
          isLoading: false,
          errMsg: `Errore ${response.status}: ${response.statusText}`,
        });

        console.error("❌ Errore HTTP:", response.status);
      }
    } catch (err) {
      // 9. Errore di rete o di parsing JSON
      this.setState({
        isLoading: false,
        errMsg: err.message,
      });

      console.error("❌ Errore nella fetch:", err);
    }
  };

  // ⭐ componentDidMount - Carica i commenti al primo mount
  componentDidMount() {
    this.fetchComments();
  }

  // ⭐ Callback da passare ad AddComment
  // Viene chiamato DOPO che un nuovo commento è stato aggiunto con successo
  handleCommentAdded = () => {
    console.log("🔄 Ricaricamento commenti dopo aggiunta...");
    // Richiama la fetch per aggiornare la lista
    this.fetchComments();
  };

  // 5. RENDER METHOD
  render() {
    // Estraiamo dallo state
    const { comments, isLoading, errMsg } = this.state;
    const { asin: _asin } = this.props;

    return (
      <Card className="mt-3 border-primary">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">
            💬 Area Commenti
            <Badge bg="light" text="dark" className="ms-2">
              {comments.length} comment{comments.length !== 1 ? "i" : "o"}
            </Badge>
          </h5>
        </Card.Header>
        <Card.Body>
          {/* ⭐ LOADING: Mostra spinner se isLoading = true */}
          {isLoading && (
            <div className="text-center my-3">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2 text-muted">Caricamento commenti...</p>
            </div>
          )}

          {/* ⭐ ERROR: Mostra alert se c'è un errore */}
          {errMsg && (
            <Alert variant="danger">
              <strong>Errore!</strong> {errMsg}
            </Alert>
          )}

          {/* ⭐ SUCCESS: Mostra i componenti se non c'è loading né errore */}
          {!isLoading && !errMsg && (
            <>
              {/* Componente CommentsList - Mostra la lista dei commenti */}
              <CommentsList comments={comments} />

              {/* Separatore visivo */}
              <hr className="my-4" />

              {/* Componente AddComment - Form per aggiungere commenti */}
              <AddComment
                asin={this.props.asin}
                onCommentAdded={this.handleCommentAdded}
              />
            </>
          )}
        </Card.Body>
      </Card>
    );
  }
}

export default CommentArea;
