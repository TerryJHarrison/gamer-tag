import {useState} from "react";
import {useContractWrite, useNetwork, useWaitForTransaction} from "wagmi";
import GamerTag from "../contracts/GamerTag.json";

/**
 * Hooks for updating nicknames with GamerTag contract
 * @returns {{
 *  setNickname: function(string)
 * }}
 */
export const useSetNickname = (onSubmit, onSuccess) => {
  const {chain} = useNetwork();
  const [updateTxn, setUpdateTxn] = useState("");

  const {writeAsync: setNickname} = useContractWrite({
    addressOrName: GamerTag?.networks[chain?.id]?.address,
    contractInterface: GamerTag?.abi,
    functionName: "setNickname",
    onSuccess(data) {
      onSubmit();
      setUpdateTxn(data.hash);
    }
  });

  // Handle transaction responses
  useWaitForTransaction({
    hash: updateTxn,
    onSuccess() {
      onSuccess();
      setUpdateTxn("");
    }
  })

  return {
    setNickname: nickname => setNickname({args: [nickname]})
  }
};
export default useSetNickname;