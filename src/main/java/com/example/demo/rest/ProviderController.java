package com.example.demo.rest;

import com.example.demo.domain.Assessment;
import com.example.demo.domain.Credential;
import com.example.demo.domain.Patient;
import com.example.demo.domain.Provider;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.repository.RWUserRepository;
import com.example.demo.repository.ProviderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 *
 * @author benoitmarsot
 */
@RestController
@RequestMapping("api/pro")
public class ProviderController {

    @Autowired
    private RWUserRepository rwUserRepository;
    @Autowired
    private ProviderRepository providerRepository;
    
    @GetMapping("/assessment")
    @CrossOrigin //allows the debuggging of Reat on port 5173
    public Assessment assessment(
        @RequestParam(value = "providerid", defaultValue = "1") int providerId,
        @RequestParam(value = "patientid", defaultValue = "1") int patientId
    ) throws Exception {
        Optional<Assessment> assessmentMaybe=providerRepository.getAssessment(providerId, patientId);
        if(assessmentMaybe.isEmpty()) {
            return null;
        }
        return assessmentMaybe.get();
    }
    @PutMapping("/assessment")
    @CrossOrigin //allows the debuggging of vite Reat on port 5173
    public ResponseEntity<Assessment> putAssement(
        @RequestParam(value = "providerid", defaultValue = "1") int providerId,
        @RequestParam(value = "patientid", defaultValue = "1") int patientId,
        @RequestBody Assessment assessment
    ) throws Exception {
        providerRepository.saveAssessment(providerId, patientId, assessment);
        return ResponseEntity.ok(assessment);
    }
    @PostMapping("/register")
    @CrossOrigin //allows the debuggging of vite Reat on port 5173
    public ResponseEntity<Boolean> register(
        @RequestBody Provider provider
    ) throws Exception {
        providerRepository.register(provider);
        return ResponseEntity.ok(true);
    }
    @PostMapping("/signin")
    @CrossOrigin //allows the debuggging of vite Reat on port 5173
    public ResponseEntity<Provider> signin(
        @RequestBody Credential credential
    ) throws Exception {
        Optional<Provider> providerMaybe=providerRepository.signin(credential);
        if(providerMaybe.isEmpty()) {
            return null;
        }
       return ResponseEntity.ok(providerMaybe.get());
    }
    @PostMapping("/registerpatient")
    @CrossOrigin //allows the debuggging of vite Reat on port 5173
    public ResponseEntity<Boolean> registerPatient(
        @RequestParam(value = "providerid", defaultValue = "1") int providerId,
        @RequestBody Patient patient
    ) throws Exception {
        providerRepository.registerPatient(providerId,patient);
        return ResponseEntity.ok(true);
    }
}
