import toast from "react-hot-toast";

export const toastSuccess = (content) => {
  toast.success(content, {
    style: {
      padding: "12px",
      borderRadius: "8px",
    },
    iconTheme: {
      primary: "cyan",
      secondary: "grey-2",
    },
  });
};

export const toastError = (e, message = false) => {
  if(message) {
    toast.error(
      `${e}`
    );
    return;
  }

  toast.error(
    `${e.message.length <= 10 ? e.message : "Error occurred while reseting"}`
  );
};
