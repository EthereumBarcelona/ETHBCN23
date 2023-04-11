import React from "react";
import styled from "styled-components";
import WalletConnect from "../components/walletConnect";
import Logo from "../assets/logo.svg";
import TicketPlaceholder from "../assets/Ticket.png";
import OrangeSmile from "../assets/orangeSmile.svg";
import whiteSmile from "../assets/whiteSmile.svg";
import Ticket from "../assets/TicketMint.svg";
import "./style.css";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2vw 10vw;
  min-height: 100vh;
  background: #e5dcd0;
`;

export const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TicketDisplayContainer = styled.div``;

export const Footer = styled.div`
  margin-top: auto;
`;

export const ProfileContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 100px;
  display: flex;
  justify-content: flex-end;
  border: 1px solid #bc563c;
  :hover {
    background: #bc563c;
    .smile {
      content: url(${whiteSmile});
    }
`;

export const FooterDescriptionTitle = styled.div`
  font-family: "Dahlia";
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 48px;
  color: #bc563c;
`;

export const FooterDescription = styled.div`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #bc563c;
`;

export const MintContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const TicketVideoWrapper = styled.div``;
export const TicketInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  padding: 16px;
`;

const Mint = () => {
  return (
    <div>
      <Container>
        <Navbar>
          <a href="/">
            {" "}
            <img src={Logo}/>
          </a>
          <WalletConnect></WalletConnect>

          <ProfileContainer>
            <img src={OrangeSmile} className="smile" />
          </ProfileContainer>
        </Navbar>

        <MintContainer>
          <TicketVideoWrapper>
            <img src={Ticket} />
          </TicketVideoWrapper>
          <TicketInfoWrapper>
            <FooterDescription>ETHBarcelona</FooterDescription>
            <FooterDescriptionTitle>
              Early-Bird <br /> Ticket
            </FooterDescriptionTitle>
          </TicketInfoWrapper>
        </MintContainer>

        <Footer>
          <FooterDescriptionTitle>
            Redeem your NFTicket to get a QR <br /> code to enter the event
          </FooterDescriptionTitle>
          <FooterDescription>
            You’ll be able to redeem 2 weeks before the event!
          </FooterDescription>
        </Footer>
      </Container>
    </div>
  );
};

export default Mint;
