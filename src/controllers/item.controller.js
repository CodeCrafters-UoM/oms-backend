const itemService = require("../services/item.service");

// exports.getAllItems=async(req,res)=>{
//   try{
//     const items=await itemService.getAllItems();
//     res.json(items);
//   }
//   catch(e){
//     res.json(e);
//   }
// }

//retrive item by id
exports.getItemById = async (req, res) => {
  const productCode = "P100";
  try {
    //const productCode = req.params.productCode; // Assuming productCode is passed as a parameter in the request URL
    const item = await itemService.getItemById(productCode);
    
    if (!item) {
      // If the item with the specified ID is not found, return a 404 Not Found response
      return res.status(404).json({ error: "Item not found" });
    }
    
    res.json(item);
  } catch (error) {
    console.error("Error occurred while fetching item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



// async function getAllItems(req, res) {
//   const items = await itemService.getAllItems();
//   res.json(items);
// }


// module.exports = {
//   getAllItems
// };
