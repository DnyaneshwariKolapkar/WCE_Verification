import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SuccessToast = ({message, isNavigate, navigate, path}) => {

  if (isNavigate) {
    toast.success(message, {
      position: "top-center",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      autoClose: 3000,
      onClose: () => {
        navigate(path);
      }
    });
  }
  else {
    toast.success(message, {
      position: "top-center",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      autoClose: 3000
    });
  }
}

export const ErrorToast = ({message}) => {
  toast.error(message, {
    position: "top-center",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    autoClose: 3000
  });     
}

export const WarningToast = ({message}) => {
  toast.warn(message, {
    position: "top-center",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    autoClose: 3000
  });   
}

export const InfoToast = ({message}) => {
  toast.info(message, {
    position: "top-center",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    autoClose: 3000
  });
}

export const DefaultToast = ({message}) => {
  toast(message, {
    position: "top-center",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    autoClose: 3000
  }); 
}

export default { SuccessToast, ErrorToast, WarningToast, InfoToast, DefaultToast };
