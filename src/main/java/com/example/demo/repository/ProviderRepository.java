/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.demo.repository;

import com.example.demo.domain.Assessment;
import com.example.demo.domain.Credential;
import com.example.demo.domain.Patient;
import com.example.demo.domain.Provider;
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
     * @throws com.fasterxml.jackson.core.JsonProcessingException
     */
    Optional<Assessment> getAssessment(int providerId, int patientId) throws JsonProcessingException;

    /**
     *
     * @param providerId
     * @param patientId
     * @param assessment
     * @return
     * @throws com.fasterxml.jackson.core.JsonProcessingException
     */
    int saveAssessment(int providerId, int patientId, Assessment assessment) throws JsonProcessingException;

    /**
     *
     * @param provider
     * @return 
     * @throws com.fasterxml.jackson.core.JsonProcessingException
     */
    int register(Provider provider) throws JsonProcessingException;
    Optional<Provider> signin(Credential credential) throws JsonProcessingException;
    int registerPatient(int providerId, Patient patient) throws JsonProcessingException;
}
