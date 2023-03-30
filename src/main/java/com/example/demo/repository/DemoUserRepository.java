/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.demo.repository;

import com.example.demo.domain.DemoUser;
import java.util.Optional;

/**
 *
 * @author benoitmarsot
 */
public interface DemoUserRepository {
    Optional<DemoUser> registerUser(String DemoUserName, String OktaClientId);
    Optional<DemoUser> findByUserName(String demoUserName);
    Optional<DemoUser> findByOktaClientId(String DemoUserName, String OktaClientId);
    int countUser();
}
