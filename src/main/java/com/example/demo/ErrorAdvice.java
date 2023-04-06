package com.example.demo;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 *
 * @author benoitmarsot
 */
//@ControllerAdvice
class ErrorAdvice {

  @ResponseBody
  @ExceptionHandler(Exception.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  String ExceptionHandler(Exception ex) {
    Map<String,Object> errorMap=new HashMap<>();
    errorMap.put("Error", ex.getMessage());
    errorMap.put("trace", ex.getStackTrace());
    ObjectMapper mapper=new ObjectMapper();
    try {
        String jsonError=mapper.writeValueAsString(errorMap);
        return jsonError;
    } catch( JsonProcessingException jsonex) {
        return "{'Error':'Cannot process error'}";
    }
  }
}