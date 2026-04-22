import { createContext, useState, useEffect } from "react";

export const AddressContext = createContext();

export function AddressProvider({ children }) {
  const [addresses, setAddresses] = useState(() => {
    const stored = localStorage.getItem("addresses");
    return stored ? JSON.parse(stored) : [];
  });

  const [selectedAddress, setSelectedAddress] = useState(() => {
    const stored = localStorage.getItem("selectedAddress");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
  }, [selectedAddress]);

  const addAddress = (address) => {
    setAddresses((prev) => [...prev, { ...address, id: Date.now() }]);
  };

  const removeAddress = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));

    if (selectedAddress?.id === id) {
      setSelectedAddress(null);
    }
  };

  const updateAddress = (id, updatedData) => {
    setAddresses((prev) =>
      prev.map((addr) => (addr.id === id ? { ...addr, ...updatedData } : addr)),
    );

    if (selectedAddress?.id === id) {
      setSelectedAddress((prev) => ({
        ...prev,
        ...updatedData,
      }));
    }
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        addAddress,
        removeAddress,
        updateAddress,
        selectedAddress,
        setSelectedAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}
