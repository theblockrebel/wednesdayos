package com.wednesdayos.models;

import java.time.Instant;

/**
 * WednesdayOS — Message
 * Represents a single message in the agent conversation history.
 */
public class Message {

    private final String role;
    private final String content;
    private final Instant timestamp;
    private final String id;

    public Message(String role, String content) {
        this.role = role;
        this.content = content;
        this.timestamp = Instant.now();
        this.id = generateId();
    }

    private String generateId() {
        return "msg_" + Long.toHexString(System.currentTimeMillis())
            + Integer.toHexString((int)(Math.random() * 0xFFFF));
    }

    public String getRole() { return role; }
    public String getContent() { return content; }
    public Instant getTimestamp() { return timestamp; }
    public String getId() { return id; }

    public boolean isFromUser() { return "user".equals(role); }
    public boolean isFromAgent() { return "assistant".equals(role); }

    @Override
    public String toString() {
        return String.format("Message{role='%s', content='%s...', id='%s'}",
            role, content.substring(0, Math.min(30, content.length())), id);
    }
}
