package com.example.demo;

/**
 *
 * @author benoitmarsot
 */
import java.util.Arrays;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
//            .authorizeHttpRequests((requests) -> {
//                requests
//                    .requestMatchers(
//                        "/api/**"
//                    ).hasRole("provider")
//                    .requestMatchers(
//                        "/",
//                        "/home",
//                        "/about",
//                        "/signin",
//                        "/api/pro/register",
//                        "/api/pro/signIn"
//                ).permitAll()
//                    .anyRequest().authenticated()
//                ;
//        })
//        .httpBasic(withDefaults())
//        .formLogin((form) -> form
//            .loginPage("/signin")
//            .permitAll()
//        )
//        .logout((logout) -> logout.permitAll())
        .authorizeHttpRequests(
            requests -> requests.anyRequest().permitAll()
        )
        .csrf().disable();
        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails patient =
            User.withDefaultPasswordEncoder()
                .username("patient")
                .password("password")
                .roles("PATIENT")
                .build();
        UserDetails user =
            User.withDefaultPasswordEncoder()
                .username("benoitmarsot@hotmail.com")
                .password("password")
                .roles("PROVIDER")
                .build();

        return new InMemoryUserDetailsManager(user);
    }
//    @Bean
//    public FilterRegistrationBean corsFilter() {
//            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//            CorsConfiguration config = new CorsConfiguration();
//            config.setAllowCredentials(true);
//            config.addAllowedOrigin("http://localhot:5173");
//            config.addAllowedHeader("*");
//            config.addAllowedMethod("*");
//            source.registerCorsConfiguration("/**", config);
//            FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
//            bean.setOrder(0);
//            return bean;
//    }
}