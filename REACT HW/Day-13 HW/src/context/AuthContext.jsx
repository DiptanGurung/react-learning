import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const ADMIN_EMAIL = "admin@gmail.com";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      if (savedUser.email === ADMIN_EMAIL) {
        savedUser.isAdmin = true; 
      }
      setUser(savedUser);
    }
  }, []);

  const login = (email, password) => {
    if (email === ADMIN_EMAIL && password === "admin123") {
      const adminUser = { email: ADMIN_EMAIL, role: "admin", isAdmin: true };
      setUser(adminUser);
      localStorage.setItem("user", JSON.stringify(adminUser));
      return true;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((u) => u.email === email && u.password === password);
    if (existingUser) {
      setUser(existingUser);
      localStorage.setItem("user", JSON.stringify(existingUser));
      return true;
    }
    return false;
  };

  const register = (email, password) => {
    if (email === ADMIN_EMAIL) return false;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.email === email)) return false;

    const newUser = { email, password };
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
