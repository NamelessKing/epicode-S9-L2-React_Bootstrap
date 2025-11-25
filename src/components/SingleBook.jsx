// 1. Import di React (non serve Component!)
import { Card } from "react-bootstrap";

// 2. Componente FUNZIONALE (non più classe!)
const SingleBook = ({ book, selectedAsin, onBookSelect }) => {
  // 3. Handler per il click (const invece di metodo di classe)
  const handleClick = () => {
    // Chiama la funzione passata dal padre (BookList)
    onBookSelect(book.asin);
  };

  // 4. Calcoliamo se QUESTO libro è selezionato
  const isSelected = selectedAsin === book.asin;

  // 5. Return del JSX (non serve più render())
  return (
    <Card
      className="h-100"
      style={{
        border: isSelected ? "3px solid red" : "1px solid #dee2e6",
        cursor: "pointer",
      }}
      onClick={handleClick}
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
};

export default SingleBook;
