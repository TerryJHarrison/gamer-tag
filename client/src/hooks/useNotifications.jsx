import {useSnackbar} from "notistack";

/**
 * Hooks to support uniform notifications via Notistack
 * @returns {{
 *  notifyError: function(string),
 *  notify: function(string),
 *  notifySuccess: function(string)
 * }}
 */
export const useNotifications = () => {
  const {enqueueSnackbar} = useSnackbar();
  const anchorOrigin = {
    horizontal: "right",
      vertical: "bottom"
  }

  const notifySuccess = message => {
    enqueueSnackbar(message, {
      variant: "success",
      anchorOrigin
    });
  }

  const notifyError = message => {
    enqueueSnackbar(message, {
      variant: "error",
      anchorOrigin
    });
  }

  const notify = message => {
    enqueueSnackbar(message, {
      variant: "info",
      anchorOrigin
    });
  }

  return {
    notify,
    notifySuccess,
    notifyError
  }
};
export default useNotifications;