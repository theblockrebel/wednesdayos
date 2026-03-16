package com.wednesdayos.config;

/**
 * WednesdayOS — AgentConfig
 * Immutable configuration object for agent initialization.
 */
public class AgentConfig {

    private final String name;
    private final String model;
    private final String vibe;
    private final int maxTokens;
    private final int maxHistory;
    private final double temperature;

    private AgentConfig(Builder builder) {
        this.name = builder.name;
        this.model = builder.model;
        this.vibe = builder.vibe;
        this.maxTokens = builder.maxTokens;
        this.maxHistory = builder.maxHistory;
        this.temperature = builder.temperature;
    }

    public String getName() { return name; }
    public String getModel() { return model; }
    public String getVibe() { return vibe; }
    public int getMaxTokens() { return maxTokens; }
    public int getMaxHistory() { return maxHistory; }
    public double getTemperature() { return temperature; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String name = "DUDES";
        private String model = "claude-haiku-4-5";
        private String vibe = "wholesome";
        private int maxTokens = 300;
        private int maxHistory = 20;
        private double temperature = 0.85;

        public Builder name(String name) { this.name = name; return this; }
        public Builder model(String model) { this.model = model; return this; }
        public Builder vibe(String vibe) { this.vibe = vibe; return this; }
        public Builder maxTokens(int maxTokens) { this.maxTokens = maxTokens; return this; }
        public Builder maxHistory(int maxHistory) { this.maxHistory = maxHistory; return this; }
        public Builder temperature(double temperature) { this.temperature = temperature; return this; }

        public AgentConfig build() {
            if (name == null || name.isEmpty()) throw new IllegalArgumentException("Agent name required");
            if (temperature < 0 || temperature > 2) throw new IllegalArgumentException("Temperature must be 0–2");
            return new AgentConfig(this);
        }
    }

    @Override
    public String toString() {
        return String.format("AgentConfig{name='%s', model='%s', vibe='%s', maxTokens=%d}",
            name, model, vibe, maxTokens);
    }
}
