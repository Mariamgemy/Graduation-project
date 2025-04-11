import { Link } from "react-router-dom";
import "../Css/Cards.css";
import { Row, Col, Card } from "react-bootstrap";

function Cards({ cardsData }) {
  return (
    <>
      <Row className="justify-content-center">
        {cardsData.map((card, index) => {
          const handleClick = (e) => {
            if (card.scrollTarget) {
              e.preventDefault();
              const section = document.getElementById(card.scrollTarget);
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }
          };

          return (
            <Col md={6} sm={6} xs={12} className="mb-4" key={index}>
              <Link
                to={card.scrollTarget ? "#" : `/card/${card.id}`}
                onClick={handleClick}
                state={card.scrollTarget ? null : card}
                className="text-decoration-none text-dark"
              >
                <Card className="border-0 shadow-sm rounded-4 p-3 h-100">
                  <Card.Body>
                    {card.icon && (
                      <div
                        className="rounded-circle bg-light d-flex align-items-center justify-content-center mb-2"
                        style={{
                          width: "60px",
                          height: "60px",
                          margin: "0 auto",
                          color: "#2d485c",
                        }}
                      >
                        <span style={{ fontSize: "1.5rem" }}>{card.icon}</span>
                      </div>
                    )}
                    <Card.Title className="fs-6 text-center">{card.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default Cards;
