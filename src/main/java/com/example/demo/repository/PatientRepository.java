/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.demo.repository;

import com.example.demo.domain.Patient;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.Optional;

/**
 *
 * @author benoitmarsot
 */
public interface PatientRepository {
    int updatePatient(int patientId, Patient patient) throws JsonProcessingException;
    Optional<Patient> getPatient(int patientId) throws JsonProcessingException;
}
