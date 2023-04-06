package com.example.demo.domain;
import java.util.List;

/**
 *
 * @author benoitmarsot
 */
public record BodyQuestion (long bodyQuestionId, float x, float y, List<BodyQuestionText> versionTexts ) { }
