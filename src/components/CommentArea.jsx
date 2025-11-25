// 1. Import necessari
import { useState, useEffect } from "react";
import { Card, Badge } from "react-bootstrap";
import CommentsList from "./CommentsList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

// ⭐ Token API
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkZWU2OTcxNDM4ZjAwMTVkMzJhODUiLCJpYXQiOjE3NjM2NTExMTIsImV4cCI6MTc2NDg2MDcxMn0.Pyas5j_xt6OdvEzkWVOMy9EXrBumAtF_TKlFX6a9A3k";

// 2. Componente FUNZIONALE
const CommentArea = ({ asin }) => {
  // 3. State hooks
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // 4. useEffect - Fetch SOLO quando asin è valido
  useEffect(() => {
    // Se asin è null/undefined, non fare nulla
    if (!asin) {
      return; // ← Esci subito senza chiamare setState
    }

    console.log("📘 useEffect eseguito - asin:", asin);

    // Funzione fetch DENTRO useEffect
    const fetchComments = async () => {
      const url = `https://striveschool-api.herokuapp.com/api/comments/${asin}`;

      setIsLoading(true);

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setComments(data);
          setIsLoading(false);
          setErrMsg("");
          console.log(`✅ Caricati ${data.length} commenti per ASIN: ${asin}`);
        } else {
          setIsLoading(false);
          setErrMsg(`Errore ${response.status}: ${response.statusText}`);
          console.error("❌ Errore HTTP:", response.status);
        }
      } catch (err) {
        setIsLoading(false);
        setErrMsg(err.message);
        console.error("❌ Errore nella fetch:", err);
      }
    };

    fetchComments();
  }, [asin, refreshTrigger]); // ← Dipendenze

  // 5. Callback dopo aggiunta commento
  const handleCommentAdded = () => {
    console.log("🔄 Ricaricamento commenti dopo aggiunta...");
    setRefreshTrigger((prev) => prev + 1);
  };

  // 6. Callback dopo eliminazione commento
  const handleCommentDeleted = () => {
    console.log("🔄 Ricaricamento commenti dopo eliminazione...");
    setRefreshTrigger((prev) => prev + 1);
  };

  // 7. Render - Placeholder se nessun libro selezionato
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

  // 8. Render normale
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
        {/* LOADING */}
        {isLoading && <Loading message="Caricamento commenti..." />}

        {/* ERROR */}
        {errMsg && <Error message={errMsg} />}

        {/* SUCCESS */}
        {!isLoading && !errMsg && (
          <>
            <CommentsList comments={comments} onDelete={handleCommentDeleted} />
            <hr className="my-4" />
            <AddComment asin={asin} onCommentAdded={handleCommentAdded} />
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default CommentArea;
