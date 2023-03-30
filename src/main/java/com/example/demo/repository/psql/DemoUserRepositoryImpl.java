/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.demo.repository.psql;

import com.example.demo.domain.DemoUser;
import com.example.demo.repository.DemoUserRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 *
 * @author benoitmarsot
 */
@Repository
public class DemoUserRepositoryImpl implements DemoUserRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @Override
    public Optional<DemoUser> registerUser(String DemoUserName, String OktaClientId) {
        return null;
    }
    @Override
    public Optional<DemoUser> findByUserName(String demoUserName) {
        String sql="select DemoUserId, DemoUserName, OktaClientId from DemoUser where DemoUserName=?";
        return jdbcTemplate.queryForObject(
            sql,
            new Object[]{demoUserName},
            (rs, rowNum) -> 
                Optional.of(
                    new DemoUser(
                        rs.getInt("DemoUserId"), 
                        rs.getString("DemoUserName"), 
                        rs.getString("OktaClientId")
                    )
                )
        );
    }
    @Override
    public Optional<DemoUser> findByOktaClientId(String DemoUserName, String OktaClientId) {
        return null;
    }
    @Override
    public int countUser() {
        return jdbcTemplate.queryForObject("select count(1) from DemoUser", Integer.class);
    }

}
