export const fetchData = async (startDate, endDate) => {
  console.log('Fetching data for dates:', startDate, endDate);
  const response = await fetch(`http://farmsentinelflask.azurewebsites.net/api/data?start_date=${startDate.toISOString()}&end_date=${endDate.toISOString()}`);
  const data = await response.json();
  console.log('Fetched data:', data); // 添加日志
  return data.map(item => ({
    Description: item.Description,
    ImageUrl: item.ImageUrl,
    Timestamp: item.Timestamp,
    TS: item.TS,
    Weevil_number: item.Weevil_number,
    rowKey: item.rowKey  // 确认字段名称
  }));
};

export const captureNow = async () => {
  try {
    const response = await fetch('http://farmsentinelflask.azurewebsites.net/api/capture', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error capturing now:', error);
    throw error;
  }
};

export const updateWeevilNumber = async (rowKey, newWeevilNumber) => {
  console.log('Sending data:', { rowKey, newWeevilNumber });
  try {
    const response = await fetch('http://farmsentinelflask.azurewebsites.net/api/update_peaweevil', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rowKey, newWeevilNumber })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating weevil number:', error);
    throw error;
  }
};