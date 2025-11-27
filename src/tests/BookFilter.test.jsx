// Test filtraggio libri
import { render, screen, fireEvent } from "@testing-library/react";
import BookList from "../components/BookList";
import booksData from "../data/scifi.json";

describe("Book Search Filtering", () => {
  test("filters books based on search input", () => {
    // 1. Renderizza BookList
    render(<BookList books={booksData} />);

    // 2. Trova il campo di ricerca
    const searchInput = screen.getByPlaceholderText(/digita il titolo/i);

    // 3. Simula digitazione
    fireEvent.change(searchInput, { target: { value: "Harry" } });

    // 4. Conta i libri visibili dopo il filtro
    const bookImages = screen.queryAllByRole("img");

    // 5. Verifica che siano meno del totale
    expect(bookImages.length).toBeLessThan(booksData.length);
  });

  test("shows all books when search is empty", () => {
    render(<BookList books={booksData} />);

    const searchInput = screen.getByPlaceholderText(/digita il titolo/i);

    // Campo vuoto
    fireEvent.change(searchInput, { target: { value: "" } });

    const bookImages = screen.queryAllByRole("img");
    expect(bookImages).toHaveLength(booksData.length);
  });

  test("shows no results message when no match", () => {
    render(<BookList books={booksData} />);

    const searchInput = screen.getByPlaceholderText(/digita il titolo/i);

    // Cerca qualcosa che non esiste
    fireEvent.change(searchInput, { target: { value: "xyz123notfound" } });

    // Verifica messaggio "nessun libro trovato"
    const noResults = screen.getByText(/nessun libro trovato/i);
    expect(noResults).toBeInTheDocument();
  });
});
