// EmailForm.js
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useMutation } from 'react-query';
import {Link, useParams} from 'react-router-dom';
import './EmailForm.css';

const sendEmail = async ({ email, subject, message }) => {
    try {
        const response = await axios.post('http://3.134.87.105:8080/api/send-email', {
            email,
            subject,
            message,
        });

        return response.data;
    } catch (error) {
        throw new Error('Failed to send email');
    }
};

const EmailForm = () => {
    const { subject: initialSubject, message: initialMessage } = useParams();
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState(initialSubject || '');
    const [message, setMessage] = useState(initialMessage || '');
    const mutation = useMutation(sendEmail);

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ email, subject, message });
    };

    // Reset the form state after submission
    useEffect(() => {
        if (mutation.isSuccess || mutation.isError) {
            setEmail('');
            setSubject('');
            setMessage('');
        }
    }, [mutation.isSuccess, mutation.isError]);

    return (
        <div className="container1">
            {!mutation.isSuccess && !mutation.isError && (
                <>
                    <h2 className="title">Email Invitee</h2>
                    <form className="form" onSubmit={handleSubmit}>
                        <label className="label">Email:</label>
                        <input
                            className="input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label className="label">Subject:</label>
                        <input
                            className="input"
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />

                        <label className="label">Message:</label>
                        <textarea
                            className="textarea"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />

                        <button className="button" type="submit" disabled={mutation.isLoading}>
                            {mutation.isLoading ? 'Sending...' : 'Send Email'}
                        </button>
                    </form>
                </>
            )}

            {(mutation.isSuccess || mutation.isError) && (
                <>
                    {mutation.isSuccess && (
                        <p className="success-message">Email sent successfully!</p>
                    )}
                    {mutation.isError && (
                        <p className="error-message">{mutation.error.message}</p>
                    )}


                    <div className="home-link">
                        <Link to="/home">Go to Home</Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default EmailForm;