package com.wednesdayos.models;

import java.time.Instant;
import java.time.Duration;

/**
 * WednesdayOS — Session
 * Tracks a single agent session with token usage and cost estimation.
 */
public class Session {

    private final String id;
    private Instant startTime;
    private Instant endTime;
    private boolean active;
    private int inputTokens;
    private int outputTokens;
    private int messageCount;

    // claude-haiku-4-5 pricing per million tokens
    private static final double INPUT_COST_PER_M  = 0.25;
    private static final double OUTPUT_COST_PER_M = 1.25;

    public Session(String id) {
        this.id = id;
        this.active = false;
        this.inputTokens = 0;
        this.outputTokens = 0;
        this.messageCount = 0;
    }

    public void start() {
        this.startTime = Instant.now();
        this.active = true;
    }

    public void end() {
        this.endTime = Instant.now();
        this.active = false;
    }

    public void recordUsage(int inputTokens, int outputTokens) {
        this.inputTokens += inputTokens;
        this.outputTokens += outputTokens;
        this.messageCount++;
    }

    public double getEstimatedCost() {
        double inputCost  = (inputTokens  / 1_000_000.0) * INPUT_COST_PER_M;
        double outputCost = (outputTokens / 1_000_000.0) * OUTPUT_COST_PER_M;
        return inputCost + outputCost;
    }

    public long getDurationSeconds() {
        if (startTime == null) return 0;
        Instant end = endTime != null ? endTime : Instant.now();
        return Duration.between(startTime, end).getSeconds();
    }

    public String getId() { return id; }
    public boolean isActive() { return active; }
    public int getInputTokens() { return inputTokens; }
    public int getOutputTokens() { return outputTokens; }
    public int getMessageCount() { return messageCount; }

    @Override
    public String toString() {
        return String.format("Session{id='%s', active=%b, messages=%d, cost=$%.6f}",
            id, active, messageCount, getEstimatedCost());
    }
}
