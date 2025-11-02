import React, { useEffect, useState } from "react";
import DriverSelection from "../Components/DriverSelection";
import DriverDetailsView from "../Components/DriverDetailsView";
import BookingFormView from "../Components/BookingFormView";
import BookingSuccess from "../Components/BookingSuccess";
import { fetchDrivers, fetchDriverRides, placeDeliveryOrder } from "../api/deliveryApi";

const Chat = () => {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [rides, setRides] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRides, setIsLoadingRides] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const loadDrivers = async () => {
      const data = await fetchDrivers();
      setDrivers(data);
      setIsLoading(false);
    };
    loadDrivers();
  }, []);

  const handleSelectDriver = async (driver) => {
    setSelectedDriver(driver);
    setIsLoadingRides(true);
    const data = await fetchDriverRides(driver.id);
    setRides(data);
    setIsLoadingRides(false);
  };

  const handleSelectRide = (ride) => {
    setSelectedRide(ride);
  };

  const handleBookRide = async (details) => {
    setIsPlacingOrder(true);
    const response = await placeDeliveryOrder(details);
    setIsPlacingOrder(false);
    if (response.success) setBookingSuccess(true);
  };

  const handleBackToHome = () => {
    setBookingSuccess(false);
    setSelectedRide(null);
    setSelectedDriver(null);
  };

  if (bookingSuccess) return <BookingSuccess onBackToHome={handleBackToHome} />;
  if (selectedRide)
    return (
      <BookingFormView
        selectedRide={selectedRide}
        onBookRide={handleBookRide}
        isPlacingOrder={isPlacingOrder}
      />
    );
  if (selectedDriver)
    return (
      <DriverDetailsView
        driver={selectedDriver}
        rides={rides}
        isLoadingRides={isLoadingRides}
        onSelectRide={handleSelectRide}
      />
    );
  return <DriverSelection drivers={drivers} isLoading={isLoading} onSelectDriver={handleSelectDriver} />;
};

export default Chat;
