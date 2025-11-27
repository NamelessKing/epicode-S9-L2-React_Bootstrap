// Test click sul libro cambia bordo
import { render, fireEvent, screen } from "@testing-library/react";
import BookList from "../components/BookList";
import booksData from "../data/scifi.json";

describe("SingleBook Click Interaction", () => {
  test("clicking on a book changes its border to red", () => {
    // 1. Renderizza l'intera BookList (contiene lo stato)
    render(<BookList books={booksData} />);

    // 2. Trova tutte le card dei libri
    const bookCards = screen.getAllByRole("img");

    // 3. Prendi la prima card
    const firstBookCard = bookCards[0].closest(".card");

    // 4. Verifica che inizialmente NON contenga "3px solid red"
    expect(firstBookCard.style.border).not.toContain("3px solid red");

    // 5. Simula il click sulla prima card
    fireEvent.click(firstBookCard);

    // 6. Verifica che ORA contenga "3px solid red"
    expect(firstBookCard.style.border).toBe("3px solid red");
  });

  test("clicking on a second book removes the border from the first one", () => {
    // 1. Renderizza BookList
    render(<BookList books={booksData} />);

    // 2. Trova le prime due card
    const bookCards = screen.getAllByRole("img");
    const firstBookCard = bookCards[0].closest(".card");
    const secondBookCard = bookCards[1].closest(".card");

    // 3. Click sulla prima card
    fireEvent.click(firstBookCard);

    // 4. Verifica che la prima abbia il bordo rosso
    expect(firstBookCard.style.border).toBe("3px solid red");

    // 5. Click sulla seconda card
    fireEvent.click(secondBookCard);

    // 6. Verifica che la PRIMA NON abbia più il bordo rosso
    expect(firstBookCard.style.border).not.toBe("3px solid red");

    // 7. Verifica che la SECONDA abbia il bordo rosso
    expect(secondBookCard.style.border).toBe("3px solid red");
  });

  test("no SingleComment components are rendered on initial load", () => {
    // 1. Renderizza BookList
    render(<BookList books={booksData} />);

    // 2. Cerca eventuali badge di rating (pattern "X/5")
    // Usiamo queryByText perché ci aspettiamo che NON ci sia
    const commentBadge = screen.queryByText(/\/5$/);

    // 3. Verifica che NON ci siano commenti
    expect(commentBadge).not.toBeInTheDocument();
  });

  test("comments are loaded when clicking on a book with reviews", async () => {
    // 1. Renderizza BookList
    render(<BookList books={booksData} />);

    // 2. Trova un libro che ha recensioni (il primo va bene)
    const bookCards = screen.getAllByRole("img");
    const firstBookCard = bookCards[0].closest(".card");

    // 3. Click sul libro
    fireEvent.click(firstBookCard);

    // 4. ASPETTA che i commenti vengano caricati (operazione asincrona)
    // findByText è ASINCRONO - aspetta fino a 1 secondo che l'elemento appaia
    const commentBadge = await screen.findByText(/\/5$/, {}, { timeout: 3000 });

    // 5. Verifica che il commento sia nel documento
    expect(commentBadge).toBeInTheDocument();
  });
});
