import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Import componenti
import MyNav from "./components/MyNav";
import MyFooter from "./components/MyFooter";
import Welcome from "./components/Welcome";
import BookList from "./components/BookList"; // ← NUOVO!

// Import dati
import scifiBooks from "./data/scifi.json";

function App() {
  return (
    <>
      <MyNav />
      <Welcome />

      <BookList books={scifiBooks} />

      <MyFooter />
    </>
  );
}

export default App;
