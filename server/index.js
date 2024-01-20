const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv');


dotenv.config();


const app = express();
app.use(cors())
app.use(express.json());

const apiKey = '8dc91acf-5646-4c5d-abef-5524ea035071';


const PORT = 5000;

app.get('/company/:companyNumber', async (req, res) => {
    const companyNumber = req.params.companyNumber;
    const apiUrl = `https://api.company-information.service.gov.uk/advanced-search/companies?company_name_includes=${companyNumber}`;
  
    try {
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Basic ${btoa(apiKey + ':')}`
        }
      });
  
      if (!response.ok) {
        throw new Error('API request failed');
      }
  
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });




app.listen(PORT , () => {
    console.log("server is running", PORT);
})