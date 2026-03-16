package com.wednesdayos.utils;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

/**
 * WednesdayOS — WednesdayDetector
 * Core utility for wednesday proximity detection and power calculation.
 */
public class WednesdayDetector {

    public static final String[] DAY_NAMES = {
        "monday", "tuesday", "WEDNESDAY", "thursday", "friday", "saturday", "sunday"
    };

    private WednesdayDetector() {}

    /**
     * Returns true if today is Wednesday.
     */
    public static boolean isWednesday() {
        return LocalDate.now().getDayOfWeek() == DayOfWeek.WEDNESDAY;
    }

    /**
     * Returns days until next Wednesday (0 if today is Wednesday).
     */
    public static long daysUntilWednesday() {
        LocalDate today = LocalDate.now();
        LocalDate nextWed = today.with(java.time.temporal.TemporalAdjusters.nextOrSame(DayOfWeek.WEDNESDAY));
        return ChronoUnit.DAYS.between(today, nextWed);
    }

    /**
     * Returns a power factor 0.0–1.0 based on wednesday proximity.
     * Wednesday = 1.0, adjacent days decrease proportionally.
     */
    public static double getPowerFactor() {
        if (isWednesday()) return 1.0;
        long days = daysUntilWednesday();
        long daysFromLastWed = 7 - days;
        long distance = Math.min(days, daysFromLastWed);
        return Math.max(0.1, 1.0 - distance * 0.2);
    }

    /**
     * Returns a human-readable wednesday status string.
     */
    public static String getStatus() {
        if (isWednesday()) {
            return "IT IS WEDNESDAY MY DUDES — full power mode active";
        }
        long days = daysUntilWednesday();
        String dayName = LocalDate.now().getDayOfWeek().name().toLowerCase();
        return String.format("it is %s. wednesday arrives in %d day%s.",
            dayName, days, days != 1 ? "s" : "");
    }

    /**
     * Returns the current day name.
     */
    public static String getCurrentDay() {
        DayOfWeek day = LocalDate.now().getDayOfWeek();
        return day == DayOfWeek.WEDNESDAY ? "WEDNESDAY" : day.name().toLowerCase();
    }
}
