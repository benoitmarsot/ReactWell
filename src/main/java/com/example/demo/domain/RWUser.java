package com.example.demo.domain;

/**
 *
 * @author benoitmarsot
 */
public record RWUser(long rwUserId, String rwUserName, String oktaClientId, String email) { }
