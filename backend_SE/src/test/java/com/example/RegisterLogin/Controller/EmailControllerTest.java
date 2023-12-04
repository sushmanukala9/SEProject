package com.example.RegisterLogin.Controller;

import com.example.RegisterLogin.Dto.EmailDTO;
import com.example.RegisterLogin.Service.impl.EmailService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@WebMvcTest(EmailController.class)
@AutoConfigureMockMvc(addFilters = false)
public class EmailControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EmailService emailService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testSendEmail_Success() throws Exception {
        EmailDTO emailDTO = new EmailDTO();
        emailDTO.setEmail("recipient@example.com");
        emailDTO.setSubject("Test Subject");
        emailDTO.setMessage("Test message");

        doNothing().when(emailService).sendEmail(anyString(), anyString(), anyString());

        mockMvc.perform(post("/api/send-email")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(emailDTO)))
                .andExpect(status().isOk())
                .andExpect(content().string("Email sent successfully"));
    }

    @Test
    public void testSendEmail_Failure() throws Exception {
        EmailDTO emailDTO = new EmailDTO();
        emailDTO.setEmail("recipient@example.com");
        emailDTO.setSubject("Test Subject");
        emailDTO.setMessage("Test message");

        doThrow(new RuntimeException("Failed to send email")).when(emailService).sendEmail(anyString(), anyString(), anyString());

        mockMvc.perform(post("/api/send-email")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(emailDTO)))
                .andExpect(status().isOk())
                .andExpect(content().string("Failed to send email"));
    }
}
