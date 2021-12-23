# How to run the appplication

I bootstrapped this project with [Create React App](https://github.com/facebook/create-react-app).

`Note`: I started out writing my own code from scratch. However, I realized I could save more time by generating the project with CRA and doing customizations myself as this is a short (4-hours long) assessment.\

** You need node version >= 12 to run this project,

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console. [Uses prettier]

### `yarn test`

Launches the test runner in the interactive watch mode.\
`Note`: I couldn't write jest/enzyme tests as I had to complete it within stipulated time.

### `yarn lint`

Runs prettier linter to highlist formatting issues in the codebase.\

### `yarn lint:fix`

Runs the prettier linter utility to fix formatting issues in the codebase.\


### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

Note: This project is hosted on Netlify.\
[![Netlify Status](https://api.netlify.com/api/v1/badges/d27e78dd-5107-4eab-bf2d-935296d7af7a/deploy-status)](https://app.netlify.com/sites/jur-profile-builder/deploys)


## Other assessment  questions
### a. Approach
- Project is written in typescript because I do like to ensure type safety in my code (although currently, some loose typings <any> are used in the codebase because I was working with too much speed to allow for thoroughness).
- Initially, I had run `npm init -y` to create and customize a vanilla React project with intention to go through the entire manual process of adding typescript, setting up webpack, installing needed dev dependencies and doing every other necessary manual intricate (personal) configuration myself, just so I could display my acumen and skill with React setup and its ecosystem. 
- However, I had had to generate a typescript-react project with CRA 10 minutes into the exercise because it dawned on me that the exercise was meant to be a short one.
- With modularity, reusability and testability in mind, I had started out hoping to adopt the atomic software design pattern and had proceeded to create a ui/ folder in project root where I planned to put reusable components which I'd categorize as 'atoms', 'molecules', 'organisms', 'layouts' or 'templates'.
- I opted to use React Router for routing, Ant Design as UI library and Formik as Form component as requested and prettier as formatter.
- Note the separation of hooks into their separate folders and files. This was done with modularity and testability in mind.
- Separation of API call logic into controllers and request files was also done with modularity and testability in mind.
- Project was not written with responsiveness in mind as it was speedily done.
- The edit profile logic entails creating a new user object with the filled details if it does not already exist in local storage and saving/editing if it exists.
- As a bonus, I added a profile aggregation view on the home page "/" and a delete function.\\

My approach changed as I developed the app, as I couldn't fully put the atomic design pattern to use due to the compactness of the assessment and inadequacy of the set timing.



### b. Challenges faced
It was a straightforward task. The only challenge I faced was 'time' as I was constrained to complete this in the fastest time possible.
### c.
#### i. If I had a couple more days/
  - I'd ensure thorough type safety
- I'd be more conscientous with styling, responsiveness and organization
- I'd make components more modular by splitting into atomic components as I originally intended.
- I'd implement a slicker UI
- I'd extend the logic further to include a mock user authentication feature.
#### ii. If I had a month
 - I'd write unit and integration tests. 
 - I'd run snapshot tests
 
### d. URL to the deployed App: https://jur-profile-builder.netlify.app/
Home page: "/" /
View Profile: "/view-profile/:id" where id is email address of user/
Edit Profile: "/edit-profile" to create a new user profile and "/edit-profile/:id" to edit an existing profile
