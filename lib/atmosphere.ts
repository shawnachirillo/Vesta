

export const atmospheres = {
    sunrise: {
      background: "/images/vesta-sunrise.webp",
      accent: "#F5BD7A",
      glassOpacity: 0.18,
      blur: 24,
      brightness: 1.05,
      saturation: 1.1,
      animationSpeed: 0.8,
    },
  
    day: {
      background: "/images/vesta-day.webp",
      accent: "#7DD3FC",
      glassOpacity: 0.12,
      blur: 18,
      brightness: 1.0,
      saturation: 1.0,
      animationSpeed: 0.4,
    },
  
    sunset: {
      background: "/images/vesta-sunset.webp",
      accent: "#F6B26B",
      glassOpacity: 0.22,
      blur: 28,
      brightness: 0.95,
      saturation: 1.2,
      animationSpeed: 0.6,
    },
  
    night: {
      background: "/images/vesta-night.webp",
      accent: "#9D9EFF",
      glassOpacity: 0.26,
      blur: 30,
      brightness: 0.82,
      saturation: 0.9,
      animationSpeed: 0.25,
    },
  };
  export function getAtmosphere() {
    const hour = new Date().getHours();
  
    if (hour >= 5 && hour < 10)
      return atmospheres.sunrise;
  
    if (hour >= 10 && hour < 17)
      return atmospheres.day;
  
    if (hour >= 17 && hour < 20)
      return atmospheres.sunset;
  
    return atmospheres.night;
  }