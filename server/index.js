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
  const startRequestTime = Date.now(); 

  const companyName = req.params.companyName;

  
  const apiUrl = `https://api.company-information.service.gov.uk/advanced-search/companies?company_name_includes=${companyName}&size=5000&company_status=active`;
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

      const itemsArray = data.items || [];

      const companyNameArray = itemsArray.map(item => item.company_name);

      const endRequestTime = Date.now();
      const requestDuration = endRequestTime - startRequestTime;

      console.log(`API request took ${requestDuration} milliseconds`);

      for(companyNameArray ; 0<=companyNameArray ; companyNameArray--){
        
      }

      res.json(companyNameArray);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }

  
});


app.listen(PORT , () => {
    console.log("server is running on ", PORT);
})