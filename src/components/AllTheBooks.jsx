import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import books from "../data/scifi.json";

const AllTheBooks = () => {
  return (
    <Container>
      <Row>
        {books.slice(0, 24).map((b) => (
          <Col key={b.asin} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={b.img}
                alt={b.title}
                style={{ height: 300, objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title style={{ fontSize: "0.95rem" }}>
                  {b.title}
                </Card.Title>
                <Card.Text className="text-muted">
                  ${b.price.toFixed(2)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AllTheBooks;
