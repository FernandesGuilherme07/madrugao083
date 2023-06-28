export function formatMinutesToHours(minutes: number) {
    if (minutes < 60) {
      return `${minutes.toFixed()} minutos`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes.toFixed()}min`;
    }
  }
  