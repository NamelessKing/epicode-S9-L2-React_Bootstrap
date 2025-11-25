// 1. Import di React e Component
import { Component } from "react";

// 2. Import componenti react-bootstrap
import { Card } from "react-bootstrap";

// 4. Definizione componente CLASSE (non più funzione!)
class SingleBook extends Component {
  // 5. METODO PER GESTIRE IL CLICK
  // Questo metodo fa il "toggle" della proprietà selected
  // Toggle = se era true diventa false, se era false diventa true
  handleClick = () => {
    // Chiama la funzione passata dal padre (BookList)
    // Passa l'ASIN di QUESTO libro
    this.props.onBookSelect(this.props.book.asin);
  };

  // 6. RENDER METHOD (obbligatorio nelle classi!)
  render() {
    // Estraiamo le props
    const { book, selectedAsin } = this.props;

    // Calcoliamo se QUESTO libro è selezionato
    const isSelected = selectedAsin === book.asin;

    // 7. Return del JSX (la Card)
    return (
      <Card
        className="h-100"
        // 8. STILE CONDIZIONALE
        // Se selected è true, aggiungiamo un bordo rosso
        style={{
          border: isSelected ? "3px solid red" : "1px solid #dee2e6",
          cursor: "pointer",
        }}
        // 9. HANDLER DEL CLICK
        // Quando clicchi OVUNQUE sulla card, chiama handleClick
        onClick={this.handleClick}
      >
        <Card.Img
          variant="top"
          src={book.img}
          alt={book.title}
          style={{ height: "300px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title style={{ fontSize: "0.95rem", minHeight: "60px" }}>
            {book.title}
          </Card.Title>
          <Card.Text className="text-muted">${book.price.toFixed(2)}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

// 10. Export del componente
export default SingleBook;
