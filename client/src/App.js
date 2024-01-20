function App() {

  async function getCompanyInfo(companyName) {
    companyName = "Marine" //aranacak isim manuel olarak giriliyor şu anlık
    const apiUrl = `http://localhost:5000/company/${companyName}`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('API request failed');
      }
  
      const data = await response.json();
      console.log('Company Info:', data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  

  return (
    <div className="App">
        <button onClick={getCompanyInfo}>Company info</button>
    </div>
  );
}

export default App;
