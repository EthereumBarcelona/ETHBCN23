import React from "react";
import styled from "styled-components";
import WalletConnect from "../components/walletConnect";
import Logo from "../assets/logo.svg";
import TicketPlaceholder from "../assets/Ticket.png";
import OrangeSmile from "../assets/orangeSmile.svg";
import whiteSmile from "../assets/whiteSmile.svg";
import "./style.css";
import { useAccount, useContractReads } from "wagmi";
import { getConfig } from "../config/config";
import ticketAbi from "../ethereum/build/TicketAbi.json";
import { sepolia } from "wagmi/chains";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2vw 10vw;
  min-height: 100vh;
  background: #e5dcd0;

  @media screen and (max-width: 768px) {
    padding: 0 20px 50px 20px;
  }
`;

export const Navbar = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    padding: 20px 0;
  }
`;
export const TicketDisplayContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Footer = styled.div`
  margin-top: 25vh;
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

  @media screen and (max-width: 768px) {
    width: 50px;
    height: 50px;
    margin: 0 0 00px 0px;
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

export const YY = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

export const TT = styled.div`
  border: 1px solid #bc563c;
  border-radius: 100px;
  width: auto; // 200px;

  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 15px;

  @media screen and (max-width: 768px) {
    width: 00px;
    height: 00px;
    margin: 0 90px 15px 90px;
    border: none;
  }
`;

const Profile = () => {
  const { address } = useAccount();
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        address: getConfig.ticketContractAddress,
        abi: ticketAbi,
        functionName: "walletQuery",
        args: [address],
        chainId: sepolia.id,
      },
    ],
  });

  console.log("Wallet query: ", data);

  return (
    <div>
      <Container>
        <Navbar>
          <a href="https://ethbarcelona.com/">
            <img src={Logo}  className="logo"/>
          </a>
          <YY>
            <TT>
              <WalletConnect />
            </TT>
            <ProfileContainer>
              <a href="/">
                <img src={OrangeSmile} className="smile" />
              </a>
            </ProfileContainer>
          </YY>
        </Navbar>
        <TicketDisplayContainer>
          {data?.[0]?.map((tokenId) => {
            return (
              <div key={tokenId}>
                <img src={TicketPlaceholder} className="ticket" />
                <div>#{tokenId.toString()}</div>
              </div>
            );
          })}
          {/* <img src={TicketPlaceholder} className="ticket" />
          <img src={TicketPlaceholder} className="ticket" />
          <img src={TicketPlaceholder} className="ticket" /> */}
        </TicketDisplayContainer>
        <Footer>
          <FooterDescriptionTitle>Redeem your NFTicket</FooterDescriptionTitle>
          <FooterDescriptionTitleBold>
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
