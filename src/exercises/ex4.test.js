// ex4.test.js

const fetchData = require('./ex4');

// Mock fetch pour simuler la réponse de l'API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        main: {
          temp: 289 // Simuler une température en Kelvin (par exemple 289K = 16°C)
        }
      })
  })
);

describe('fetchData function', () => {
  it('should fetch data and return temperature in Celsius', async () => {
    const temperature = await fetchData();

    expect(typeof temperature).toBe('number');
    expect(temperature).toBeCloseTo(16, 1); // Vérifier que la température est proche de 16°C
    expect(fetch).toHaveBeenCalledWith(api_url); // Vérifier que fetch a été appelé avec l'URL correcte
  });

  it('should throw an error when response data is missing', async () => {
    // Mock fetch pour simuler une réponse sans jsonData.main.temp
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({})
      })
    );

    await expect(fetchData()).rejects.toThrow('Données de réponse manquantes');
  });

  it('should handle network errors', async () => {
    // Mock fetch pour simuler une erreur de réseau
    global.fetch.mockImplementationOnce(() => Promise.reject(new Error('Network error')));

    await expect(fetchData()).rejects.toThrow('Network error');
  });
});
