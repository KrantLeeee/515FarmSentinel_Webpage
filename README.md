# FarmBeats - Sentinel
## Project Brief:
Our system leverages Digital Signal Processing and Computer Vision for real-time pest detection and remote farm pest monitoring, saving time and labor for farmers.

## Technologies used in Web:
1. Data visualization
2. LLM powered Assistant
3. Flask server
4. Detailed use cases

## Problem Scope:
About 350 million acres of U.S. farmland are mostly managed by farmers over 65, and they're up against big challenges like pests, diseases, and not enough hands on deck. We've designed a cool, affordable IoT device that keeps an eye on farm health around the clock, spots problems like pests or diseases with smart tech, and syncs seamlessly with mobile apps for super easy farm health management. It’s a game-changer especially for the smaller farms, which are often ignored even though they make up a big slice of the market. The agri-IoT scene is growing—expected to shoot up from $11.4 billion to $18.1 billion by 2026—and we’re all set to ride that wave with cheaper solutions than most of the competitors.

## Link to Our App:
https://brave-flower-0b9c8e71e.5.azurestaticapps.net/

## Link to Youtube Demo Showcase:


## Getting Started with previous code

npm install react-scripts

# Kick start on local host

Command for react website: 
"""
npm start
"""
Command for flask server: (https://github.com/KrantLeeee/515FarmSentinel_FlaskServer)
Open the terminal and run the following commands:
"""
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
"""
"""
FLASK_DEBUG=1 flask --app app.py run -p 5001
"""

_remember to change the address in the code to http://127.0.0.1:5001_

---

# Deployement
Both the app and the flask server have been deployed on the Azure.

# Reflections of What We Learned & Challenges
### React Basics
Components
State management
Props
Lifecycle methods
Event handling
### React Advanced Topics
React hooks (useState, useEffect)
React Router for navigation
Context API for state management
### CSS and Styling
Importing and using CSS in React components
Inline styling
Flexbox for layout
CSS transitions for animations
### Bootstrap & FontAwesome
Integrating Bootstrap for styling
Using Bootstrap classes for layout and design
Using FontAwesome icons in React
### APIs and Data Fetching
Fetching data from APIs using fetch and axios
Handling asynchronous operations with async/await
Error handling in API requests
### Flask Basics
Setting up a Flask server
Creating API endpoints with Flask
Using Flask-CORS for handling Cross-Origin Resource Sharing
### Azure Integration
Connecting to Azure Table Storage
Uploading blobs to Azure Blob Storage
Using environment variables for sensitive information
### Chatbot Integration
Integrating OpenAI’s API with Flask
Handling chat history for contextual conversations
Sending and receiving messages between front-end and back-end
### Project Structure
Organizing files and directories in a React project
Maintaining a clean and modular codebase
### Debugging and Troubleshooting
Using browser console for debugging
Handling common errors and warnings in React
### Deployment
Deploying Flask server on local and cloud environments
Handling mixed content issues with HTTPS

### Challenges
We faced a lot of challenges. These included understanding and implementing the integration of React and Flask, handling cross-domain request issues, configuring and debugging Azure services, adjusting CSS and component layout, ensuring the correctness of API communication, and implementing a chatbot with memory. You also need to master the use of external libraries (such as FontAwesome), handle asynchronous data requests, and solve collaboration issues between the front-end and back-end. Keywords: React, Flask, Azure, cross-domain requests, CSS layout, API communication, chatbot, asynchronous data requests, front-end and back-end collaboration.