/**
 * WednesdayOS — Wednesday Detector
 * Core utility for wednesday proximity detection and power calculation
 */

export const DAYS = ['sunday', 'monday', 'tuesday', 'WEDNESDAY', 'thursday', 'friday', 'saturday'];
export const WEDNESDAY_INDEX = 3;

/**
 * Returns true if today is Wednesday
 */
export function isWednesday(date = new Date()) {
  return date.getDay() === WEDNESDAY_INDEX;
}

/**
 * Returns days until next Wednesday (0 if today is Wednesday)
 */
export function daysUntilWednesday(date = new Date()) {
  const day = date.getDay();
  if (day === WEDNESDAY_INDEX) return 0;
  return ((WEDNESDAY_INDEX - day + 7) % 7);
}

/**
 * Returns a power factor 0.0–1.0 based on wednesday proximity
 * Wednesday = 1.0, adjacent days = 0.7, far days = 0.3
 */
export function wednesdayPowerFactor(date = new Date()) {
  const day = date.getDay();
  if (day === WEDNESDAY_INDEX) return 1.0;
  const distance = Math.min(
    Math.abs(day - WEDNESDAY_INDEX),
    7 - Math.abs(day - WEDNESDAY_INDEX)
  );
  return Math.max(0.1, 1 - distance * 0.2);
}

/**
 * Returns a human-readable wednesday status message
 */
export function wednesdayStatus(date = new Date()) {
  if (isWednesday(date)) {
    return 'IT IS WEDNESDAY MY DUDES — full power mode active';
  }
  const days = daysUntilWednesday(date);
  const day = DAYS[date.getDay()];
  return `it is ${day}. wednesday arrives in ${days} day${days !== 1 ? 's' : ''}.`;
}

/**
 * Returns the current day name
 */
export function currentDay(date = new Date()) {
  return DAYS[date.getDay()];
}

export default {
  isWednesday,
  daysUntilWednesday,
  wednesdayPowerFactor,
  wednesdayStatus,
  currentDay,
  DAYS,
  WEDNESDAY_INDEX
};
