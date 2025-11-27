// Test per CommentArea
import { render, screen } from "@testing-library/react";
import CommentArea from "../components/CommentArea";

describe("CommentArea Component", () => {
  test("renders correctly when no book is selected", () => {
    // 1. Renderizza senza asin (null)
    render(<CommentArea asin={null} />);

    // 2. Verifica che mostri il placeholder
    const placeholder = screen.getByText(/seleziona un libro/i);
    expect(placeholder).toBeInTheDocument();
  });

  test("renders the comment area header", () => {
    // 1. Renderizza CommentArea
    render(<CommentArea asin={null} />);

    // 2. Verifica che l'header sia presente
    const header = screen.getByText(/area commenti/i);
    expect(header).toBeInTheDocument();
  });
});
