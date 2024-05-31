import React, { useState, useEffect } from 'react';
import './Dashboard2.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchData, captureNow, updateWeevilNumber } from '../api/azure';
import { Link } from 'react-router-dom';

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
    <div className="dashboard">
      <header>
        <div className="logo">
          < img src="/assets/images/logo.jpg" alt="Row 4" className="logo" />
          <h1>Sentinel</h1>
        </div>
        <div className="profile">
          < img src="https://via.placeholder.com/50" alt="Profile" />
        </div>
      </header>
      <main>
        <div className="sidebar">
          <ul>
            <Link to="/" className="home-link">Home</Link>
            <li>Library</li>
            <li>Settings</li>
          </ul>
        </div>
        <div className="content">
          <div className="header2">
            <h2>Device 1 Picture Library</h2>
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
          {captureMessage && <p className="capture-message">{captureMessage}</p >}
        </div>
        <div className="controls">
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
        </div>
      </main>
    </div>
  );
}

export default Dashboard2;