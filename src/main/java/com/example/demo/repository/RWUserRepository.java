/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.example.demo.repository;

import com.example.demo.domain.RWUser;
import java.util.Optional;

/**
 *
 * @author benoitmarsot
 */
public interface RWUserRepository {
    Optional<RWUser> registerUser(String DemoUserName, String OktaClientId);
    Optional<RWUser> findByUserName(String demoUserName);
    Optional<RWUser> findByOktaClientId(String DemoUserName, String OktaClientId);
    int countUser();
}
