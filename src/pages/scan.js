import React from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import TicketPlaceholder from "../assets/Ticket.png";
import OrangeSmile from "../assets/orangeSmile.svg";
import {
  Container,
  Navbar,
  YY,
  ProfileContainer,
  FooterDescriptionTitle,
} from "./profile";

const Box = styled.div`
  border: 1px solid #bc563c;
  width: 80vw;
  margin: 30px auto;
  padding: 20px 0;
  border-radius: 30px;
`;

const Heading = styled.div`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  color: black;
  border-radius: 20px;
  width: 60vw;
  margin: 10px auto;
  text-align: left;
`;

const DisplayInfo = styled.div`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: #bc563c;
  background: white;
  border-radius: 20px;
  width: 60vw;
  margin: 10px auto;
  text-align: left;
  padding: 5px 0 5px 20px;
`;

const DisplayInfo2 = styled.div`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #bc563c;
  background: white;
  border-radius: 20px;
  width: 60vw;
  margin: 10px auto;
  padding: 5px 20px;
`;

const Confirm = styled.button`
  background-color: #bc563c;
  text-decoration: none;
  border-radius: 20px;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px 0;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;

  :hover {
    background: white;
    color: #bc563c;
  }
`;

const Scan = () => {
  return (
    <div>
      <Container>
        <Navbar>
          <a href="/https://ethbarcelona.com/">
            {" "}
            <img src={Logo} className="logo" />
          </a>
          <YY>
            <ProfileContainer>
              {" "}
              <a href="/">
                <img src={OrangeSmile} className="smile" />
              </a>
            </ProfileContainer>
          </YY>
        </Navbar>
        <Box>
          <Heading>Name</Heading>
          <DisplayInfo>Kraznik</DisplayInfo>

          <Heading>NFTicket ID</Heading>
          <DisplayInfo>1786</DisplayInfo>

          <Confirm>Confirm</Confirm>

          {/* <DisplayInfo2>
            🎉 🎉 <br />
            Thank you for Confirming{" "}
          </DisplayInfo2> */}

          <DisplayInfo2>
            🚨 🚨 <br />
            NFTicket has already been scanned at 11:59 by Device 1
          </DisplayInfo2>
        </Box>
      </Container>
    </div>
  );
};

export default Scan;
