// backend/src/utils/dateUtils.js

/**
 * Gibt alle Daten im Monat `month` (0‑basiert) für die Wochentage in `daysOfWeek` zurück.
 * daysOfWeek: Array mit JS‑getDay() Werten (0=So,1=Mo,2=Di,...6=Sa)
 */
export function getDatesForMonth(year, month, daysOfWeek) {
    const dates = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      if (daysOfWeek.includes(date.getDay())) {
        dates.push(new Date(date));  // Klonen
      }
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }
  