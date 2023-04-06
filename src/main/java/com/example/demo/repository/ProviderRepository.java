/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.demo.repository;

import com.example.demo.domain.Assessment;
import com.example.demo.domain.Patient;
import com.example.demo.domain.Provider;
import com.example.demo.domain.RWUser;
import com.fasterxml.jackson.core.JsonProcessingException;
import java.util.Optional;

/**
 *
 * @author benoitmarsot
 */
public interface ProviderRepository {

    /**
     *
     * @param providerId
     * @param patientId
     * @return
     */
    Optional<Assessment> getAssessment(int providerId, int patientId) throws JsonProcessingException;
    boolean saveAssessment(int providerId, int patientId, Assessment assessment) throws JsonProcessingException;

    public void register(Provider provider) throws JsonProcessingException;
    public void registerPatient(int providerId, Patient patient) throws JsonProcessingException;
}
