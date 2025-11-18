import React from "react";
import { Container } from "react-bootstrap";

const MyFooter = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-4">
      <Container>
        <div className="text-center">
          &copy; {new Date().getFullYear()} EpiBooks - All rights reserved
        </div>
      </Container>
    </footer>
  );
};

export default MyFooter;
