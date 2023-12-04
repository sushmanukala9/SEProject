package com.example.RegisterLogin.Service;

import com.example.RegisterLogin.Dto.LoginDTO;
import com.example.RegisterLogin.Dto.UserDTO;
import com.example.RegisterLogin.Entity.User;
import com.example.RegisterLogin.Repo.UserRepo;
import com.example.RegisterLogin.Service.impl.UserImpl;
import com.example.RegisterLogin.response.LoginResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.*;

class UserImplTest {

    @Mock
    private UserRepo userRepo;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserImpl userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testAddUser() {
        UserDTO userDTO = new UserDTO(1, "username", "email@example.com", "password123");
        User user = new User(1, "username", "email@example.com", "encryptedPassword");

        when(userRepo.save(any(User.class))).thenReturn(user);
        when(passwordEncoder.encode(any(String.class))).thenReturn("encryptedPassword");

        String result = userService.addUser(userDTO);
        assertEquals("username", result);
    }

    @Test
    void testLoginUser_Successful() {
        LoginDTO loginDTO = new LoginDTO("email@example.com", "password123");
        User user = new User(1, "username", "email@example.com", "encryptedPassword");

        when(userRepo.findByEmail(loginDTO.getEmail())).thenReturn(user);
        when(passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())).thenReturn(true);
        when(userRepo.findOneByEmailAndPassword(loginDTO.getEmail(), user.getPassword())).thenReturn(Optional.of(user));

        LoginResponse response = userService.loginUser(loginDTO);
        assertEquals("Login Success", response.getMessage());
        assertTrue(response.getStatus());
    }

    @Test
    void testLoginUser_Failed() {
        LoginDTO loginDTO = new LoginDTO("wrong@example.com", "password123");

        when(userRepo.findByEmail(loginDTO.getEmail())).thenReturn(null);

        LoginResponse response = userService.loginUser(loginDTO);
        assertEquals("Email not exits", response.getMessage());
        assertFalse(response.getStatus());
    }

}
