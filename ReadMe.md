#### Some Information about project

* Example e2e tests written in Testcafe, that:

- are written in Javascript es6
- run on specific browsers
- run on multiple browsers
- run headlessly
- Some are proposed future functinal tests 
- use a page object pattern  - However , we have not use it much for this cases.
- Used the helper class to support some common utility methods 

#### Setup

1. Node should be installed in your machine
2. Unzip the project 
3. install the testcafe with `npm i -g testcafe` or  `npm install --save dev testcafe`
4. Go to Root Project install the project with `npm i` 


#### Run

* Prerequisite: 
- The Server and database should be running : Front end  should be redirecting the application on the port 8080 

* run  `npm run test:chrome` to run the tests

#### Report

* After the test execution is completed check the TestReport generated at project root level. (.../testcafeproject/TestReport.html)
* If case is faliled then failed screenshot is also attached to the report.