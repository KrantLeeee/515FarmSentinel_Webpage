export const fetchData = async (startDate, endDate) => {
  console.log('Fetching data for dates:', startDate, endDate);
  const response = await fetch(`https://farmsentinelflask.azurewebsites.net/api/data?start_date=${startDate.toISOString()}&end_date=${endDate.toISOString()}`);
  const data = await response.json();
  console.log('Fetched data:', data);
  return data.map(item => ({
    Description: item.Description,
    ImageUrl: item.ImageUrl,
    Timestamp: item.Timestamp,
    TS: item.TS,
    Weevil_number: item.Weevil_number,
    rowKey: item.rowKey
  }));
};

export const captureNow = async () => {
  try {
    const response = await fetch('https://farmsentinelflask.azurewebsites.net/api/capture', {
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
    const response = await fetch('https://farmsentinelflask.azurewebsites.net/api/update_peaweevil', {
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

export const sendMessageToChatbot = async (messages) => {
  try {
    const response = await fetch('https://farmsentinelflask.azurewebsites.net/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages })
    });
    const data = await response.json();
    console.log('Chatbot response:', data);
    return data.message;
  } catch (error) {
    console.error('Error sending message to chatbot:', error);
    throw error;
  }
};