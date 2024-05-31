import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCamera, faEnvelope, faBell, faCog, faMoon, faSignOutAlt, faChevronRight, faPlus, faUserCircle, faRobot } from '@fortawesome/free-solid-svg-icons';
import PeaweevilDetection from './PeaweevilDetection';
import { getChatCompletion } from '../api/openai';
import { Link } from 'react-router-dom';
import './Home.css';  // Ensure Home.css is imported

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visibleAlerts, setVisibleAlerts] = useState(4); // Initial number of visible alerts
  const [alerts, setAlerts] = useState([
    { id: 1, message: 'High Level of Pea Weevil Infestation Detected', timestamp: '2024-05-20 08:45 AM' },
    { id: 2, message: 'Sensor Malfunction', timestamp: '2024-05-20 09:15 AM' },
    { id: 3, message: 'Low Device Battery', timestamp: '2024-05-20 10:05 AM' },
    { id: 4, message: 'Pea Weevil Detection Failed', timestamp: '2024-05-20 12:30 PM' },
    { id: 5, message: 'High Level of Pea Weevil Infestation Detected', timestamp: '2024-05-21 08:45 AM' },
    { id: 6, message: 'Sensor Malfunction', timestamp: '2024-05-21 09:15 AM' },
    { id: 7, message: 'Low Device Battery', timestamp: '2024-05-21 10:05 AM' },
    { id: 8, message: 'Pea Weevil Detection Failed', timestamp: '2024-05-21 12:30 PM' },
  ]);

  const toggleChatbot = () => {
    const chatbotWindow = document.getElementById('chatbot-window');
    chatbotWindow.style.display = chatbotWindow.style.display === 'none' || chatbotWindow.style.display === '' ? 'flex' : 'none';
  };

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage = { role: 'user', content: input.trim() };
      setMessages([...messages, userMessage]);
      setInput('');
      setLoading(true); // Start loading
      setError(null); // Clear previous errors

      console.log('Sending message:', input.trim()); // Log the message being sent

      try {
        const botResponse = await getChatCompletion(input.trim());
        console.log('Received bot response:', botResponse); // Log the response from the bot
        const botMessage = { role: 'assistant', content: botResponse.choices[0].text }; // Ensure to access the right property
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setLoading(false); // Stop loading
      } catch (error) {
        console.error('Error sending message:', error);
        setError('Sorry, something went wrong.');
        setLoading(false); // Stop loading
      }
    }
  };

  const handleShowMore = () => {
    setVisibleAlerts((prevVisible) => prevVisible + 4);
  };

  const handleShowLess = () => {
    setVisibleAlerts(4);
  };

  const handleAlertCheck = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="dashboard-container">
      <header className="header fixed-top"> {/* Apply fixed position */}
        <div className="d-flex align-items-center">
          <img src={require('../assets/images/microsoft.png')} alt="Row 4" className="logo" />
          <span className="font-bold text-lg ml-2 text-white">Farmbeats</span>
        </div>
        <div className="logo-container">
          <img src={require('../assets/images/logo.jpg')} alt="Logo" className="logo" />
          <h1 className="text-green-700 text-3xl font-bold text-white">Sentinel</h1>
        </div>
        <div className="icon-white d-flex align-items-center">
          <FontAwesomeIcon icon={faEnvelope} className="text-green-700 text-xl mr-4 icon-margin" />
          <FontAwesomeIcon icon={faUserCircle} className="text-green-700 text-xl" />
        </div>
      </header>
      <div className="main-content">
        <div className='sidebar-container'>
          <div className="sidebar d-flex flex-column align-items-center fixed-left"> {/* Apply fixed position */}
              <FontAwesomeIcon icon={faHome} className="icon mb-4" />
              <FontAwesomeIcon icon={faCamera} className="icon mb-4" />
              <FontAwesomeIcon icon={faEnvelope} className="icon mb-4" />
              <FontAwesomeIcon icon={faBell} className="icon mb-4" />
              <FontAwesomeIcon icon={faCog} className="icon mb-4" />
              <FontAwesomeIcon icon={faMoon} className="icon mt-auto mb-4" />
              <FontAwesomeIcon icon={faSignOutAlt} className="icon mb-4" />
            </div>
        </div>
        <div className="main-content">
          
          <div className="dashboard-content">
            <h1 className="text-green-700 font-bold" style={{ fontFamily: 'Merriweather', color: '#6D8C54' }}>Dashboard</h1>
            <section className="dashboard-section">
              <div>
                
                <div className="dashboard-svh d-flex justify-content-between">
                  
                  <PeaweevilDetection />
                  <div className="device-list">
                    
                    <h5 className="font-bold text-green-700">My Device List</h5>
                    <Link to="/dashboard" className="device-item d-flex justify-content-between align-items-center p-2 mt-2 shadow-sm rounded text-decoration-none">
                      <span>Device 1</span>
                      <span>Update 2h ago</span>
                      <FontAwesomeIcon icon={faChevronRight} className="text-orange-600" />
                    </Link>
                    <div className="device-item d-flex justify-content-between align-items-center p-2 mt-2 shadow-sm rounded">
                      <span>Device 2</span>
                      <span>Update 2h ago</span>
                      <FontAwesomeIcon icon={faChevronRight} className="text-orange-600" />
                    </div>
                    <div className="device-item d-flex justify-content-between align-items-center p-2 mt-2 shadow-sm rounded">
                      <span>Device 3</span>
                      <span>Update 6h ago</span>
                      <FontAwesomeIcon icon={faChevronRight} className="text-orange-600" />
                    </div>
                    <button className="btn btn-warning d-flex align-items-center mt-4">
                      <FontAwesomeIcon icon={faPlus} className="mr-2" />
                      Add New Device
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="warning-section">
              <h2 className="text-green-700 font-bold">Warning List</h2>
              <div className="alert-list">
                {alerts.slice(0, visibleAlerts).map((alert) => (
                  <div
                    key={alert.id}
                    className="warning-item d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex align-items-center">
                      <div className="alert-circle"></div>
                      <div className="ml-3">
                        <h4 className="font-bold">{alert.message}</h4>
                        <p className="mb-1"><strong>Timestamp:</strong> {alert.timestamp}</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      className="alert-checkbox"
                      onChange={() => handleAlertCheck(alert.id)}
                    />
                  </div>
                ))}
                {visibleAlerts < alerts.length ? (
                  <button className="btn btn-secondary mt-3" onClick={handleShowMore}>Show More</button>
                ) : (
                  <button className="btn btn-secondary mt-3" onClick={handleShowLess}>Show Less</button>
                )}
              </div>
            </section>

            <section className="contact-section">
              <h2>Contact Us</h2>
              <form className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" className="form-control" placeholder="Your Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" className="form-control" placeholder="Your Email" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message:</label>
                  <textarea id="message" className="form-control" rows="5" placeholder="Your Message"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </section>
          </div>
        </div>
      </div>
      <div className="chatbot" onClick={toggleChatbot}>
        <FontAwesomeIcon icon={faRobot} className="text-2xl" />
      </div>

      <div className="chatbot-window" id="chatbot-window">
        <div className="chatbot-header">Chatbot</div>
        <div className="chatbot-messages" id="chatbot-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              {message.content}
            </div>
          ))}
        </div>
        <div className="chatbot-input">
          <input
            id="chatbot-input"
            placeholder="Type a message..."
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-message">{loading}</div>}
      </div>
    </div>
  );
};

export default Home;
