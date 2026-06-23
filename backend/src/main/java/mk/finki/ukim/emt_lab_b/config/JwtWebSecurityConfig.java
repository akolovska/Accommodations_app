package mk.finki.ukim.emt_lab_b.config;


import java.util.List;

import mk.finki.ukim.emt_lab_b.web.filter.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.expression.method.DefaultMethodSecurityExpressionHandler;
import org.springframework.security.access.expression.method.MethodSecurityExpressionHandler;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class JwtWebSecurityConfig {
    private final JwtFilter jwtFilter;

    public JwtWebSecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(List.of("http://localhost:3000"));
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        corsConfiguration.setAllowedHeaders(List.of("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }

    @Bean
    public RoleHierarchy roleHierarchy() {
        return RoleHierarchyImpl.withDefaultRolePrefix()
                .role("ADMINISTRATOR").implies("USER")
                .build();
    }

    @Bean
    static MethodSecurityExpressionHandler methodSecurityExpressionHandler(RoleHierarchy roleHierarchy) {
        DefaultMethodSecurityExpressionHandler expressionHandler = new DefaultMethodSecurityExpressionHandler();
        expressionHandler.setRoleHierarchy(roleHierarchy);
        return expressionHandler;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(corsCustomizer ->
                        corsCustomizer.configurationSource(corsConfigurationSource())
                )
                .headers(headers -> headers
                        .frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)
                )
                .authorizeHttpRequests(authorizeHttpRequestsCustomizer ->
                        authorizeHttpRequestsCustomizer
                                .requestMatchers(
                                        "/swagger-ui/**",
                                        "/v3/api-docs/**",
                                        "/api/user/register",
                                        "/api/user/login"
                                )
                                .permitAll()
                                .requestMatchers(
                                        "/api/user/me"
                                )
                                .authenticated()
                                .requestMatchers(
                                        HttpMethod.GET,
                                        "/api/rentals",
                                        "/api/rentals/{id}",
                                        "/api/hosts",
                                        "/api/hosts/{id}",
                                        "/api/countries",
                                        "/api/countries/{id}"
                                )
                                .hasRole("USER")
                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/api/rentals/{id}/rent"
                                )
                                .hasRole("USER")
                                .requestMatchers(
                                        HttpMethod.DELETE,
                                        "/api/rentals/{id}/unrent"
                                )
                                .hasRole("USER")
                                .requestMatchers(
                                        HttpMethod.POST,
                                        "/api/rentals/add",
                                        "/api/hosts/add",
                                        "/api/countries/add"
                                )
                                .hasRole("ADMINISTRATOR")
                                .requestMatchers(
                                        HttpMethod.PUT,
                                        "/api/rentals/{id}/edit",
                                        "/api/hosts/{id}/edit",
                                        "/api/countries/{id}/edit"
                                )
                                .hasRole("ADMINISTRATOR")
                                .requestMatchers(
                                        HttpMethod.DELETE,
                                        "/api/rentals/{id}/delete",
                                        "/api/countries/{id}/delete",
                                        "/api/hosts/{id}/delete"
                                )
                                .hasRole("ADMINISTRATOR")
                                .anyRequest()
                                .hasRole("ADMINISTRATOR")
                )
                .sessionManagement(sessionManagementConfigurer ->
                        sessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
