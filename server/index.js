const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv');


dotenv.config();


const app = express();
app.use(cors())
app.use(express.json());

const apiKey = '8dc91acf-5646-4c5d-abef-5524ea035071';


const PORT = 5000;

app.get('/company/:companyName', async (req, res) => {
    const companyName = req.params.companyName;
    const startIndex = 0;
    const pageSize = 5000;
    let allData = [];
    let exactMatch;
    let blok = 1;
    const apiUrlBase = 'https://api.company-information.service.gov.uk/advanced-search/companies';
  
    async function fetchData(startIndex) {
      const apiUrl = `${apiUrlBase}?company_name_includes=${companyName}&size=${pageSize}&company_status=active&company_status=open&company_status=liquidation&start_index=${startIndex}`;
  
      const startDate = Date.now();
      try {
        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': `Basic ${btoa(apiKey + ':')}`
          }
        });
  
        if (!response.ok) {
          // Handle API request failure
          throw new Error('API request failed');
        }
  
        const data = await response.json();
  
        const endDate = Date.now();
  
        const itemsArray = data.items || [];
        const companyNameArray = itemsArray.map(item => item.company_name);
  
        exactMatch = itemsArray.some(item => item.company_name === companyName);
  
        allData = allData.concat(companyNameArray);
  
        console.log(`${blok}. 5000 blok çekildi süre = ${endDate - startDate} ms`);
        blok = blok + 1;
  
        if (itemsArray.length > 0 && itemsArray.length % pageSize === 0 && startIndex < 5000) {
          startIndex += pageSize;
          await fetchData(startIndex);
        } else {
          // All data fetched, send the result
          res.json(exactMatch);
        }
      } catch (error) {
        // Handle API request error
        console.error('API request error:', error.message);
        res.json(false); // Set exactMatch to false in case of an error
      }
    }
  
    fetchData(startIndex);
  });
  
  

app.listen(PORT , () => {
    console.log("server is running on ", PORT);
})