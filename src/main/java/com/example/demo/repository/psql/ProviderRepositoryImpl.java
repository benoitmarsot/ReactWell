/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.demo.repository.psql;

import com.example.demo.domain.Assessment;
import com.example.demo.domain.Credential;
import com.example.demo.domain.Patient;
import com.example.demo.domain.Provider;
import com.example.demo.domain.RWUser;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import com.example.demo.repository.ProviderRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author benoitmarsot
 */
@Repository
public class ProviderRepositoryImpl implements ProviderRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Optional<Assessment> getAssessment(int providerId, int patientId) throws JsonProcessingException {
        String sql="select public.getassessment(?,?);";
        String jsonAssessment=jdbcTemplate.queryForObject(
                sql, new Object[]{providerId,patientId}, String.class
            );
        if(jsonAssessment==null) {
            return Optional.empty();
        }
        ObjectMapper objectMapper = new ObjectMapper(); //.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);;
        Assessment assessment=objectMapper.readValue(jsonAssessment, Assessment.class);
        return Optional.of(assessment);
    }

    @Override
    public int saveAssessment(int providerId, int patientId, Assessment assessment) throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
        String jsonAssessment=mapper.writeValueAsString(assessment);
        String sql="call public.saveassessment(?,?,?::json)";
        int assesVersionId=jdbcTemplate.queryForObject(sql, 
            new Object[] {providerId,patientId,jsonAssessment},
            Integer.class
        );
        return assesVersionId;
    }

    @Override
    public int register(Provider provider) throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
        String jsonAssessment=mapper.writeValueAsString(provider);
        String sql="call public.registerprovider(?::json)";
        int providerId=jdbcTemplate.queryForObject(sql, 
            new Object[] {jsonAssessment},
            Integer.class
        );
        return providerId;
    }

    @Override
    public int registerPatient(int providerId, Patient patient) throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
        String jsonPatient=mapper.writeValueAsString(patient);
        String sql="call public.registerpatient(?,?::json)";
        int patientId=jdbcTemplate.queryForObject(sql, 
            new Object[] {providerId,jsonPatient}, Integer.class
        );
        return patientId;
    }

    @Override
    public Optional<Provider> signin(Credential credential) throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
        String json=mapper.writeValueAsString(credential);

        String sql="select public.providersignin(?::json);";
        String jsonProvider=jdbcTemplate.queryForObject(
                sql, new Object[]{json}, String.class
            );
        if(jsonProvider==null) {
            return Optional.empty();
        }
        ObjectMapper objectMapper = new ObjectMapper(); //.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);;
        Provider provider=objectMapper.readValue(jsonProvider, Provider.class);
        return Optional.of(provider);
    }
    @Override
    public int updateProvider(Provider provider) throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
        String json=mapper.writeValueAsString(provider);
        String sql="call public.updateprovider(?::json)";
        int providerId=jdbcTemplate.queryForObject(sql, 
            new Object[] {json},
            Integer.class
        );
        return providerId;
    }

}
