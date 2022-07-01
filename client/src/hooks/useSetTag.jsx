import {useState} from "react";
import {useContractWrite, useNetwork, useWaitForTransaction} from "wagmi";
import GamerTag from "../contracts/GamerTag.json";

/**
 * Hooks for claiming a tag with GamerTag contract
 * @returns {{
 *  setTag: function(string)
 * }}
 */
export const useSetTag = (onSubmit, onSuccess, onError) => {
  const {chain} = useNetwork();
  const [updateTxn, setUpdateTxn] = useState("");

  const {write: setTag} = useContractWrite({
      addressOrName: GamerTag?.networks[chain?.id]?.address,
      contractInterface: GamerTag?.abi,
      functionName: "claimTag",
      onError(error) {
        onError(error);
      },
      onSuccess(data) {
        onSubmit();
        setUpdateTxn(data.hash);
      }
    }
  );

  // Handle transaction responses
  useWaitForTransaction({
    hash: updateTxn,
    onSuccess() {
      onSuccess();
      setUpdateTxn("");
    }
  })

  return {
    setTag: tag => setTag({args: [tag]})
  }
};
export default useSetTag;