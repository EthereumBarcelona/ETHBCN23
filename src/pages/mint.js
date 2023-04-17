import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WalletConnect from "../components/walletConnect";
import Logo from "../assets/logo.svg";
import TicketPlaceholder from "../assets/Ticket.png";
import OrangeSmile from "../assets/orangeSmile.svg";
import whiteSmile from "../assets/whiteSmile.svg";
import Ticket from "../assets/TicketMint.svg";
import "./style.css";
import Arrow from "../assets/Icon.png";
import Minus from "../assets/Minus.png";
import Plus from "../assets/Plus.png";
import { TT, Navbar, ProfileContainer, YY } from "./profile";
import { getConfig } from "../config/config";
import { erc20ABI, useAccount, useContractRead, useContractReads } from "wagmi";
import { ethers } from "ethers";
import ApproveUsdc from "../components/ApproveUsdc";
import MintTicket from "../components/MintTicket";
import { sepolia } from "wagmi/chains";
import ticketAbi from "../ethereum/build/TicketAbi.json";

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

// export const Navbar = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

export const TicketDisplayContainer = styled.div``;

export const Footer = styled.div`
  margin-top: auto;
`;

// const YY = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
//   align-items: center;
// `;
// export const ProfileContainer = styled.div`
//   width: 80px;
//   margin: 0 50px;
//   height: 80px;
//   border-radius: 100px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border: 1px solid #bc563c;
//   :hover {
//     background: #bc563c;
//     .smile {
//       content: url(${whiteSmile});
//     }
//   }
// `;

export const FooterDescriptionTitle = styled.div`
  font-family: "Dahlia-Bold";
  font-style: normal;
  font-weight: 400;
  text-transform: uppercase;
  font-size: 48px;
  line-height: 48px;
  text-align: left;
  color: #424242;

  @media screen and (max-width: 768px) {
    font-size: 40px;
  }
`;

export const FooterDescription = styled.div`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 17px;
  color: #424242;
  margin-bottom: 8px;

  @media screen and (max-width: 768px) {
  }
`;

export const MintContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    padding: 0 0 40px 0;
  }
`;

export const TicketVideoWrapper = styled.div``;
export const TicketInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  padding: 16px;
  position: relative; /* added this */

  @media screen and (max-width: 767px) {
    width: 100%;
    padding: 20px 0 20px 0;
  }
`;

const Line = styled.div`
  border-bottom: 1px solid #bc563c;
  width: 350px;
  margin-top: 40px;

  @media screen and (max-width: 767px) {
    width: 300px;
    margin: 20px auto;
  }
`;

const FiatText = styled.div`
  font-family: "Dahlia-Bold";
  font-style: normal;
  font-weight: 400;
  text-transform: uppercase;
  font-size: 20px;
  text-align: left;
  color: #424242;
  position: absolute;
  bottom: 0;

  :hover {
    cursor: pointer;
  }

  @media screen and (max-width: 767px) {
    bottom: -20px;
    text-align: center;
    margin: 0 auto;
    width: 100%;
  }
`;

const TicketInfoContainer = styled.div`
  margin: 50px 0 20px 0;
  align-items: left;
  text-align: left;

  @media screen and (max-width: 767px) {
    margin: 20px 0;
  }
`;

const HeadingSmall = styled.div`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  color: #424242;
  display: inline;
  margin: 0 100px 0 0;

  @media screen and (max-width: 767px) {
    margin: 0 50px 0 0;
  }
`;

const HeadingSmallOrange = styled(HeadingSmall)`
  color: #bc563c;
`;

const TicketPrice = styled.div`
  font-family: "Dahlia-Bold";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  text-decoration-line: line-through;
  display: inline-block;
  color: #424242;
  text-align: left;
`;

const TicketPriceOrange = styled(TicketPrice)`
  color: #bc563c;
  font-size: 24px;
  text-decoration-line: none;
  margin: 20px 10px;

  @media screen and (max-width: 767px) {
    margin: 10px 5px 0 0;
  }
`;

const TicketPriceBlack = styled.div`
  color: #bc563c;
  font-size: 24px;
  color: #424242;
  font-family: "Dahlia-Bold";

  @media screen and (max-width: 767px) {
    margin: 10px 5px 0 0;
  }
`;

export const CounterWrapper = styled.div`
  font-family: "Dahlia-Bold";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 19px;
  display: inline-block;
  color: #424242;
  text-align: left;
`;

