import { toast, ToastOptions } from 'react-toastify';

const defaultConfig: ToastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
};

export const notify = {
    success: (message: string, config?: ToastOptions) => {
        toast.success(message, {
            ...defaultConfig,
            ...config,
        });
    },

    error: (message: string, config?: ToastOptions) => {
        toast.error(message, {
            ...defaultConfig,
            ...config,
        });
    },

    warning: (message: string, config?: ToastOptions) => {
        toast.warning(message, {
            ...defaultConfig,
            ...config,
        });
    },

    info: (message: string, config?: ToastOptions) => {
        toast.info(message, {
            ...defaultConfig,
            ...config,
        });
    },

    // Thông báo lỗi chung
    errorMessage: (error: any) => {
        let message = "Có lỗi xảy ra";

        if (typeof error === 'string') {
            message = error;
        } else if (error?.response?.data?.message) {
            message = error.response.data.message;
        } else if (error?.message) {
            message = error.message;
        }

        toast.error(message, defaultConfig);
    },
}; 