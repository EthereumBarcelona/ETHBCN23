import React from "react";
import { Container } from "./mint";
import { FooterDescriptionTitleBold, FooterDescription } from "./profile";
import styled from "styled-components";
import TicketPlaceholder from "../assets/Ticket.png";
import {Navbar, YY,TT, ProfileContainer} from "./profile";
import WalletConnect from "../components/walletConnect";
import Logo from "../assets/logo.svg";
import OrangeSmile from "../assets/orangeSmile.svg";

export const RedeemContainer = styled.div`
  border: 1px solid #bc563c;
  margin: 0 auto;
  width: 30vw;
  border-radius: 20px;
  padding: 50px 0;

  @media screen and (max-width: 768px) {
    width: 90vw;
    padding: 20px 0;
    margin: 20px 0;
  }
`;

export const Title = styled.div`
  font-family: "Dahlia-Bold";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  text-align: left;
  color: #bc563c;
  margin: 0 50px;
`;

const Input = styled.input`
  border: 1px solid #bc563c;
  border-radius: 10px;
  font-size: 16px;
  padding: 10px 15px;
  margin-bottom: 10px;
  width: 70%;
  align-items: left;
  justify-content: left;
  margin: 10px 40px 10px 0;

  &:focus {
    outline: none;
    border-color: #6bb0f4;
  }

  @media screen and (max-width: 768px) {
    margin: 10px 0 10px 20px;
  }
`;

const TicketImageWrapper = styled.div`
  border: 3px solid #bc563c;
  height: 185px;
  width: 160px;
  margin: 10px auto;
  padding: 20px 0;
`;

const MintButton = styled.div`
  border: 1px solid #bc563c;
  font-family: "Dahlia-Bold";
  font-size: 24px;
  color: #bc563c;
  border-radius: 100px;
  width: 350px;
  margin: 20px auto;
  height: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    cursor: pointer;
    background: #bc563c;
    color: #e5dcd0;
  }

  @media screen and (max-width: 767px) {
    margin: 10px auto;
    width: 225px;
  }
`;

const Redeem = () => {
  return (
    <div>
      <Container>
      <Navbar>
          <a href="/">
            <img src={Logo} />
          </a>
          <YY>
            <TT>
              <WalletConnect></WalletConnect>
            </TT>
            <ProfileContainer>
            <a href="/">
              <img src={OrangeSmile} className="smile" />
              </a>
            </ProfileContainer>
          </YY>
        </Navbar>
        <RedeemContainer>
          <FooterDescriptionTitleBold>
            Redeem NFTicket
          </FooterDescriptionTitleBold>
          <FooterDescription>
            Redeem your NFTicket to get a QR code to
            <br /> enter the event
          </FooterDescription>
          <TicketImageWrapper>
            <img src={TicketPlaceholder} />
            <FooterDescription>#126</FooterDescription>
          </TicketImageWrapper>

          <Title>Full Name</Title>
          <Input
            type="text"
            placeholder="Enter your name"
            name="name"
            id="name"
          />
          <Title>Email</Title>
          <Input
            type="text"
            placeholder="Enter your email"
            name="name"
            id="name"
          />
          <Title>Display Name</Title>
          <Input
            type="text"
            placeholder="Enter your display name"
            name="name"
            id="name"
          />
          <MintButton>Redeem Now</MintButton>
        </RedeemContainer>
      </Container>
    </div>
  );
};

export default Redeem;
