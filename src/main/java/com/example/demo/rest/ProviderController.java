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
@CrossOrigin(origins = "http://localhost:5173") //allows the debuggging of vite Reat on port 5173
@RequestMapping("api/pro")
public class ProviderController {

    @Autowired
    private RWUserRepository rwUserRepository;
    @Autowired
    private ProviderRepository providerRepository;
    
    @GetMapping("/assessment")
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
    public ResponseEntity<Integer> putAssement(
        @RequestParam(value = "providerid", defaultValue = "1") int providerId,
        @RequestParam(value = "patientid", defaultValue = "1") int patientId,
        @RequestBody Assessment assessment
    ) throws Exception {
        int assesmentVersionId=providerRepository.saveAssessment(providerId, patientId, assessment);
        return ResponseEntity.ok(assesmentVersionId);
    }
    @PostMapping("/register")
    public ResponseEntity<Integer> register(
        @RequestBody Provider provider
    ) throws Exception {
        int providerId=providerRepository.register(provider);
        return ResponseEntity.ok(providerId);
    }
    @PostMapping("/signin")
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
    public ResponseEntity<Integer> registerPatient(
        @RequestParam(value = "providerid", defaultValue = "1") int providerId,
        @RequestBody Patient patient
    ) throws Exception {
        int newPatientId=providerRepository.registerPatient(providerId,patient);
        return ResponseEntity.ok(newPatientId);
    }
    @PostMapping("/updateprovider")
    public ResponseEntity<Integer> updateprovider(
        @RequestBody Provider provider
    ) throws Exception {
        int providerId=providerRepository.updateProvider(provider);
        return ResponseEntity.ok(providerId);
    }
}
