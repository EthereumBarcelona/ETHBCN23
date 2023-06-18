import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WalletConnect from "../components/walletConnect";
import Logo from "../assets/logo.svg";
import TicketOnEth from "../assets/ethereum.png";
import TicketOnOpt from "../assets/optimism.png";
import viewQR from "../assets/viewqr.png";
import OrangeSmile from "../assets/orangeSmile.svg";
import whiteSmile from "../assets/whiteSmile.svg";
import "./style.css";
import { useAccount, useContractReads, useNetwork } from "wagmi";
import { mainnet, sepolia, optimism, optimismGoerli } from "wagmi/chains";
import { getConfig } from "../config/config";
import { Link } from "react-router-dom";
import axios from "axios";

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
  display: flex;
  justify-content: space-between;
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

export const FooterDescriptionTitleBold2 = styled.div`
  font-family: "Dahlia-Bold";
  font-style: normal;
  font-weight: 400;
  display: inline-block;
  font-size: 40px;
  line-height: 48px;
  color: #bc563c;
  :hover {
    cursor: pointer;
  }
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

export const TikcetId = styled.div`
  text-decoration: none;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: #bc563c;
  text-underline: none;

  a {
    text-decoration: none;
    color: inherit;
    text-underline: none;
  }
`;

export const TicketBox = styled.div`
  margin: 10px;
  border: 2px solid #bc563c;
  padding-bottom: 5px;
  transition: filter 0.3s;

  &:hover {
    filter: brightness(0.8);
    cursor: pointer;
    position: relative;
  }

  &:hover::after {
    content: "Redeem Now";
    position: absolute;
    top: 25px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #bc563c;
    color: #fff;
    padding: 5px;
    font-family: "Montserrat";
    font-weight: 500;
    font-size: 14px;
    border-radius: 5px;
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:hover::after {
    opacity: 1;
  }
`;

export const RedeemedTicketBox = styled(TicketBox)`
  &:hover::after {
    content: "";
    padding: 0px;
  }
`;

const Left = styled.div``;
const Right = styled.div``;

const Profile = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();

  const [redeemedTokens, setRedeemedTokens] = useState([]);

  const useChain =
    chain?.id in getConfig
      ? chain
      : getConfig.env === "testnet"
      ? sepolia
      : mainnet;

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        address: getConfig?.[sepolia?.id]?.ticketContractAddress,
        abi: getConfig?.[sepolia?.id]?.ticketAbi,
        functionName: "walletQuery",
        args: [address],
        chainId: sepolia?.id,
      },
      {
        address: getConfig?.[optimismGoerli.id]?.ticketContractAddress,
        abi: getConfig?.[optimismGoerli?.id]?.ticketAbi,
        functionName: "walletQuery",
        args: [address],
        chainId: optimismGoerli?.id,
      },
    ],
  });

  console.log("Wallet query: ", data);

  const getRedeemedTokens = async () => {
    try {
      const url = `${getConfig.apiBaseUrl}/getRedeemedTokens/${address}`;
      const { data } = await axios.get(url, {
        headers: {
          validate: process.env.REACT_APP_VALIDATE_TOKEN,
        },
      });
      console.log({ address, redeemedTokens: data });
      setRedeemedTokens(data);
    } catch (err) {}
  };

  useEffect(() => {
    getRedeemedTokens();
  }, [address]);

  return (
    <div>
      <Container>
        <Navbar>
          <a href="https://ethbarcelona.com/">
            <img src={Logo} className="logo" />
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
              <TicketBox>
                <Link to={`/redeem/eth/${sepolia.id}/${tokenId}`} key={tokenId}>
                  <img src={TicketOnEth} className="ticket" />
                  <TikcetId>#{tokenId.toString()}</TikcetId>
                </Link>
              </TicketBox>
            );
          })}
          {data?.[1]?.map((tokenId) => {
            return (
              <TicketBox>
                <Link
                  to={`/redeem/op/${optimismGoerli.id}/${tokenId}`}
                  key={tokenId}
                >
                  <img src={TicketOnOpt} className="ticket" />
                  <TikcetId>#{tokenId.add(750).toString()}</TikcetId>
                </Link>
              </TicketBox>
            );
          })}

          {redeemedTokens?.map(({ ticketId, tokenId, chainId }) => {
            return (
              <RedeemedTicketBox>
                <Link to={`/tickets/${tokenId}/qrcode`} key={ticketId}>
                  <img src={viewQR} className="ticket" alt="" />
                  <TikcetId>#{ticketId.toString()}</TikcetId>
                </Link>
              </RedeemedTicketBox>
            );
          })}
          {/* <img src={TicketPlaceholder} className="ticket" />
          <img src={TicketPlaceholder} className="ticket" />
          <img src={TicketPlaceholder} className="ticket" /> */}
        </TicketDisplayContainer>
        <Footer>
          <Left>
            <FooterDescriptionTitle>
              Redeem your NFTicket
            </FooterDescriptionTitle>
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
          </Left>

          <Right>
            <a href="/mint">
              <FooterDescriptionTitleBold2 href="/mint">
                Buy Tickets
              </FooterDescriptionTitleBold2>
            </a>
          </Right>
        </Footer>
      </Container>
    </div>
  );
};

export default Profile;
