import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchData, captureNow, updateWeevilNumber } from '../api/azure';
import { Link } from 'react-router-dom';
import './Home.css';  // Ensure Home.css is imported
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCamera, faEnvelope, faBell, faCog, faMoon, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';


function Dashboard2() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [interval, setInterval] = useState(1);
  const [captureMessage, setCaptureMessage] = useState('');
  const [selectedWeevilNum, setSelectedWeevilNum] = useState(null);
  const [selectedRowKey, setSelectedRowKey] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        console.log('Fetching data for dates:', startDate, endDate);
        const result = await fetchData(startDate, endDate);
        console.log('Fetched data:', result); // 添加日志
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, [startDate, endDate]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleCaptureNow = async () => {
    try {
      const response = await captureNow();
      setCaptureMessage(response.message);
    } catch (error) {
      setCaptureMessage('Failed to trigger capture');
    }
  };

  const handleIntervalChange = (event) => {
    setInterval(Number(event.target.value));
  };

  const handleWeevilNumChange = (delta, rowKey) => {
    console.log('RowKey in handleWeevilNumChange:', rowKey); // 确认rowKey传递正确
    setSelectedRowKey(rowKey);
    console.log('RowKey in selectedRowKey:', selectedRowKey);
    setSelectedWeevilNum(prev => (prev !== null ? prev + delta : delta));
  };

  const handleUpdateWeevilNum = async () => {
    if (selectedRowKey !== null) {
      console.log('Updating rowKey:', selectedRowKey, 'with new number:', selectedWeevilNum); // 添加这一行，检查数据传递
      try {
        await updateWeevilNumber(selectedRowKey, selectedWeevilNum);
        setCaptureMessage('Weevil number updated');
        // 更新前端显示的数据
        setData(prevData => prevData.map(item => 
          item.rowKey === selectedRowKey ? { ...item, Weevil_number: selectedWeevilNum } : item
        ));
        setSelectedRowKey(null);
        setSelectedWeevilNum(null);
      } catch (error) {
        setCaptureMessage('Failed to update weevil number');
      }
    }
  };
  
  return (
    <div className="dashboard-container">
      <header className="header fixed-top"> {/* Apply fixed position */}
        <div className="d-flex align-items-center">
          < img src={require('../assets/images/microsoft.png')} alt="Row 4" className="logo" />
          <span className="font-bold text-lg ml-2 text-white" >Farmbeats</span>
        </div>
        <div className="logo-container">
          < img src={require('../assets/images/logo.jpg')} alt="Logo" className="logo" />
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
              <Link to="/"><FontAwesomeIcon icon={faHome} className="icon mb-4" /></Link>
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
            <h1 className="text-green-700 font-bold" style={{ fontFamily: 'Merriweather', color: '#6D8C54' }}>Device 1 Picture Library</h1>
            <div className="d-flex align-items-top">
              <section className="dashboard-section-picture">
                <div>
                  <div className="dashboard-svh d-flex justify-content-between">
                  <div class="parent-container">
                  <div className="date-selector">
                      <button>&lt;</button>
                      <DatePicker 
                        selected={startDate} 
                        onChange={handleStartDateChange} 
                        dateFormat="MMMM d, yyyy"
                        className="date-picker"
                      />
                      <DatePicker 
                        selected={endDate} 
                        onChange={handleEndDateChange} 
                        dateFormat="MMMM d, yyyy"
                        className="date-picker"
                      />
                      <button>&gt;</button>
                    </div>
                    <div className="pictures">
                      {data.length === 0 ? (
                        <p>No data available for the selected date range.</p >
                      ) : (
                        data.map((item, index) => (
                          <div key={index} className="picture">
                            < img src={item.ImageUrl} alt={`Row ${index + 1}`} className="testimage" />
                            <div className="picture-info">
                              <div className="picture-time">Capture time: {new Date(item.Timestamp).toLocaleString()}</div>
                              <div className="peaewevil-num">
                                Peaweevil num: 
                                <button onClick={() => handleWeevilNumChange(-1, item.rowKey)}>-</button>
                                <span>{selectedRowKey === item.rowKey ? selectedWeevilNum : item.Weevil_number}</span>
                                <button onClick={() => handleWeevilNumChange(1, item.rowKey)}>+</button>
                              </div>
                              <button onClick={handleUpdateWeevilNum}>Update</button>
                              <div className="category">Category: peaweevil</div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  </div>
                </div>
              </section>

              <section className="controls">
                <h3>Picture Capture Interval</h3>
                <input 
                  type="range" 
                  min="1" 
                  max="24" 
                  step="0.1" 
                  value={interval}
                  onChange={handleIntervalChange} 
                />
                <div className="interval-display">
                  {Math.round(interval * 10) / 10} h/time
                </div>
                <button>Save Changes</button>
                <button>Apply to All</button>
                <button className="biggerbutton" onClick={handleCaptureNow}>Capture Now</button>
                <button className="biggerbutton">Request Maintenance</button>
                {captureMessage && <p className="capture-message">{captureMessage}</p >}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard2;