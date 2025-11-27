// Test per BookList - Verifica rendering cards
import { render, screen } from "@testing-library/react";
import BookList from "../components/BookList";
import booksData from "../data/scifi.json";

describe("BookList Component", () => {
  test("renders as many cards as books in the JSON", () => {
    // 1. Renderizza BookList con i dati
    render(<BookList books={booksData} />);

    // 2. Trova tutte le card tramite img (ogni libro ha un'immagine)
    const bookImages = screen.getAllByRole("img");

    // 3. Verifica che il numero corrisponda
    expect(bookImages).toHaveLength(booksData.length);
  });
});
