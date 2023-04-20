package com.example.demo.rest;

import com.example.demo.domain.Patient;
import com.example.demo.repository.PatientRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author benoitmarsot
 */
@RestController
@CrossOrigin(origins = "http://localhost:5173") //allows the debuggging of vite Reat on port 5173
@RequestMapping("api/patient")
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;
    
    @GetMapping("/getpatient")
    public ResponseEntity<Patient> getPatient(
        @RequestParam(value = "patientid", required = true) int patientId
    ) throws Exception {
        Optional<Patient> patientMaybe=patientRepository.getPatient(patientId);
        if(patientMaybe.isEmpty()) {
            return null;
        }
       return ResponseEntity.ok(patientMaybe.get());
    }
    @PostMapping("/updatepatient")
    public ResponseEntity<Integer> updatePatient(
        @RequestParam(value = "patientid", required = true) int patientId,
        @RequestBody Patient patient
    ) throws Exception {
        int uPatientId=patientRepository.updatePatient(patientId,patient);
        return ResponseEntity.ok(uPatientId);
    }
}
