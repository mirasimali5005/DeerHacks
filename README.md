## Inspiration  
We wanted to build something fun and interactive using Augmented Reality (AR). The idea was to let people add text, drawings, and media into an AR space. We also wanted features like messaging, live location tracking, and Google login to make the project more useful.  

## What it does  
This project is a dashboard app where users can:  
- Log in using Google or manually with email and password.  
- Toggle between light and dark mode.
- See their live location on a map.
- Send and receive messages.
- Use AR to add floating text and drawings in a real-world space.  

## How we built it  
- Frontend: Built using React and CSS for styling.  
- Authentication: Uses Google login (OAuth).  
- AR Feature:  
  - Uses A-Frame & AR.js to display text and drawings in AR.  
  - Users can type a message or draw on a canvas and see it appear in AR.  
- Backend:  
  - Uses a Firebase NoSQL database to store AR messages with location data.  
  - When a user adds a message or drawing in AR, it is saved in Firebase.  

## Challenges we ran into  
- Making AR work smoothly was difficult. We had to figure out how to add text and drawings properly.  
- Connecting authentication and navigation in React took time to set up.  
- Keeping the live location accurate was tricky, as GPS updates can be slow.  

## Accomplishments that we're proud of  
- We successfully made an AR experience where users can add text and drawings.  
- Google login works properly, making it easy for users to sign in.  
- The dark mode toggle saves the theme preference for users.  
- The app has a clean and simple dashboard UI.  

## What we learned  
- How to use React hooks like useState and useEffect to manage data.  
- How to set up Google login in a React app.  
- How to use A-Frame and AR.js to create simple AR experiences.  
- How to save and retrieve data from a Firebase NoSQL database.  
- How to use Google Map's API to integrate with out project

## What's next for AR Museum  
- More AR features: Add images, videos, and 3D objects.  
- Better messaging: Make messages update in real time.  
- User profiles: Let users save their AR creations.  
- Location-based AR: Show AR content at specific real-world locations.  
