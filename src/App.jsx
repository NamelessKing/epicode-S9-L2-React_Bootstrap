import MyNav from "./components/MyNav";
import MyFooter from "./components/MyFooter";
import Welcome from "./components/Welcome";
import AllTheBooks from "./components/AllTheBooks";
import "./App.css";

function App() {
  return (
    <>
      <MyNav />
      <main>
        <Welcome />
        <AllTheBooks />
      </main>
      <MyFooter />
    </>
  );
}

export default App;
