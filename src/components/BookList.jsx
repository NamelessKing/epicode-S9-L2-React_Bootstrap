// STEP 1: Import necessari
import { Component } from "react";
import { Container, Row, Col, Form } from "react-bootstrap"; // ← Aggiungo Form
import SingleBook from "./SingleBook";

// STEP 2: Convertiamo da funzione a CLASSE
class BookList extends Component {
  // STEP 3: Aggiungiamo lo STATE
  state = {
    searchQuery: "", // Stringa di ricerca (inizialmente vuota)
  };

  // STEP 4: Metodo per gestire il cambio dell'input
  handleSearchChange = (e) => {
    // e.target.value = quello che l'utente ha digitato
    this.setState({
      searchQuery: e.target.value,
    });
  };

  // STEP 5: RENDER METHOD
  render() {
    // Estraiamo books dalle props
    const { books } = this.props;

    // Estraiamo searchQuery dallo state
    const { searchQuery } = this.state;

    // STEP 6: FILTRIAMO I LIBRI in base alla ricerca
    const filteredBooks = books.filter((book) => {
      // Se searchQuery è vuoto (""), mostra TUTTI i libri
      // Altrimenti, mostra solo i libri il cui titolo contiene searchQuery

      return book.title.toLowerCase().includes(searchQuery.toLowerCase());

      // Spiegazione:
      // book.title = "Harry Potter and the Chamber of Secrets"
      // book.title.toLowerCase() = "harry potter and the chamber of secrets"
      // searchQuery = "Harry"
      // searchQuery.toLowerCase() = "harry"
      // "harry potter...".includes("harry") = true ✅

      // Se searchQuery = "xyz"
      // "harry potter...".includes("xyz") = false ❌ (non mostra il libro)
    });

    return (
      <Container>
        {/* STEP 7: Campo di ricerca PRIMA della griglia */}
        <Row className="mb-4">
          <Col md={6} className="mx-auto">
            <Form.Group>
              <Form.Label>
                <strong>🔍 Cerca un libro</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Digita il titolo del libro..."
                // TWO-WAY DATA BINDING:
                value={searchQuery} // ← Legge dallo state
                onChange={this.handleSearchChange} // ← Aggiorna lo state
              />
              <Form.Text className="text-muted">
                {filteredBooks.length} libr
                {filteredBooks.length === 1 ? "o" : "i"} trovat
                {filteredBooks.length === 1 ? "o" : "i"}
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        {/* STEP 8: Griglia dei libri FILTRATI */}
        <Row className="g-3">
          {/* ⚠️ IMPORTANTE: Usiamo filteredBooks invece di books */}
          {filteredBooks.map((book) => (
            <Col xs={12} sm={6} md={4} lg={3} key={book.asin}>
              <SingleBook book={book} />
            </Col>
          ))}
        </Row>

        {/* STEP 9: Messaggio se non ci sono risultati */}
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
  }
}

export default BookList;
