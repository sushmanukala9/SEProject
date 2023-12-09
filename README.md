# SEProject

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
| 3            | Click on Save                                                                         | User should be registered successfully and Navigated to Event categories page |
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------





