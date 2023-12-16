import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useParams } from "react-router-dom";

const DetailNFT = () => {
  const [nft, setNFT] = useState([]);
  const [contractNFT, setContractNFT] = useState();
  const [contractMarket, setContractMarket] = useState();
  const { id } = useParams();

  const buyNFT = async () => {
    // The ID of the listing you want to buy from
    const listingId = 0;
    // Quantity of the asset you want to buy
    const quantityDesired = 1;

    await contractMarket.directListings.buyFromListing(
      listingId,
      quantityDesired,
      "0xBDBA9d8889C6acFC3cEE850DC6DE393B01989D07"
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // If used on the FRONTEND, pass your 'clientId'
        const sdk = new ThirdwebSDK("mumbai", {
          clientId: "598b4f1195f15842446b09538ba00622",
        });
        // NFT

        const contractNFT = await sdk.getContract(
          "0x1BB3B7B5dD5DE77bB2994BE0c88461331f25B373"
        );
        setContractNFT(contractNFT);

        const contractMarket = await sdk.getContract("0x5237bcc6f1848CDdF2785a12e1114Cd639895e36");
        setContractMarket(contractMarket)
        const nfts = await contractNFT.erc1155.get(id);
        console.log(nfts);
        setNFT(nfts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount
  return (
    <div>
      <Card />
      <button onClick={buyNFT}>buy</button>
    </div>
  );
};

export default DetailNFT;
