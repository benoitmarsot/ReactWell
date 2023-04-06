package com.example.demo.domain;

import java.util.List;

/**
 *
 * @author benoitmarsot
 */
public record Assessment(long assessmentId, long providerId, long patientId, 
        List<AssessmentVersion> assessmentVersions, 
        List<BodyQuestion> bodyQuestions) { 
}
