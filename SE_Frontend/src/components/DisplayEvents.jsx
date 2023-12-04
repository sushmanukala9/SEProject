import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import themeone from "../images/wedding-theme.jpg";
import themetwo from "../images/Halloween-theme.jpg";
import themethree from "../images/birthday-theme.jpg";
import themefour from "../images/christmas-theme.jpg";
import themefive from "../images/roses-theme.jpg";
import themesix from "../images/seminar-theme.jpg";
import themeseven from "../images/travel-theme.jpg";
import './DisplayEvents.css';

const getImagePath = (imageName) => {
    const imageMap = {
        'wedding': themeone,
        'Halloween': themetwo,
        'birthday': themethree,
        'christmas': themefour,
        'roses': themefive,
        'seminar': themesix,
        'travel': themeseven,
    };

    return imageMap[imageName];
};

const DisplayEvents = () => {
    const { eventId } = useParams();
    const [fetchedEvent, setFetchedEvent] = useState([]);
    const [rsvp, setRsvp] = useState('');
    const [response1, setResponse1] = useState('');
    const [response2, setResponse2] = useState('');
    const [response3, setResponse3] = useState('');
    const [response4, setResponse4] = useState('');
    const [response5, setResponse5] = useState('');
    const [customAnswer, setCustomAnswer] = useState('');
    const [fullName, setFullName] = useState('');
    const [invitationImageData, setInvitationImageData] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const formatDateTime = (dateTime) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        const formattedDateTime = new Date(dateTime).toLocaleDateString('en-US', options);
        return formattedDateTime;
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`http://3.134.87.105:8080/api/events/${eventId}`);
                const event = response.data;

                if (event) {
                    const imageResponse = await axios.get(`http://3.134.87.105:8080/api/events/${event.id}/image`, {
                        responseType: 'blob'
                    });
                    const imageUrl = URL.createObjectURL(imageResponse.data);
                    setFetchedEvent({ ...event, imageUrl });
                } else {
                    console.error('Event not found');
                }
            } catch (error) {
                console.error('Error fetching event', error);
            }
        };

        fetchEvents();

        return () => {
            if (fetchedEvent && fetchedEvent.imageUrl) {
                URL.revokeObjectURL(fetchedEvent.imageUrl);
            }
        };
    }, [eventId]);

    const handleRsvpChange = (value) => {
        setRsvp(value);
    };

    const handleSubmit = async (event, eventId) => {
        event.preventDefault();

        const formData = new FormData();
        const requestData = {
            eventId,
            attendFlag: rsvp === 'Attending',
            response1,
            response2,
            response3,
            response4,
            response5,
            customAnswer,
            inviteeName: fullName,
            inviteeImageUrl: '',
        };

        formData.append('responsesData', new Blob([JSON.stringify(requestData)], { type: 'application/json' }));

        if (invitationImageData) {
            formData.append('invitationImageData', invitationImageData);
        }

        try {
            const response = await axios.post('http://3.134.87.105:8080/api/response/submit-response', formData);
            setFormSubmitted(true);
            console.log('Response data saved:', response.data);
        } catch (error) {
            console.error('Error submitting response:', error);
        }
    };

    return (
        <div>
            {formSubmitted ? (
                <div className="success-message-1">
                    <p>Your response has been saved successfully!</p>
                    {/*<p>*/}
                    {/*    <Link to="/home">Go to Home</Link>*/}
                    {/*</p>*/}
                </div>
            ) : (
                <div className="event-invitation-card" style={{
                    backgroundImage: `url(${fetchedEvent.invitationImageUrl ? getImagePath(fetchedEvent.invitationImageUrl) : fetchedEvent.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}>
                    <form onSubmit={(e) => handleSubmit(e, fetchedEvent.id)} id="invitation-form" encType="multipart/form-data">
                        <div className="event-details-container">
                            <div className="event-details">
                                <p className="event-detail"><b>Event Type:</b>  {fetchedEvent.eventType} </p>
                                <p className="event-detail"><b>Event Title:</b>  {fetchedEvent.eventTitle}</p>
                                <p className="event-detail"><b>Event Venue:</b>  {fetchedEvent.eventVenue}</p>
                                <p className="event-detail"><b>Date & Time:</b> {formatDateTime(fetchedEvent.dateTime)}</p>
                                <p className="event-detail"><b>Additional details:</b> {fetchedEvent.eventDetails}</p>
                            </div>
                            <div className="invitation-message">
                                <h1 id="invited">You are cordially invited!</h1>
                                <p className="event-detail">
                                    {fetchedEvent.customMessage}
                                </p>
                            </div>
                        </div>
                        <div className="questionnaire-container">
                            <p className="questionnaire-heading">Please answer the following questions:</p>
                            <div className="rsvp-container">
                                <p>RSVP:</p>
                                <div className="radio-buttons">
                                    <label className="inv-form-label">
                                        <input
                                            type="radio"
                                            name="rsvp"
                                            value="Not Attending"
                                            checked={rsvp === 'Not Attending'}
                                            onChange={() => handleRsvpChange('Not Attending')}
                                        /> Not Attending
                                    </label>

                                    <label className="inv-form-label">
                                        <input
                                            type="radio"
                                            name="rsvp"
                                            value="Attending"
                                            checked={rsvp === 'Attending'}
                                            onChange={() => handleRsvpChange('Attending')}
                                        />
                                        Attending
                                    </label>

                                    <label className="inv-form-label">
                                        <input
                                            type="radio"
                                            name="rsvp"
                                            value="Tentative"
                                            checked={rsvp === 'Tentative'}
                                            onChange={() => handleRsvpChange('Tentative')}
                                        />
                                        Tentative
                                    </label>
                                </div>

                                {rsvp === 'Attending' || rsvp === 'Tentative' ? (
                                    <div className="questionnaire-container">
                                        {fetchedEvent.question1 && (
                                            <div className="question-container">
                                                <p className="question"> {fetchedEvent.question1 ? 'Do you have any dietary restrictions or\n' +
                                                    '                            food allergies we should be aware of?' : 'No'}</p>
                                                <input
                                                    type="text"
                                                    className="answer-input"
                                                    name="response1"
                                                    value={response1}
                                                    onChange={(e) => setResponse1(e.target.value)}
                                                    placeholder="Answer for Question 1"
                                                    required
                                                />
                                            </div>
                                        )}

                                        {fetchedEvent.question2 && (
                                            <div className="question-container">
                                                <p className="question"> {fetchedEvent.question2 ? 'Will you be bringing a plus-one or any\n' +
                                                    '                            additional guests?' : 'No'}</p>
                                                <input
                                                    type="text"
                                                    className="answer-input"
                                                    name="response2"
                                                    value={response2}
                                                    onChange={(e) => setResponse2(e.target.value)}
                                                    placeholder="Answer for Question 2"
                                                    required
                                                />
                                            </div> )}


                                        {fetchedEvent.question3 && (
                                            <div className="question-container">
                                                <p className="question">{fetchedEvent.question3 ? 'Is there anything specific you would like\n' +
                                                    '                            to request or bring to the event?' : 'No'} </p>
                                                <input
                                                    type="text"
                                                    className="answer-input"
                                                    name="response3"
                                                    value={response3}
                                                    onChange={(e) => setResponse3(e.target.value)}
                                                    placeholder="Answer for Question 3"
                                                    required
                                                />
                                            </div> )}

                                        {fetchedEvent.question4 && (
                                            <div className="question-container">
                                                <p className="question"> {fetchedEvent.question4 ? 'Are there specific activities or\n' +
                                                    '                            components of the event that you are particularly interested in or would like to participate\n' +
                                                    '                            in?' : 'No'}</p>
                                                <input
                                                    type="text"
                                                    className="answer-input"
                                                    name="response4"
                                                    value={response4}
                                                    onChange={(e) => setResponse4(e.target.value)}
                                                    placeholder="Answer for Question 4"
                                                    required
                                                />
                                            </div> )}


                                        {fetchedEvent.question5 && (
                                            <div className="question-container">
                                                <p className="question">{fetchedEvent.question5 ? 'Are you comfortable with photographs being\n' +
                                                    '                            taken during the event? If not, is there a specific area or time you would prefer not to be\n' +
                                                    '                            photographed?' : 'No'} </p>
                                                <input
                                                    type="text"
                                                    className="answer-input"
                                                    name="response5"
                                                    value={response5}
                                                    onChange={(e) => setResponse5(e.target.value)}
                                                    placeholder="Answer for Question 5"
                                                    required
                                                />
                                            </div>)}

                                        <p className="event-detail"> {fetchedEvent.customQuestion}</p>
                                        <input
                                            type="text"
                                            className="custom-question-input"
                                            name="customAnswer"
                                            value={customAnswer}
                                            onChange={(e) => setCustomAnswer(e.target.value)}
                                            placeholder="Your answer for the custom question"
                                            required />
                                    </div>
                                ) : null}

                                {rsvp && (
                                    <div className="additional-info-container">
                                        <p className="event-detail">Upload a memorable picture to display in the event:</p>
                                        <label id="upload-picture-input-label" htmlFor="upload-picture-input">
                                            Choose Image
                                            <input
                                                type="file"
                                                id="upload-picture-input"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        setInvitationImageData(file);
                                                    } else {
                                                        console.error('Invalid file selected');
                                                    }
                                                }}
                                            />
                                        </label>
                                        <p className="event-detail">Please type your full name below:</p>
                                        <input
                                            type="text"
                                            className="full-name-input"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            required
                                        />

                                        <button type="submit" className="submit-button">
                                            Submit Response
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default DisplayEvents;
