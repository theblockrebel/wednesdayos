package com.wednesdayos.agent;

import java.util.HashMap;
import java.util.Map;

/**
 * WednesdayOS — VibeController
 * Manages personality modes and dynamic prompt calibration.
 */
public class VibeController {

    public enum Vibe {
        WHOLESOME, UNHINGED, ZEN, HYPE
    }

    private static final Map<Vibe, VibeConfig> VIBE_CONFIGS = new HashMap<>();

    static {
        VIBE_CONFIGS.put(Vibe.WHOLESOME, new VibeConfig(
            0.8, 0.9, "warm, enthusiastic, wednesday-loving", 1.2
        ));
        VIBE_CONFIGS.put(Vibe.UNHINGED, new VibeConfig(
            1.1, 0.95, "chaotic, fragmented, frog-brained", 2.0
        ));
        VIBE_CONFIGS.put(Vibe.ZEN, new VibeConfig(
            0.6, 0.85, "calm, reflective, wednesday as middle path", 1.0
        ));
        VIBE_CONFIGS.put(Vibe.HYPE, new VibeConfig(
            1.2, 1.0, "maximum energy, wednesday supremacist", 3.0
        ));
    }

    private Vibe currentVibe;
    private double wedFactor;

    public VibeController(Vibe vibe) {
        this.currentVibe = vibe;
        this.wedFactor = 1.0;
    }

    public void calibrate(double wedFactor) {
        this.wedFactor = Math.max(0.1, Math.min(1.0, wedFactor));
    }

    public static String getPrompt(String vibe, double wedFactor) {
        Vibe v = Vibe.valueOf(vibe.toUpperCase());
        VibeConfig cfg = VIBE_CONFIGS.get(v);
        boolean isWednesday = wedFactor == 1.0;
        return String.format("You are DUDES, a %s agent. %s No markdown. Max 3 sentences.",
            cfg.descriptor,
            isWednesday ? "IT IS WEDNESDAY. Full power." : "Wednesday is coming."
        );
    }

    public VibeConfig getCurrentConfig() {
        return VIBE_CONFIGS.get(currentVibe);
    }

    public void setVibe(Vibe vibe) {
        this.currentVibe = vibe;
    }

    public Vibe getCurrentVibe() {
        return currentVibe;
    }

    public static class VibeConfig {
        public final double temperature;
        public final double topP;
        public final String descriptor;
        public final double wednesdayMultiplier;

        public VibeConfig(double temperature, double topP, String descriptor, double wednesdayMultiplier) {
            this.temperature = temperature;
            this.topP = topP;
            this.descriptor = descriptor;
            this.wednesdayMultiplier = wednesdayMultiplier;
        }
    }
}
