package com.example.demo.domain;

/**
 *
 * @author benoitmarsot
 */
public record Patient(long patientId, long userId, String firstName, String lastName, String address, String city, String usState, String zip, String referral,String email,String password) { }
