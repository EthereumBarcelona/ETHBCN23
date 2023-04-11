import React, { useState } from "react";
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

const YY = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
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
  font-family: "Dahlia-Bold";
  font-style: normal;
  font-weight: 400;
  text-transform: uppercase;
  font-size: 48px;
  line-height: 48px;
  text-align: left;
  color: #424242;
`;

export const FooterDescription = styled.div`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 17px;
  color: #424242;
  margin-bottom: 8px;
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
  position: relative; /* added this */
`;

const MintButton = styled.div`
  border: 1px solid #bc563c;
  font-family: "Dahlia-Bold";
  font-size: 24px;
  color: #bc563c;
  border-radius: 100px;
  width: 350px;
  height: 80px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    cursor: pointer;
    background: #bc563c;
    color: #e5dcd0;
  }
`;

const Line = styled.div`
  border-bottom: 1px solid #bc563c;
  width: 350px;
  margin-top: 40px;
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
`;

const TicketInfoContainer = styled.div`
  margin: 50px 0 20px 0;
  align-items: left;
  text-align: left;
`;

const HeadingSmall = styled.div`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  color: #424242;
  display: inline;
  margin: 0 100px 0 0;
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

const Counter = () => {
  const [count, setCount] = useState(1);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <img src={Minus} className="minus" onClick={decrementCount} />
      {count}
      <img src={Plus} className="add" onClick={incrementCount} />
    </div>
  );
};
const Mint = () => {
  return (
    <div>
      <Container>
        <Navbar>
          <a href="/">
            {" "}
            <img src={Logo} />
          </a>
          <YY>
            <WalletConnect></WalletConnect>

            <ProfileContainer>
              <img src={OrangeSmile} className="smile" />
            </ProfileContainer>
          </YY>
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
            <TicketInfoContainer>
              <HeadingSmall>
                Price <HeadingSmallOrange>-50 %</HeadingSmallOrange>
              </HeadingSmall>

              <HeadingSmall>23/500</HeadingSmall>

              <br />
              <TicketPrice>
                $ 500 <TicketPriceOrange>$399</TicketPriceOrange>
              </TicketPrice>
              <CounterWrapper>
                <Counter />
              </CounterWrapper>
            </TicketInfoContainer>
            <MintButton>Mint</MintButton>
            <Line></Line>
            <FiatText>
              Buy with <img src={Arrow} className="arrow" /> <br /> CRedit Card
            </FiatText>
          </TicketInfoWrapper>
        </MintContainer>
      </Container>
    </div>
  );
};

export default Mint;
