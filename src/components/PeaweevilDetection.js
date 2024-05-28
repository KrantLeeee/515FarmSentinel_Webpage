import React, { useState, useEffect } from 'react';
import { fetchData } from '../api/azure';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PeaweevilDetection = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [view, setView] = useState('daily'); // 'daily' or 'monthly'

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData(startDate, endDate);
      setData(result);
    };
    getData();
  }, [startDate, endDate]);

  const groupData = (data, view) => {
    const groupedData = {};
    data.forEach(item => {
      const date = new Date(item.TS);
      const key = view === 'monthly' ? `${date.getFullYear()}-${date.getMonth() + 1}` : date.toDateString();
      if (!groupedData[key]) {
        groupedData[key] = 0;
      }
      groupedData[key] += item.Weevil_number;
    });
    return groupedData;
  };

  const chartData = () => {
    const groupedData = groupData(data, view);
    const labels = Object.keys(groupedData);
    const values = Object.values(groupedData);

    return {
      labels,
      datasets: [
        {
          label: 'Peaweevil Count',
          data: values,
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1
        }
      ]
    };
  };

  return (
    <div className="chart-section">
      <h3 className="font-bold">Peaweevil Detection</h3>
      <div className="date-picker-container">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div className="view-selector">
        <select value={view} onChange={(e) => setView(e.target.value)}>
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <Line data={chartData()} />
    </div>
  );
};

export default PeaweevilDetection;
