package com.wednesdayos.terminal;

import com.wednesdayos.utils.WednesdayDetector;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;

/**
 * WednesdayOS — CommandHandler
 * Parses and executes slash commands from terminal input.
 */
public class CommandHandler {

    private final Map<String, Command> commands;
    private final List<String> history;
    private final Map<String, String> aliases;

    public CommandHandler() {
        this.commands = new HashMap<>();
        this.history = new ArrayList<>();
        this.aliases = new HashMap<>();
        registerDefaults();
        registerAliases();
    }

    private void registerDefaults() {
        register("/help",      "list all commands",             this::handleHelp);
        register("/status",    "session and agent status",      this::handleStatus);
        register("/wednesday", "wednesday proximity report",    this::handleWednesday);
        register("/frog",      "summon ascii frog",             this::handleFrog);
        register("/vibe",      "current vibe report",           this::handleVibe);
        register("/reset",     "wipe memory and restart",       this::handleReset);
        register("/usage",     "token usage and cost",          this::handleUsage);
    }

    private void registerAliases() {
        aliases.put("/h", "/help");
        aliases.put("/s", "/status");
        aliases.put("/w", "/wednesday");
        aliases.put("/f", "/frog");
        aliases.put("/r", "/reset");
    }

    private void register(String name, String description, CommandExecutor executor) {
        commands.put(name, new Command(name, description, executor));
    }

    public String execute(String input) {
        if (!input.startsWith("/")) return null;
        String[] parts = input.trim().split("\\s+");
        String cmd = aliases.getOrDefault(parts[0].toLowerCase(), parts[0].toLowerCase());
        history.add(cmd);
        Command command = commands.get(cmd);
        if (command == null) return "unknown command: " + cmd + ". try /help";
        return command.execute(parts);
    }

    public boolean isCommand(String input) {
        return input != null && input.trim().startsWith("/");
    }

    private String handleHelp(String[] args) {
        StringBuilder sb = new StringBuilder("available commands:\n");
        commands.forEach((k, v) -> sb.append("  ").append(k).append(" — ").append(v.description).append("\n"));
        return sb.toString().trim();
    }

    private String handleWednesday(String[] args) {
        return WednesdayDetector.getStatus();
    }

    private String handleFrog(String[] args) {
        return "ribbit. it is " + WednesdayDetector.getCurrentDay() + ", my dudes.";
    }

    private String handleStatus(String[] args) {
        return "status: ready | day: " + WednesdayDetector.getCurrentDay() + " | power: " + WednesdayDetector.getPowerFactor();
    }

    private String handleVibe(String[] args) {
        return "vibe: active | wednesday factor: " + WednesdayDetector.getPowerFactor();
    }

    private String handleReset(String[] args) {
        history.clear();
        return "memory wiped. " + WednesdayDetector.getStatus();
    }

    private String handleUsage(String[] args) {
        return "usage tracking enabled. see session stats for details.";
    }

    @FunctionalInterface
    interface CommandExecutor { String execute(String[] args); }

    static class Command {
        final String name, description;
        final CommandExecutor executor;
        Command(String name, String description, CommandExecutor executor) {
            this.name = name; this.description = description; this.executor = executor;
        }
        String execute(String[] args) { return executor.execute(args); }
    }
}
