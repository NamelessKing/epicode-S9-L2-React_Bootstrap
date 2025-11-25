// 1. Import necessari
import { useState } from "react"; // ← NUOVO: useState hook
import { Container, Row, Col, Form } from "react-bootstrap";
import SingleBook from "./SingleBook";
import CommentArea from "./CommentArea";

// 2. Componente FUNZIONALE
const BookList = ({ books }) => {
  // 3. State hooks (2 variabili separate)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAsin, setSelectedAsin] = useState(null);

  // 4. Handler per la ricerca
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 5. Handler per la selezione del libro
  const handleBookSelect = (asin) => {
    // Toggle: se clicchi sullo stesso libro, deseleziona
    if (selectedAsin === asin) {
      setSelectedAsin(null);
    } else {
      setSelectedAsin(asin);
    }
  };

  // 6. Filtra i libri in base alla ricerca
  const filteredBooks = books.filter((book) => {
    return book.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // 7. Render
  return (
    <Container>
      {/* Campo di ricerca */}
      <Row className="mb-4">
        <Col md={6} className="mx-auto">
          <Form.Group>
            <Form.Label>
              <strong>🔍 Cerca un libro</strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Digita il titolo del libro..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Form.Text className="text-muted">
              {filteredBooks.length} libr
              {filteredBooks.length === 1 ? "o" : "i"} trovat
              {filteredBooks.length === 1 ? "o" : "i"}
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>

      {/* Layout a DUE COLONNE */}
      <Row>
        {/* COLONNA SINISTRA: Griglia libri */}
        <Col md={8}>
          <Row className="g-3">
            {filteredBooks.map((book) => (
              <Col xs={12} sm={6} md={6} lg={4} key={book.asin}>
                <SingleBook
                  book={book}
                  selectedAsin={selectedAsin}
                  onBookSelect={handleBookSelect}
                />
              </Col>
            ))}
          </Row>
        </Col>

        {/* COLONNA DESTRA: CommentArea */}
        <Col md={4}>
          <CommentArea asin={selectedAsin} />
        </Col>
      </Row>

      {/* Messaggio se non ci sono risultati */}
      {filteredBooks.length === 0 && (
        <Row>
          <Col className="text-center mt-5">
            <h4 className="text-muted">
              📚 Nessun libro trovato per "{searchQuery}"
            </h4>
            <p className="text-muted">Prova a cercare con parole diverse</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default BookList;
