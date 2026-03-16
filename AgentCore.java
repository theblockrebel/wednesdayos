package com.wednesdayos.agent;

import com.wednesdayos.models.Message;
import com.wednesdayos.models.Session;
import com.wednesdayos.utils.WednesdayDetector;
import com.wednesdayos.config.AgentConfig;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * WednesdayOS — AgentCore
 * Core agent engine managing lifecycle, memory, and session orchestration.
 */
public class AgentCore {

    private final AgentConfig config;
    private final List<Message> memory;
    private final Session session;
    private AgentState state;
    private int messageCount;
    private int frogCount;

    public enum AgentState {
        IDLE, READY, PROCESSING, DESTROYED
    }

    public AgentCore(AgentConfig config) {
        this.config = config;
        this.memory = new ArrayList<>();
        this.session = new Session(UUID.randomUUID().toString());
        this.state = AgentState.IDLE;
        this.messageCount = 0;
        this.frogCount = 0;
    }

    public void initialize() {
        if (this.state != AgentState.IDLE) {
            throw new IllegalStateException("Agent already initialized");
        }
        this.session.start();
        this.state = AgentState.READY;
        System.out.println("[WednesdayOS] Agent " + config.getName() + " initialized. Session: " + session.getId());
    }

    public String process(String input) {
        if (this.state != AgentState.READY) {
            throw new IllegalStateException("Agent not ready. Current state: " + state);
        }
        this.state = AgentState.PROCESSING;
        try {
            memory.add(new Message("user", input));
            String response = buildResponse(input);
            memory.add(new Message("assistant", response));
            messageCount++;
            return response;
        } finally {
            this.state = AgentState.READY;
        }
    }

    private String buildResponse(String input) {
        double wedFactor = WednesdayDetector.getPowerFactor();
        String vibePrompt = VibeController.getPrompt(config.getVibe(), wedFactor);
        // In production, delegates to API layer
        return "[" + config.getName() + "] " + vibePrompt;
    }

    public void reset() {
        memory.clear();
        messageCount = 0;
    }

    public void destroy() {
        session.end();
        memory.clear();
        state = AgentState.DESTROYED;
    }

    public AgentStats getStats() {
        return new AgentStats(
            messageCount,
            frogCount,
            WednesdayDetector.getPowerFactor(),
            session.getDurationSeconds(),
            state.name()
        );
    }

    public List<Message> getRecentMemory(int n) {
        int from = Math.max(0, memory.size() - n);
        return memory.subList(from, memory.size());
    }

    public AgentState getState() { return state; }
    public AgentConfig getConfig() { return config; }
    public Session getSession() { return session; }
}
