import React from "react";
import { Alert, Container } from "react-bootstrap";

const Welcome = () => {
  return (
    <Container className="mb-4">
      <Alert variant="info">
        <Alert.Heading>Welcome to EpiBooks</Alert.Heading>
        <p>
          Your personal sci-fi bookstore built with React and React-Bootstrap.
        </p>
      </Alert>
      <h5>Browse our selection of science fiction books below</h5>
    </Container>
  );
};

export default Welcome;