const Counter = ({ numberOfTokens, setNumberOfTokens }) => {
  const incrementCount = () => {
    setNumberOfTokens(numberOfTokens + 1);
  };

  const decrementCount = () => {
    setNumberOfTokens(numberOfTokens - 1 > 0 ? numberOfTokens - 1 : 0);
  };

  return (
    <div>
      <img src={Minus} className="minus" onClick={decrementCount} />
      {numberOfTokens}
      <img src={Plus} className="add" onClick={incrementCount} />
    </div>
  );
};

const Mint = () => {
  const { address } = useAccount();
  const [numberOfTokens, setNumberOfTokens] = useState(1);
  const [approved, setApproved] = useState();

  let bignumber = ethers.BigNumber.from(0);

  let waveRead = { price: bignumber }; //contractRead?.[0]; //
  let allowance = bignumber; //contractRead?.[1]; // ;

  const { data: contractRead } = useContractReads({
    contracts: [
      {
        address: getConfig.ticketContractAddress,
        abi: ticketAbi,
        functionName: "waves",
        args: [ethers.BigNumber.from("0")],
        chainId: sepolia.id,
      },
      {
        address: getConfig.usdcAddress,
        abi: erc20ABI,
        functionName: "allowance",
        args: [address, getConfig.ticketContractAddress],
        chainId: sepolia.id,
      },
    ],
  });

  const { data: waveRead1 } = useContractRead({
    address: getConfig.ticketContractAddress,
    abi: ticketAbi,
    functionName: "waves",
    args: [ethers.BigNumber.from("0")],
    chainId: sepolia.id,
  });

  const { data: allowance1 } = useContractRead({
    address: getConfig.usdcAddress,
    abi: erc20ABI,
    functionName: "allowance",
    args: [address, getConfig.ticketContractAddress],
    chainId: sepolia.id,
  });

  waveRead = waveRead1 ? waveRead1 : waveRead;
  allowance = allowance1 ? allowance1 : allowance;

  console.log(" contract read: ", contractRead);

  console.log("wave read: ", waveRead1);
  console.log("allowance: ", allowance1);

  // const data = [allowance, waveRead];

  // const data = [bignumber, { price: bignumber }];

  useEffect(() => {
    setApproved(allowance >= waveRead?.price?.mul(numberOfTokens));
  }, [waveRead, allowance, numberOfTokens]);

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

        <MintContainer>
          <TicketVideoWrapper>
            <img src={Ticket} className="mintTicket" />
          </TicketVideoWrapper>
          <TicketInfoWrapper>
            <FooterDescription>ETHBarcelona</FooterDescription>
            <FooterDescriptionTitle>
              Early-Bird <br /> Ticket
            </FooterDescriptionTitle>
            <TicketInfoContainer>
              <HeadingSmall>
                Price <HeadingSmallOrange>-50 %</HeadingSmallOrange>
              </HeadingSmall>

              <HeadingSmall>
                {waveRead?.minted?.toString()}/{waveRead?.supply?.toString()}
              </HeadingSmall>

              <br />
              <TicketPrice>
                $ 500
                <TicketPriceOrange>
                  {/* $ 399  */}${ethers.utils.formatEther(waveRead?.price)}
                </TicketPriceOrange>
              </TicketPrice>

              <CounterWrapper>
                <Counter
                  numberOfTokens={numberOfTokens}
                  setNumberOfTokens={setNumberOfTokens}
                />
              </CounterWrapper>
              <TicketPriceBlack>
                Total cost:
                <TicketPriceOrange>
                  $
                  {ethers.utils.formatEther(
                    waveRead?.price?.mul(numberOfTokens)
                  )}
                </TicketPriceOrange>{" "}
              </TicketPriceBlack>
            </TicketInfoContainer>
            {!approved ? (

              <ApproveUsdc
                ticketPrice={waveRead?.price}
                numberOfTokens={numberOfTokens}
                setApproved={setApproved}
              />
            ) : (
              <MintTicket numberOfTokens={numberOfTokens} />
            )}
            <Line></Line>
            <a href="https://ethbarcelona.myshopify.com/">
              <FiatText>
                Buy with <img src={Arrow} className="arrow" /> <br /> Credit
                Card
              </FiatText>
            </a>
          </TicketInfoWrapper>
        </MintContainer>
      </Container>
    </div>
  );
};

export default Mint;
