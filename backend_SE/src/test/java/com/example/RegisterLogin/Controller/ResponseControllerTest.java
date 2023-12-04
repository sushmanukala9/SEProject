package com.example.RegisterLogin.Controller;
import com.example.RegisterLogin.Dto.ResponseDataDTO;
import com.example.RegisterLogin.Entity.EventData;
import com.example.RegisterLogin.Entity.ResponsesData;
import com.example.RegisterLogin.Repo.EventDataRepository;
import com.example.RegisterLogin.Repo.ResponseDataRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ResponseController.class)
@AutoConfigureMockMvc(addFilters = false)
public class ResponseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ResponseDataRepository responseDataRepository;

    @MockBean
    private EventDataRepository eventDataRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testSubmitResponse_Success() throws Exception {
        ResponsesData response = new ResponsesData();
        response.setEventId(1L);
        response.setInviteeName("John Doe");

        EventData eventData = new EventData();
        eventData.setId(1L);
        when(eventDataRepository.findById(1L)).thenReturn(Optional.of(eventData));
        when(responseDataRepository.save(any(ResponsesData.class))).thenReturn(response);

        MockMultipartFile jsonFile = new MockMultipartFile("responsesData", "", "application/json", objectMapper.writeValueAsBytes(response));
        MockMultipartFile imageFile = new MockMultipartFile("invitationImageData", "image.jpg", "image/jpeg", "test image content".getBytes());

        mockMvc.perform(multipart("/api/response/submit-response").file(jsonFile).file(imageFile))
                .andExpect(status().isCreated())
                .andExpect(content().json(objectMapper.writeValueAsString(response)));
    }

    @Test
    public void testSubmitResponse_Failure() throws Exception {
        mockMvc.perform(multipart("/api/response/submit-response")
                        .file(new MockMultipartFile("responsesData", "", "application/json", "".getBytes()))
                        .file(new MockMultipartFile("invitationImageData", "image.jpg", "image/jpeg", new byte[0])))
                .andExpect(status().isBadRequest());
    }


    @Test
    public void testGetAllResponses_Success() throws Exception {
        ResponsesData response1 = new ResponsesData();
        response1.setInviteeName("John Doe");
        ResponsesData response2 = new ResponsesData();
        response2.setInviteeName("Jane Doe");

        List<ResponsesData> allResponses = Arrays.asList(response1, response2);
        when(responseDataRepository.findAll()).thenReturn(allResponses);

        List<ResponseDataDTO> dtos = Arrays.asList(new ResponseDataDTO(response1), new ResponseDataDTO(response2));

        mockMvc.perform(get("/api/response/get-all-responses"))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(dtos)));
    }

    @Test
    public void testGetAllResponses_Failure() throws Exception {
        when(responseDataRepository.findAll()).thenThrow(new RuntimeException());
        mockMvc.perform(get("/api/response/get-all-responses"))
                .andExpect(status().isInternalServerError());
    }
}
