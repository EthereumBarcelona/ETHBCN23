import React from "react";
import styled from "styled-components";
import WalletConnect from "../components/walletConnect";
import Logo from "../assets/logo.svg";
import TicketPlaceholder from "../assets/Ticket.png";
import OrangeSmile from "../assets/orangeSmile.svg";
import whiteSmile from "../assets/whiteSmile.svg";
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
  text-align: left;
`;
export const ProfileContainer = styled.div`
  width: 80px;
  margin: 0 50px;
  height: 80px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #bc563c;
  :hover {
    background: #bc563c;
    .smile {
      content: url(${whiteSmile});
    }
  }
`;

export const FooterDescriptionTitle = styled.div`
  font-family: "Dahlia-RC";
  font-style: normal;
  font-weight: 400;
  margin-right: 10px;
  font-size: 40px;
  line-height: 48px;
  display: inline-block;
  color: #bc563c;
`;

export const FooterDescriptionTitleBold = styled.div`
  font-family: "Dahlia-Bold";
  font-style: normal;
  font-weight: 400;
  display: inline-block;
  font-size: 40px;
  line-height: 48px;
  color: #bc563c;
`;

export const FooterDescription = styled.div`
  font-family: "Montserrat";
  font-style: normal;
  margin-top: 16px;
  font-weight: 500;
  font-size: 18px;
  line-height: 17px;
  color: #bc563c;
`;

const YY = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const TT = styled.div`
border: 1px solid #bc563c;
border-radius: 100px;
width:200px;
height:80px;
display: flex;
align-items: center;
justify-content: center;

`

const Profile = () => {
  return (
    <div>
      <Container>
        <Navbar>
          <a href="/">
            {" "}
            <img src={Logo} />
          </a>
          <YY>
            <TT>
            <WalletConnect></WalletConnect>
            </TT>
   

            <ProfileContainer>
              <img src={OrangeSmile} className="smile" />
            </ProfileContainer>
          </YY>
        </Navbar>
        <TicketDisplayContainer>
          <img src={TicketPlaceholder} />
        </TicketDisplayContainer>
        <Footer>
          <FooterDescriptionTitle>Redeem your NFTicket</FooterDescriptionTitle>
          <FooterDescriptionTitleBold>
            {" "}
            to get a QR <br />
            {/* code to enter the event */}
          </FooterDescriptionTitleBold>
          <br />
          <FooterDescriptionTitleBold>
            code to enter the event
          </FooterDescriptionTitleBold>
          <FooterDescription>
            You’ll be able to redeem 2 weeks before the event!
          </FooterDescription>
        </Footer>
      </Container>
    </div>
  );
};

export default Profile;
