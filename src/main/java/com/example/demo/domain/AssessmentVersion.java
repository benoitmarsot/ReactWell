package com.example.demo.domain;

import java.util.Date;

/**
 *
 * @author benoitmarsot
 */
public record AssessmentVersion(long assessmentVersionId, String note, Date serviceDate) { }
