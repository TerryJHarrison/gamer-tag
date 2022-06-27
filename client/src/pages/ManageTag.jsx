import React from "react";

import GamerTag from "../contracts/GamerTag.json";
import {useAccount, useContractRead, useNetwork} from 'wagmi'
import ClaimTagCards from "../components/ClaimTagCards";
import ManageTagCards from "../components/ManageTagCards";

const ManageTag = ({styles}) => {
  const {activeChain} = useNetwork();
  const {data: account} = useAccount();

  const {data: tag} = useContractRead({
    addressOrName: GamerTag?.networks[activeChain?.id]?.address,
    contractInterface: GamerTag?.abi
  }, "getTag", {
    args: account?.address
  });

  if (!account || tag === "") {
    return <ClaimTagCards styles={styles}/>;
  }

  return <ManageTagCards styles={styles} tag={tag}/>;
}

export default ManageTag;
