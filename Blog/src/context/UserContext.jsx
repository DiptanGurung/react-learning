import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserFromToken(token);
    }
  }, []);

  const fetchUserFromToken = async (token) => {
    try {
      const res = await fetch('https://blogsitebackend-topcollec.onrender.com/api/auth', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch user info');
      }

      const data = await res.json();
      setUser(data.user);
    } catch (error) {
      console.error('Auto-login error:', error.message);
      logout();
    }
  };

  const register = async (formData) => {
    try {
      const data = new FormData();
      data.append('username', formData.username);
      data.append('email', formData.email);
      data.append('password', formData.password);
      if (formData.profileImage) {
        data.append('profileImage', formData.profileImage);
      }

      const res = await fetch('https://blogsitebackend-topcollec.onrender.com/api/auth/register', {
        method: 'POST',
        body: data,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      return await res.json();
    } catch (error) {
      console.error('Register error:', error.message);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await fetch('https://blogsitebackend-topcollec.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await res.json();
      setUser(data.user);
      localStorage.setItem('token', data.token);
      return true;
    } catch (error) {
      console.error('Login error:', error.message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const verifyOTP = async (otp) => {
    const res = await fetch('https://blogsitebackend-topcollec.onrender.com/api/auth/verify-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ otp, email: 'diptangurung123@gmail.com' }),
    });

    const contentType = res.headers.get('content-type');

    if (!res.ok) {
      const error = contentType?.includes('application/json')
        ? await res.json()
        : { message: `Error ${res.status}` };

      throw new Error(error.message || 'OTP verification failed');
    }

    return await res.json();
  };

  const resendOTP = async () => {
    const res = await fetch('https://blogsitebackend-topcollec.onrender.com/api/auth/resend-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Resend OTP failed');
    }

    const data = await res.json();
    return data;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        getAuthHeaders,
        verifyOTP,
        resendOTP,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
