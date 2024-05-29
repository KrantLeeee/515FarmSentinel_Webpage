export const fetchData = async (startDate, endDate) => {
  const response = await fetch(`https://farmsentinelflask.azurewebsites.net/api/data?start_date=${startDate.toISOString()}&end_date=${endDate.toISOString()}`);
  const data = await response.json();
  return data.map(item => ({
      Timestamp: item.Timestamp,
      Weevil_number: item.Weevil_number,
      TS: item.TS
      
  }));
};
