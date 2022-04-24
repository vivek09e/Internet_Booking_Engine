package com.ibs.backend.service;

import java.util.ArrayList;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    /**
     * @param username to search that if it exists or not
     * @return UserDetails object that contains the user info of the user if
     *         present.
     * @throws UsernameNotFoundException if the passed username not present
     *                                   matching.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if ("KDU2022".equals(username)) {
            return new User("KDU2022", "$2a$10$C5Zgmkn29p.4ffbFTEkZNu/57pmk0HCsuMZBlhVYZkC9mgzK3UUBm",
                    new ArrayList<>());
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }
}