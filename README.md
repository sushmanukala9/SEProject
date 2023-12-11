# SEProject

Demo: https://youtu.be/6KnC0JF73d8

UNIT TESTS:
-----------

Running Unit Tests
This project includes a suite of unit tests to verify the functionality of the code. To run these tests, follow the steps below:

Prerequisites
Ensure you have Java JDK installed on your system.
Make sure Maven is installed and configured in your environment.
Test Execution
Open a terminal or IDE and import the project.

Navigate to the root directory of the project.

Run the following command:

mvn test

This command will compile the project and execute all the unit tests. Test results will be displayed in the terminal.

Alternative:
in the IDE make a build of the MAven dependencies included in the pom.xml file and then right-click on the root directory and click on Run Tests
The results will show in the console. There are no deviations and all 19 unit test cases are passing.

ACCEPTANCE TESTS:
-----------------

TC-01 Host Registration
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| **Step No.** | **Test Step Description**                                                             | **Expected Result**                                                           |
|--------------|---------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| 1            | Click on the URL (http://eventeasebucket.s3-website.us-east-2.amazonaws.com/register) | Registration page must be opened                                              |
| 2            | Enter Username, Email, and Password                                                   |                                                                               |
| 3            | Click on Save                                                                         | User should be registered successfully and Navigated to the Event categories page |
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

TC-02 Host filling Predefined Event Form and Invitee submitting responses

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| **Step No.**                                 | **Test Step Description**                                             | **Expected Result**                                                                                                                   |
|----------------------------------------------|-----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Prerequisites                                | Host should be logged in to the EventEase web application             |                                                                                                                                       |
| 1                                            | Click on any of the pre-defined event categories(Ex: Birthday)        | A host form should be opened with a prefilled Event Type field as “Birthday”.                                                           |
| 2                                            | "Fill all the below details:                                          |
|                                              |    • Event Title                                                      |  
|                                              |    • Event Venue                                                      |    
|                                              |    • Event Date                                                       |   
|                                              |    • Custom message                                                   |  
|                                              |    • Custom question                                                  | 
|                                              |    • Event Details"                                                   |                                                                                                                                       |
| 3                                            | Select a theme from predefined ones OR Upload a new image as theme    | Theme should be highlighted when clicked on it                                                                                        |
| 4                                            | Select from predefined questions list                                 | Selected questions must be checked                                                                                                    |
| 5                                            | Click on the Create invitation button                                     | The Host should be able to see the email form with the prefilled email subject and body with the invitation form link.                                |
| 6                                            | Enter the invitee email in the email field and click on send email            | Host should be able to see “Email Sent Successfully”                                                                                  |
| 7                                            | Navigate to the invitee email inbox and click on the invitation form link | Invitation form with selected background image theme and event details should be displayed.                                            |
| 8                                            | As an invitee, select RSVP status as not attending                    | "Invitee should be able to see below fields:                                             
|                                              |                                                   | • option to upload an image of host and invitee 
|                                              |                                                   | • full name input text field"                                                                                                                                     |
| 9                                            | Upload any image and enter the full name of the invitee                       |                                                                                                                                       |
| 10                                           | Click on Submit Response                                              | Invitee should be able to submit a response successfully and the “Your response is saved successfully” success message should be displayed. |
| 11                                           | Hosts can log in to their account and Navigate to the Responses tab         | All the responses and the recent invitee response should be displayed along with the uploaded image.                           |
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

TC-03 Host filling Custom Event Form and Invitee submitting responses

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| **Step No.**                                 | **Test Step Description**                                             | **Expected Result**                                                                                                                   |
|----------------------------------------------|-----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| Prerequisites                                | Host should be logged in to the EventEase web application             |                                                                                                                                       |
| 1                                            | Click on the + icon (custom event category)       | A custom host form should be opened with an empty Event Type input field.                                                           |
| 2                                            | "Fill all the below details:                                          |
|                                              |    • Event Type                                                       |  
|                                              |    • Event Title                                                      |  
|                                              |    • Event Venue                                                      |    
|                                              |    • Event Date                                                       |   
|                                              |    • Custom message                                                   |  
|                                              |    • Custom question                                                  | 
|                                              |    • Event Details"                                                   |                                                                                                                                       |
| 3                                            | Select a theme from predefined ones OR Upload a new image as theme    | Theme should be highlighted when clicked on it                                                                                        |
| 4                                            | Select from predefined questions list                                 | Selected questions must be checked                                                                                                    |
| 5                                            | Click on the Create invitation button                                     | The Host should be able to see the email form with the prefilled email subject and body with the invitation form link.                                |
| 6                                            | Enter the invitee email in the email field and click on send email            | Host should be able to see “Email Sent Successfully”                                                                                  |
| 7                                            | Navigate to the invitee email inbox and click on the invitation form link | Invitation form with selected background image theme and event details should be displayed.                                            |
| 8                                            | As an invitee, select RSVP status as not attending                    | "Invitee should be able to see below fields:                                            
|                                              |                                                   | • option to upload an image of host and invitee 
|                                              |                                                   | • full name input text field"                                                                                                                                     |
| 9                                            | Upload any image and enter the full name of the invitee                       |                                                                                                                                       |
| 10                                           | Click on Submit Response                                              | Invitee should be able to submit a response successfully and “Your response is saved successfully” success message should be displayed. |
| 11                                           | Host can log in to their account and Navigate to the Responses tab         | All the responses and the recent invitee response should be displayed along with the uploaded image.                           |
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



