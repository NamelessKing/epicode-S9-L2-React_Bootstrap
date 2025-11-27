// Test per il componente Welcome
import { render, screen } from "@testing-library/react";
import Welcome from "../components/Welcome";

describe("Welcome Component", () => {
  test("renders welcome message", () => {
    // 1. Renderizza il componente
    render(<Welcome />);

    // 2. Cerca il testo principale (in inglese)
    const heading = screen.getByText(/welcome to epibooks/i);

    // 3. Verifica che sia presente
    expect(heading).toBeInTheDocument();
  });

  test("renders as an Alert component", () => {
    render(<Welcome />);

    // Cerca l'alert tramite il ruolo
    const alert = screen.getByRole("alert");

    expect(alert).toBeInTheDocument();
  });
});
