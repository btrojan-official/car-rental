export const fetchCars = async (filters) => {
    // Fetch cars based on filters from backend (you can connect to a real API here)
    try {
      const response = await fetch('http://localhost:3000/cars', { // Dodaj http:// przed localhost
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching cars:", error);
      throw error;
    }
  };
// Ta funkcja jest odpowiedzialna za autentykację użytkownika
export const authenticateUser = async ({ email, password }) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      return data.user || null;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };
// Funkcja pobiera dane o samochodzie na podstawie jego id
export const fetchCarById = async (id) => {
    try {
      const response = await fetch(`/api/cars/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching car data:", error);
      throw error;
    }
  };
  
  // Funkcja do składania rezerwacji
  export const makeReservation = async (reservationDetails) => {
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationDetails),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error making reservation:", error);
      throw error;
    }
  };
  