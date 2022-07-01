import {useAccount, useContractRead, useContractWrite, useNetwork} from "wagmi";
import GamerTag from "../contracts/GamerTag.json";

/**
 * Hooks to interact with the GamerTag contract
 * @returns {{
 *  tag: string,
 *  nickname: string,
 *  tagClaimedAt: string,
 *  getTag: function(string),
 *  getNickname: function(string),
 *  getTagClaimTime: function(string),
 *  getPlayerFromTag: function(string),
 * }}
 */
export const useGamerTag = () => {
  const {chain} = useNetwork();
  const {address} = useAccount();

  // --- Connected player details ---
  const {data: tag} = useContractRead({
    addressOrName: GamerTag?.networks[chain?.id]?.address,
    contractInterface: GamerTag?.abi,
    functionName: "getTag",
    args: address,
    watch: true
  });

  const {data: nickname} = useContractRead({
    addressOrName: GamerTag?.networks[chain?.id]?.address,
    contractInterface: GamerTag?.abi,
    functionName: "getNickname",
    args: address,
    watch: true
  });

  const {data: tagClaimedAt} = useContractRead({
    addressOrName: GamerTag?.networks[chain?.id]?.address,
    contractInterface: GamerTag?.abi,
    functionName: "tagClaimedAt",
    args: address,
    watch: true
  });

  // --- Lookup functions ---
  const {writeAsync: getNickname} = useContractWrite({
    addressOrName: GamerTag?.networks[chain?.id]?.address,
    contractInterface: GamerTag?.abi,
    functionName: "getNickname"
  });

  const {writeAsync: getTag} = useContractWrite({
    addressOrName: GamerTag?.networks[chain?.id]?.address,
    contractInterface: GamerTag?.abi,
    functionName: "getTag"
  });

  const {writeAsync: getTagClaimTime} = useContractWrite({
    addressOrName: GamerTag?.networks[chain?.id]?.address,
    contractInterface: GamerTag?.abi,
    functionName: "tagClaimedAt"
  });

  const {writeAsync: getPlayerFromTag} = useContractWrite({
    addressOrName: GamerTag?.networks[chain?.id]?.address,
    contractInterface: GamerTag?.abi,
    functionName: "tagLookup"
  });

  return {
    tag,
    nickname,
    tagClaimedAt,
    getTag: address => getTag({args: address}),
    getNickname: address => getNickname({args: address}),
    getTagClaimTime: address => getTagClaimTime({args: address}),
    getPlayerFromTag: tag => getPlayerFromTag({args: tag}),
  }
};
export default useGamerTag;