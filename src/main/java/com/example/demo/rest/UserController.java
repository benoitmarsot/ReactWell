package com.example.demo.rest;

import com.example.demo.domain.RWUser;
import com.example.demo.domain.Greeting;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.repository.RWUserRepository;

/**
 *
 * @author benoitmarsot
 */
@RestController
@RequestMapping("api/user")
public class UserController {
    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @Autowired
    private RWUserRepository rwUserRepository;
    
    @GetMapping("/greeting")
    public Greeting greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
            return new Greeting(counter.incrementAndGet(), String.format(template, name));
    }
    
    @GetMapping("/count")
    public int count() {
        return rwUserRepository.countUser();
    }

    @GetMapping("/findusernamed")
    public RWUser findUserNamed(@RequestParam(value = "name") String name) throws Exception {
        Optional<RWUser> demoUserMaybe=rwUserRepository.findByUserName(name);
        if(demoUserMaybe.isEmpty()) {
            throw new Exception("No user existing with userName: "+name);
        }
        return demoUserMaybe.get();
    }
}
