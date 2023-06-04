import React, { useEffect, useState } from "react";
import { Container } from "./mint";
import { FooterDescriptionTitleBold, FooterDescription } from "./profile";
import styled from "styled-components";
import TicketPlaceholder from "../assets/ethereum.png";
import whiteSmile from "../assets/whiteSmile.svg";
import { Navbar, YY, TT, ProfileContainer } from "./profile";
import WalletConnect from "../components/walletConnect";
import Logo from "../assets/logo.svg";
import OrangeSmile from "../assets/orangeSmile.svg";
import { useNavigate, useParams } from "react-router-dom";
import {
  mainnet,
  sepolia,
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { getConfig } from "../config/config";
import ticketAbi from "../ethereum/build/TicketAbi.json";
import axios from "axios";
import ErrorPage from "../components/ErrorPage";

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

const MintButton = styled.button`
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
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [user, setUser] = useState({
    fullName: "",
    displayName: "",
    email: "",
  });

  const [tokenOwned, setTokenOwned] = useState(false);
  const [redeeming, setRedeeming] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const useChain =
    chain?.id in getConfig
      ? chain
      : getConfig.env === "testnet"
      ? sepolia
      : mainnet;

  const { data: owner, error } = useContractRead({
    address: getConfig?.[useChain?.id]?.ticketContractAddress,
    abi: getConfig?.[useChain?.id]?.ticketAbi,
    functionName: "ownerOf",
    args: [id],
    chainId: useChain?.id,
  });

  const checkIfTokenOwned = async () => {
    try {
      // const owner = await TicketToken.methods.ownerOf(id).call();

      if (owner === address && !error) setTokenOwned(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (address) checkIfTokenOwned();
  }, [owner, error, address]);

  const { config } = usePrepareContractWrite({
    address: getConfig?.[useChain?.id]?.ticketContractAddress,
    abi: getConfig?.[useChain?.id]?.ticketAbi,
    functionName: "burn",
    args: [id],
    chainId: useChain?.id,
    overrides: {
      from: address,
    },
    // enabled: false,
  });

  const { data: burnData, write: burn } = useContractWrite(config);

  // console.log("BURN: ", burnData, burn);

  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: burnData?.hash,
  });

  useEffect(() => {
    const run = async () => {
      if (burnData?.hash) {
        if (isSuccess && !isError) {
          const url = `${getConfig.apiBaseUrl}/qrcode`;
          const tkt_data = {
            walletAddress: address,
            tokenID: id,
            hash: burnData?.hash,
          };
          const res = await axios.post(url, tkt_data, {
            headers: {
              "Content-Type": "application/json",
              validate: process.env.REACT_APP_VALIDATE_TOKEN,
            },
          });
          console.log(res);
        }
        if (isSuccess || isError) setRedeeming(false);
        if (isSuccess) navigate(`/tickets/${id}/qrcode`);
      }
    };
    run();
  }, [burnData, isSuccess, isError, id, navigate, isLoading, address]);

  const onBurn = async (e) => {
    e.preventDefault();
    setRedeeming(true);
    await saveData();
    try {
      console.log("Burning the ticket");

      burn();
      console.log("burning2..");
    } catch (err) {
      console.error(err);
    }
  };

  const saveData = async () => {
    const url = `${getConfig.apiBaseUrl}/users`;
    const post_data = {
      name: user.fullName,
      optionalName: user.displayName ? user.displayName : user.fullName,
      email: user.email,
      walletAddress: address,
      tokenId: id,
      ticketId: id,
    };

    const { data } = await axios.get(url + `/${id}`, {
      headers: {
        validate: process.env.REACT_APP_VALIDATE_TOKEN,
      },
    });

    console.log(data?.user);

    if (!user?.displayName)
      setUser({ ...user, displayName: data?.user?.optionalName });

    if (data.user?.tokenId) {
      await axios.patch(url + `/${id}`, post_data, {
        headers: {
          validate: process.env.REACT_APP_VALIDATE_TOKEN,
        },
      });
    } else {
      await axios.post(url, post_data, {
        headers: {
          "Content-Type": "application/json",
          validate: process.env.REACT_APP_VALIDATE_TOKEN,
        },
      });
    }

    console.log("user data posted successfully...");
  };

  return (
    <>
      {tokenOwned ? (
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
                    <img src={OrangeSmile} alt="" className="smile" />
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
                <img src={TicketPlaceholder} alt="" />
                <FooterDescription>#{id}</FooterDescription>
              </TicketImageWrapper>

              <form onSubmit={onBurn}>
                <Title>Full Name</Title>
                <Input
                  type="text"
                  required
                  placeholder="Enter your name"
                  name="name"
                  id="name"
                  value={user?.fullName}
                  onChange={(e) =>
                    setUser({ ...user, fullName: e.target.value })
                  }
                />
                <Title>Email</Title>
                <Input
                  type="text"
                  required
                  placeholder="Enter your email"
                  name="name"
                  id="name"
                  value={user?.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <Title>Display Name</Title>
                <Input
                  type="text"
                  placeholder="Enter your display name"
                  name="name"
                  id="name"
                  value={user?.displayName}
                  onChange={(e) =>
                    setUser({ ...user, displayName: e.target.value })
                  }
                />

                <MintButton>
                  {isLoading ? (
                    <span>Burning..</span>
                  ) : redeeming ? (
                    <span>Redeeming...</span>
                  ) : (
                    <span>Redeem Now</span>
                  )}
                </MintButton>
              </form>
            </RedeemContainer>
          </Container>
        </div>
      ) : (
        <ErrorPage text={"You do not own this token id"} />
      )}
    </>
  );
};

export default Redeem;
