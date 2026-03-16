package com.wednesdayos.agent;

/**
 * WednesdayOS — AgentStats
 * Snapshot of current agent performance metrics.
 */
public class AgentStats {

    private final int messageCount;
    private final int frogCount;
    private final double wednesdayPowerFactor;
    private final long uptimeSeconds;
    private final String state;

    public AgentStats(int messageCount, int frogCount, double wednesdayPowerFactor,
                      long uptimeSeconds, String state) {
        this.messageCount = messageCount;
        this.frogCount = frogCount;
        this.wednesdayPowerFactor = wednesdayPowerFactor;
        this.uptimeSeconds = uptimeSeconds;
        this.state = state;
    }

    public int getMessageCount() { return messageCount; }
    public int getFrogCount() { return frogCount; }
    public double getWednesdayPowerFactor() { return wednesdayPowerFactor; }
    public long getUptimeSeconds() { return uptimeSeconds; }
    public String getState() { return state; }

    public boolean isAtFullPower() { return wednesdayPowerFactor == 1.0; }

    public String formatUptime() {
        long hours = uptimeSeconds / 3600;
        long minutes = (uptimeSeconds % 3600) / 60;
        long seconds = uptimeSeconds % 60;
        return String.format("%02dh %02dm %02ds", hours, minutes, seconds);
    }

    @Override
    public String toString() {
        return String.format(
            "AgentStats{messages=%d, frogs=%d, wedPower=%.2f, uptime=%s, state=%s}",
            messageCount, frogCount, wednesdayPowerFactor, formatUptime(), state
        );
    }
}
