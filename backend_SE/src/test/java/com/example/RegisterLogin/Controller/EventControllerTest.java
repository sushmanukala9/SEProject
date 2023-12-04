package com.example.RegisterLogin.Controller;
import com.example.RegisterLogin.Entity.EventData;
import com.example.RegisterLogin.Repo.EventDataRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Date;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(EventController.class)
@AutoConfigureMockMvc(addFilters = false)
public class EventControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EventDataRepository repository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testCreateOrUpdateEvent_Success() throws Exception {
        EventData eventData = createSampleEventData();

        MockMultipartFile jsonFile = new MockMultipartFile("event", "", "application/json", objectMapper.writeValueAsBytes(eventData));
        MockMultipartFile imageFile = new MockMultipartFile("file", "image.jpg", "image/jpeg", "test image content".getBytes());

        when(repository.save(any(EventData.class))).thenReturn(eventData);

        mockMvc.perform(multipart("/api/events/create-event").file(jsonFile).file(imageFile))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(eventData)));
    }

    @Test
    public void testGetAllEvents() throws Exception {
        EventData eventData1 = createSampleEventData();
        EventData eventData2 = createSampleEventData();
        when(repository.findAll()).thenReturn(Arrays.asList(eventData1, eventData2));

        mockMvc.perform(get("/api/events"))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(Arrays.asList(eventData1, eventData2))));
    }

    @Test
    public void testGetEventById_Found() throws Exception {
        Long eventId = 1L;
        EventData eventData = createSampleEventData();
        when(repository.findById(eventId)).thenReturn(Optional.of(eventData));

        mockMvc.perform(get("/api/events/" + eventId))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(eventData)));
    }

    @Test
    public void testGetEventById_NotFound() throws Exception {
        Long eventId = 1L;
        when(repository.findById(eventId)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/events/" + eventId))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetImage_Found() throws Exception {
        Long eventId = 1L;
        EventData eventData = createSampleEventData();
        eventData.setInvitationImageData("test image content".getBytes());

        when(repository.findById(eventId)).thenReturn(Optional.of(eventData));

        mockMvc.perform(get("/api/events/" + eventId + "/image"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.IMAGE_JPEG))
                .andExpect(content().bytes(eventData.getInvitationImageData()));
    }

    @Test
    public void testGetImage_NotFound() throws Exception {
        Long eventId = 1L;
        when(repository.findById(eventId)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/events/" + eventId + "/image"))
                .andExpect(status().isNotFound());
    }

    private EventData createSampleEventData() {
        EventData eventData = new EventData();
        eventData.setId(1L);
        eventData.setEventType("Wedding");
        eventData.setEventTitle("Sample Event");
        eventData.setEventVenue("Sample Venue");
        eventData.setDateTime(new Date());
        eventData.setCustomMessage("Welcome to the event");
        eventData.setCustomQuestion("Are you attending?");
        eventData.setEventDetails("This is a sample event.");
        eventData.setQuestion1(true);
        eventData.setQuestion2(false);
        eventData.setQuestion3(true);
        eventData.setQuestion4(false);
        eventData.setQuestion5(true);
        eventData.setInvitationImageUrl("http://example.com/image.jpg");
        eventData.setInvitationImageData("sample image data".getBytes());

        return eventData;
    }
}
