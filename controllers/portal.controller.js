import { SnookerTable } from "../models/snooker.model.js";

const portal = async (req, res) => {
    try {
        const snookerTables = await SnookerTable.find();
        console.log(snookerTables);
        
        res.render(`portal.ejs`, {snookerTables});
    }catch(error) {
        console.error("Error fetching snooker tables:", error);
        res.status(500).send("Internal Server Error, Can't load tables");
    }


};
  


export default portal ;
  
