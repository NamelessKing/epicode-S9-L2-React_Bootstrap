// 1. Import di React e Component
import { Component } from "react";

// 2. Import componenti react-bootstrap
import { Card } from "react-bootstrap";

// 3. Definizione componente CLASSE (non più funzione!)
class SingleBook extends Component {
  // 4. STATO DEL COMPONENTE
  // Questo è lo "stato interno" che può cambiare nel tempo
  state = {
    selected: false, // Inizialmente il libro NON è selezionato
  };

  // 5. METODO PER GESTIRE IL CLICK
  // Questo metodo fa il "toggle" della proprietà selected
  // Toggle = se era true diventa false, se era false diventa true
  handleClick = () => {
    this.setState({
      selected: !this.state.selected,
      // ! = operatore NOT
      // !true = false
      // !false = true
    });
  };

  // 6. RENDER METHOD (obbligatorio nelle classi!)
  render() {
    // Estraiamo book dalle props
    const { book } = this.props;

    // Estraiamo selected dallo state
    const { selected } = this.state;

    // 7. Return del JSX (la Card)
    return (
      <Card
        className="h-100"
        // 8. STILE CONDIZIONALE
        // Se selected è true, aggiungiamo un bordo rosso
        style={{
          border: selected ? "3px solid red" : "1px solid #dee2e6",
          cursor: "pointer", // Mostra che è cliccabile
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
