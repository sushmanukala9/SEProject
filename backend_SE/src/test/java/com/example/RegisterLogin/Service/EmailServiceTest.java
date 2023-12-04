package com.example.RegisterLogin.Service;

import com.example.RegisterLogin.Service.impl.EmailService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EmailServiceTest {

    @Mock
    private JavaMailSender javaMailSender;

    @InjectMocks
    private EmailService emailService;

    @Test
    void testSendEmail() {
        emailService.sendEmail("recipient@example.com", "Test Subject", "Test message");

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo("recipient@example.com");
        mailMessage.setSubject("Test Subject");
        mailMessage.setText("Test message");

        verify(javaMailSender, times(1)).send(mailMessage);
    }
}
