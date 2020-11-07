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

1. Node.js should be installed in your machine
2. Go to https://github.com/falgun2411/testcafeproject
3. Either download the project and unzip it in your machine 
OR clone the project using git in your local machine https://github.com/falgun2411/testcafeproject.git
4. In terminal go to your root project directory 
(example: PS D:\AutomationProjects\testcafeproject>)
5. install the testcafe with `npm i -g testcafe` or  `npm install --save dev testcafe`
6. To install all project depedancy run : `npm i` 


#### Run

* Prerequisite: 
- The Server and database should be running : Frontend  should be redirecting the application on the port 8080 
1. in terminal go to your root project directory
(example: PS D:\AutomationProjects\testcafeproject>)
2. run  `npm run test` to run the tests
3. run  `npm run generatereport` to see the test result


#### Note:
In ProjectRoot... , you will find helpers.js file.
Line no 18,19,20 I have have not commented this code. Because there is a bug in the system which provides variable with undefined type .
After commenting this code, all cases will be passed

    // console.log('expected value' + expected + 'type of:' + typeof expected + ' -- actual value:' + actual + 'type of:' + typeof actual)
    // await t.expect(actual).notTypeOf('undefined', 'In Rest API response: value is stored with typeOf undefined ')
    // await t.expect(expected).notTypeOf('undefined', 'In Database: value is stored with typeOf undefined ')
  
