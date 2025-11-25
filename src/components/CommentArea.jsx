// 1. Import necessari
import { Component } from "react";
import { Card, Badge } from "react-bootstrap";
import CommentsList from "./CommentsList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

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
    // Facciamo fetch SOLO se c'è un ASIN valido
    if (this.props.asin) {
      this.fetchComments();
    }
  }

  // ⭐ componentDidUpdate - Rileva quando cambia l'ASIN
  componentDidUpdate(prevProps) {
    // prevProps = le props PRIMA dell'aggiornamento
    // this.props = le props DOPO l'aggiornamento

    // Controlliamo se l'ASIN è cambiato
    if (prevProps.asin !== this.props.asin) {
      console.log("📘 ASIN cambiato da", prevProps.asin, "a", this.props.asin);

      // Se il nuovo ASIN è valido (non null), facciamo fetch
      if (this.props.asin) {
        this.fetchComments();
      } else {
        // Se ASIN è null, resettiamo i commenti
        this.setState({
          comments: [],
          isLoading: false,
          errMsg: "",
        });
      }
    }
  }

  // ⭐ Callback da passare ad AddComment
  // Viene chiamato DOPO che un nuovo commento è stato aggiunto con successo
  handleCommentAdded = () => {
    console.log("🔄 Ricaricamento commenti dopo aggiunta...");
    // Richiama la fetch per aggiornare la lista
    this.fetchComments();
  };

  // ⭐ Callback da passare a CommentsList (e poi a SingleComment)
  // Viene chiamato DOPO che un commento è stato eliminato con successo
  handleCommentDeleted = () => {
    console.log("🔄 Ricaricamento commenti dopo eliminazione...");
    // Richiama la fetch per aggiornare la lista
    this.fetchComments();
  };

  // 5. RENDER METHOD
  render() {
    // Estraiamo dallo state
    const { comments, isLoading, errMsg } = this.state;
    const { asin } = this.props;

    // Se non c'è ASIN, mostra messaggio placeholder
    if (!asin) {
      return (
        <Card className="mt-3 border-primary">
          <Card.Header className="bg-primary text-white">
            <h5 className="mb-0">💬 Area Commenti</h5>
          </Card.Header>
          <Card.Body>
            <div className="text-center text-muted py-5">
              <h4>📚 Seleziona un libro</h4>
              <p>Clicca su un libro a sinistra per vedere i commenti</p>
            </div>
          </Card.Body>
        </Card>
      );
    }

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
          {/* ⭐ LOADING: Usa componente Loading */}
          {isLoading && <Loading message="Caricamento commenti..." />}

          {/* ⭐ ERROR: Usa componente Error */}
          {errMsg && <Error message={errMsg} />}

          {/* ⭐ SUCCESS: Mostra i componenti se non c'è loading né errore */}
          {!isLoading && !errMsg && (
            <>
              {/* Componente CommentsList - Mostra la lista dei commenti */}
              <CommentsList
                comments={comments}
                onDelete={this.handleCommentDeleted}
              />

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
