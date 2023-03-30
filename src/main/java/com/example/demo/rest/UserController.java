package com.example.demo.rest;

import com.example.demo.domain.DemoUser;
import com.example.demo.domain.Greeting;
import com.example.demo.repository.DemoUserRepository;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    private DemoUserRepository demoUserRepository;
    
    @GetMapping("/greeting")
    public Greeting greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
            return new Greeting(counter.incrementAndGet(), String.format(template, name));
    }
    
    @GetMapping("/count")
    public int count() {
        return demoUserRepository.countUser();
    }

    @GetMapping("/findusernamed")
    public DemoUser findUserNamed(@RequestParam(value = "name") String name) throws Exception {
        Optional<DemoUser> demoUserMaybe=demoUserRepository.findByUserName(name);
        if(demoUserMaybe.isEmpty()) {
            throw new Exception("No user existing with userName: "+name);
        }
        return demoUserMaybe.get();
    }
}
