import { createContext, useState } from "react";

export const AddressContext = createContext();

export function AddressProvider({ children }) {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const addAddress = (address) => {
    setAddresses((prev) => [...prev, { ...address, id: Date.now() }]);
  };

  const removeAddress = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));

    // If deleted address was selected → reset
    if (selectedAddress?.id === id) {
      setSelectedAddress(null);
    }
  };

  const updateAddress = (id, updatedData) => {
    setAddresses((prev) =>
      prev.map((addr) => (addr.id === id ? { ...addr, ...updatedData } : addr)),
    );

    // If edited address is selected → update it too
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
