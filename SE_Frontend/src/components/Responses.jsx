import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Responses.css';

const ResponsesList = () => {
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        axios.get('http://3.134.87.105:8080/api/response/get-all-responses')
            .then(response => {
                setResponses(response.data);
            })

            .catch(error => {
                console.error('Error fetching responses:', error);
            });
    }, []);

    const renderImage = (imageBase64) => {
        if (imageBase64) {
            return <img src={`data:image/jpeg;base64,${imageBase64}`} alt="Response" />;
        }
        return null;
    };

    return (
        <div className="main-content">
        <div className="responses-container">
            {responses.map((response) => (
                <div key={response.id} className="response-card">
                    <div className="response-image">
                        {renderImage(response.invitationImageBase64)}
                    </div>
                    <div className="Info_about">
                        <div className="Info_about_column">
                            <h3>Event NAME: {response.eventTitle}</h3>
                            <p><strong>Attend:</strong> {response.attendFlag ? 'Yes' : 'No'}</p>

                        </div>
                        {response.attendFlag && (
                            <div className="Info_about_column_2">
                                {response.response1 && <p><strong>Question 1:</strong> {response.response1}</p>}
                                {response.response2 && <p><strong>Question 2:</strong> {response.response2}</p>}
                                {response.response3 && <p><strong>Question 3:</strong> {response.response3}</p>}
                                {response.response4 && <p><strong>Question 4:</strong> {response.response4}</p>}
                                {response.response5 && <p><strong>Question 5:</strong> {response.response5}</p>}
                                {response.customAnswer && <p><strong>Custom Answer:</strong> {response.customAnswer}</p>}
                            </div>

                        )}
                        <p><strong>Invitee Name:</strong> {response.inviteeName}</p>
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
};

export default ResponsesList;
