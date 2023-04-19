import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import styled from "styled-components";
import ErrorPage from "../components/ErrorPage";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { getConfig } from "../config/config";
import { useAccount } from "wagmi";
// import Poap from "../../../assets/poap.jpeg";

const Background = styled.div`
  background: #151515;
  padding-bottom: 12%;
  padding-top: 2%;
  display: grid;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 530px;
  height: 536px;
  left: calc(50% - 530px / 2);
  background: white;
  border: 1px solid black;
  border-radius: 4px;
  margin: auto;

  @media (max-width: 800px) {
    width: 400px;
    margin: 20px 20px 20px 50px;
    height: 600px;
    padding: 20px 20px 20px 20px;
  }
`;

const Title = styled.div`
  font-family: "KnockOut";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  margin-top: 25px;
  display: flex;
  align-items: center;
  text-align: center;
  /* Green Leaf */
  color: #354b37;
  /* Inside auto layout */
  flex: none;
  order: 0;
  padding-top: 5%;
  flex-grow: 0;
  margin: 24px 0px;
`;

const DetailsBox = styled.div`
  /* Body Text M */
  padding: 0 15%;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  /* or 125% */

  text-align: center;

  /* Green Leaf */

  color: #354b37;
`;

const Code = styled.div`
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-top: 7.5%;
  margin-bottom: 10%;
  justify-content: center;
`;

const QrCode = () => {
  const { address } = useAccount();
  const [encryptedHash, setEncryptedHash] = useState(null);
  const [redeemData, setRedeemData] = useState({
    name: "",
    optionalName: "",
    email: "",
  });
  const [tokenOwned, setTokenOwned] = useState(false);
  const [tokenScanned, setTokenScanned] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const getIfTokenScanned = async () => {
    try {
      const url = `${getConfig.apiBaseUrl}/event/${id}`;
      const res = await axios.get(url, {
        headers: {
          validate: process.env.REACT_APP_VALIDATE_TOKEN,
        },
      });
      console.log(res.data?.data);

      if (res.data?.data?.timeOfScan) {
        setTokenScanned(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getIfTokenScanned();
  }, [address]);

  const getTokenRedeemData = async () => {
    try {
      const url = `${getConfig.apiBaseUrl}/users/${id}`;
      const { data } = await axios.get(url, {
        headers: {
          validate: process.env.REACT_APP_VALIDATE_TOKEN,
        },
      });
      console.log(data);
      if (data?.user?.name) setTokenOwned(true);
      // wallet address is not lowercased here
      if (data?.user?.walletAddress === address) setTokenOwned(true);
      setRedeemData(data.user);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (address) getTokenRedeemData();
  }, [address]);

  useEffect(() => {
    const run = async () => {
      const url = `${getConfig.apiBaseUrl}/qrcode/${id}`;

      let hashFound = false;
      while (!hashFound) {
        const { data } = await axios.get(url, {
          headers: {
            validate: process.env.REACT_APP_VALIDATE_TOKEN,
          },
        });

        // console.log("encrypted data model wallet address: ", data);

        // wallet address lowercased here
        if (
          data?.walletAddress === address.toLowerCase() || // from evnets txn in defender
          data?.walletAddress === address
        ) {
          // console.log("encypted hash: ", data);
          setEncryptedHash(data?.encrypted);
          setTokenOwned(true);
          hashFound = true;
        }
      }
    };
    if (address) run();
  }, [redeemData, address]);

  const options = {
    headers: {
      validate: process.env.REACT_APP_VALIDATE_TOKEN,
    },
  };

  const onDownload = async () => {
    try {
      const url = `${
        getConfig.mainApiBaseUrl
      }/createDownload?encrypted=${encodeURIComponent(encryptedHash)}`;
      var { data } = await axios.get(url, options);
      console.log(data);

      const downloadUrl = `${getConfig.mainApiBaseUrl}/download/${data?.fileName}`;

      fetch(downloadUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
          validate: process.env.REACT_APP_VALIDATE_TOKEN,
        },
      })
        .then((response) => response.blob())
        .then((blob) => {
          // Create blob link to download
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `ETH-BCN-QR.pdf`);

          // Append to html link element page
          document.body.appendChild(link);

          // Start download
          link.click();

          // Clean up and remove the link
          link.parentNode.removeChild(link);
        });
    } catch (err) {
      console.error(err);
    }
  };

  if (tokenScanned) {
    return (
      // <Poap />
      // <Navigate to={`/tickets/${id}/poap`} replace />
      <div padding="10%">
        <img alt="POAP" width="100%" height=""></img>
      </div>
    );
  }

  return (
    <>
      {tokenOwned ? (
        <Background>
          <Container style={{ position: "relative" }}>
            <div
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                position: "absolute",
                top: 10,
                left: "50%",
                alignItems: "center",
              }}
              onClick={() => navigate(-1)}
            >
              Back
            </div>
            <Title>Hurray! You redeemed it successfully 🙋‍♂️</Title>

            <p>
              You are going to ETH BCN! This QR code is your access to the
              event. You could download it or access here with your wallet to
              use it.
            </p>

            <DetailsBox>
              <div>Name: {redeemData.name}</div>
              <div>Email: {redeemData.email} </div>
              <div>Phone Number: {redeemData.optionalName}</div>
              <div>NFT Ticket : {id} </div>
            </DetailsBox>

            {encryptedHash ? (
              <Code>
                <QRCodeSVG
                  value={`${getConfig.appBaseUrl}/organizer?tid=${id}&owner=${address}&name=${redeemData.name}&hash=${encryptedHash}`}
                ></QRCodeSVG>
              </Code>
            ) : (
              <Code>
                Please wait while the qr code is being generated...
                <br />
                Reload and connect wallet if not displayed in 2 mins..
              </Code>
            )}

            {/* <div>
              <div
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (encryptedHash) onDownload();
                }}
              >
                <img alt=""></img>
                Download
              </div>
            </div> */}
          </Container>
        </Background>
      ) : (
        <ErrorPage text={""} />
      )}
    </>
  );
};

export default QrCode;
