/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.demo.repository.psql;

import com.example.demo.domain.RWUser;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import com.example.demo.repository.RWUserRepository;

/**
 *
 * @author benoitmarsot
 */
@Repository
public class DemoUserRepositoryImpl implements RWUserRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @Override
    public Optional<RWUser> registerUser(String DemoUserName, String OktaClientId) {
        return null;
    }
    @Override
    public Optional<RWUser> findByUserName(String userName) {
        String sql="select rwuserid, rwusername, oktaclientid from rwuser where rwusername=?";
        return jdbcTemplate.queryForObject(sql,
            new Object[]{userName},
            (rs, rowNum) -> 
                Optional.of(new RWUser(
                        rs.getInt("rwuserid"), 
                        rs.getString("rwusername"), 
                        rs.getString("oktaclientid"),
                        rs.getString("email")
                    )
                )
        );
    }
    @Override
    public Optional<RWUser> findByOktaClientId(String DemoUserName, String OktaClientId) {
        return null;
    }
    @Override
    public int countUser() {
        return jdbcTemplate.queryForObject("select count(1) from rwuser", Integer.class);
    }

}
