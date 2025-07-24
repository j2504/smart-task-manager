//commponents/ToastContainerWrapper.tsx
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

/**
* ToastContainerWrapper renders a single shared ToastContainer instance.
*/
export const ToastContainerWrapper = () => {
    return <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
}