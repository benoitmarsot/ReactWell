/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.demo.repository.psql;

import com.example.demo.domain.Patient;
import com.example.demo.repository.PatientRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 *
 * @author benoitmarsot
 */
@Repository
public class PatientRepositoryImpl implements PatientRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     *
     * @param patientId
     * @return
     * @throws JsonProcessingException
     */
    @Override
    public Optional<Patient> getPatient(int patientId) throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();

        String sql="select public.getpatient(?);";
        String json=jdbcTemplate.queryForObject(
                sql, new Object[]{patientId}, String.class
            );
        if(json==null) {
            return Optional.empty();
        }
        ObjectMapper objectMapper = new ObjectMapper(); //.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);;
        Patient patient=objectMapper.readValue(json, Patient.class);
        return Optional.of(patient);
    }
    
    @Override
    public int updatePatient(int patientId, Patient patient) throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
        String json=mapper.writeValueAsString(patient);
        String sql="call public.updatepatient(?::json,?)";
        int uPatientId=jdbcTemplate.queryForObject(sql, 
            new Object[] {json,patientId},
            Integer.class
        );
        return uPatientId;
    }

}
