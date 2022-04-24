package com.ibs.backend.controller;

import com.ibs.backend.repository.GraphQlRepo.GraphQlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.ibs.backend.service.JwtUserDetailsService;
import com.ibs.backend.config.JwtToken;
import com.ibs.backend.entityDto.JwtRequest;
import com.ibs.backend.entityDto.JwtResponse;

@RestController
@CrossOrigin
public class JwtAuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtToken jwtToken;
    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private GraphQlRepository graphQlRepository;

    /**
     * @param authenticationRequest need a JwtRequest object that contains the
     *                              username
     *                              and password to authenticate the request.
     * @return if the JwtRequest object is authenticated returns the token that will
     * be used to
     * authenticate the all the other Api.
     * @throws Exception if the JwtRequest object have invalid credentials.
     */
    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());
        final String token = jwtToken.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    /**
     * Authenticate the user with the help of authenticationManager.authenticate
     * function.
     *
     * @param username Required a String that contains a valid username.
     * @param password Required a String that contains a valid password associated
     *                 with the user.
     * @throws Exception if the user is Disabled or the Credentials are invalid.
     */
    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}