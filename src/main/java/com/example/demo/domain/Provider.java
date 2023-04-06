package com.example.demo.domain;

import java.util.List;

/**
 *
 * @author benoitmarsot
 */
public record Provider(long providerId, long userId, List<Patient> patients, 
        String firstName, String lastName, String company, String address, 
        String city, String usState, String zip, String email, String password
) { }
