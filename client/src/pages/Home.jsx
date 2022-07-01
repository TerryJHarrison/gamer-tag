import React from "react";
import {ClaimTagCards, ManageTagCards} from "../components";
import {useGamerTag} from "../hooks";
import {useAccount} from "wagmi"

/**
 * Home page, claim and manage your gamer tag and nickname
 * @param styles
 * @returns {JSX.Element}
 */
const Home = ({styles}) => {
  const {address} = useAccount();
  const {tag} = useGamerTag();

  if (!address || tag === "") {
    return <ClaimTagCards styles={styles}/>;
  }

  return <ManageTagCards styles={styles} tag={tag}/>;
}

export default Home;
