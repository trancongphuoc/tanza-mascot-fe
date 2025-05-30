import api from './axios';

export const doNothing = async (): Promise<void> => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      // log('No token found in session storage.');
      return;
    }

    const response = await api.post(`/api/mascot/do-nothing`, {}, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    // log('do nothing', response.data);

    if (response.data.status === "OK") {
      // Handle success case if needed
    } else {
      // console.error('Unexpected response structure:', response.data);
    }
  } catch (error) {
    // console.error('Error doing nothing:', error);
  }
};


export const sendOTP = async (phoneNumner: string): Promise<any> => {
    try {
      const response = await api.post(`/api/auth/send_otp`, {phone: phoneNumner});
      return response;
    } catch (error) {
      console.error(error);
    }
};

export const verifyOTP = async (phoneNumner: string, otp: string): Promise<any> => {
    try {
      const response = await api.post(`/api/auth/verify_otp`, {phone: phoneNumner, otp: otp});
      return response;
    } catch (error) {
      console.error(error);
    }
};

export const verifySupperApp = async (data: any): Promise<any> => {
  try {
    const response = await api.post(`/api/auth/verify_supper_app`, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};


export const register = async (): Promise<any> => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      // log('No token found in session storage.');
      return;
    }

    const response = await api.post(`/api/mps/register`, {}, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response;
    } catch (error) {
      console.error(error);
    }
};

export const getPaymentRegisterUrl = async (saToken: string): Promise<any> => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      // log('No token found in session storage.');
      return;
    }

    const response = await api.post(`/api/sp_app/get_payment_register_url?saToken=` + saToken, {}, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response;
    } catch (error) {
      console.error(error);
    }
};


export const cancel = async (): Promise<any> => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      // log('No token found in session storage.');
      return;
    }

    const response = await api.post(`/api/mps/cancel`, {}, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response;
    } catch (error) {
      console.error(error);
    }
};

export const cancelSupperApp = async (saToken: string): Promise<any> => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      // log('No token found in session storage.');
      return;
    }

    const response = await api.post(`/api/sp_app/cancel?saToken=` + saToken, {}, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response;
    } catch (error) {
      console.error(error);
    }
};


export const charge = async (): Promise<any> => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      // log('No token found in session storage.');
      return;
    }

    const response = await api.post(`/api/mps/charge`, {}, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response;
    } catch (error) {
      console.error(error);
    }
};

export const getPaymentChargeUrl = async (saToken: string): Promise<any> => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      // log('No token found in session storage.');
      return;
    }

    const response = await api.post(`/api/sp_app/get_payment_charge_url?saToken=` + saToken, {}, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response;
    } catch (error) {
      console.error(error);
    }
};

export const logout = async (): Promise<any> => {
  try {
    const token = localStorage.getItem('token');
    localStorage.clear();
    const response = await api.get(`/api/logout`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    window.location.reload();
    } catch (error) {
      console.error(error);
    }
};


export const topDaily = async (): Promise<any> => {
  try {

    const response = await api.get(`/api/mascot/top-daily`);
    return response;
    } catch (error) {
      console.error(error);
    }
};

export const topMonthly = async (): Promise<any> => {
  try {

    const response = await api.get(`/api/mascot/top-monthly`);
    return response;
    } catch (error) {
      console.error(error);
    }
};
