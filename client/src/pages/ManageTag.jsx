import React from "react";

import GamerTag from "../contracts/GamerTag.json";
import {useAccount, useContractRead, useNetwork} from "wagmi"
import ClaimTagCards from "../components/ClaimTagCards";
import ManageTagCards from "../components/ManageTagCards";

const ManageTag = ({styles}) => {
  const {chain} = useNetwork();
  const {address} = useAccount();

  const {data: tag} = useContractRead({
    addressOrName: GamerTag?.networks[chain?.id]?.address,
    contractInterface: GamerTag?.abi,
    functionName: "getTag",
    args: address,
    watch: true
  });

  if (!address || tag === "") {
    return <ClaimTagCards styles={styles}/>;
  }

  return <ManageTagCards styles={styles} tag={tag}/>;
}

export default ManageTag;
