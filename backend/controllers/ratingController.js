import Crop from "../models/Crop.js";
import Farmer from "../models/Farmer.js";
import Order from "../models/Order.js";
// Update rating
export const updateCropRating = async (req, res) => {
    console.log("first")
  try {
    const { farmer, name} = req.params;
    const ratingValue = Number(req.body.rating);
   const user=req.body.user;
    const farmerDoc = await Farmer.findOne({ name: farmer });
console.log("1")
    if (!farmerDoc) {
      return res.status(404).json({ message: "Farmer not found" });
    }
    console.log("reached")
 console.log(farmerDoc.email)
 console.log(name)
    const crop = await Crop.findOne({
      farmer: farmerDoc.email,
      name: name
    });

    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    const newTotalUsers = crop.total_rating + 1;

    const newRating =
      ((crop.rating * crop.total_rating) + ratingValue) / newTotalUsers;

    crop.rating = newRating;
    crop.total_rating = newTotalUsers;

    await crop.save();
    console.log("&&&&")
console.log(user)
console.log(name)
console.log(farmer)
    await Order.updateOne(
      {
        customerName: user,
        item: name,
        farmerName: farmer
      },
      { $set: { status: "rated" } }
    );

    res.json({
      message: "Rating updated successfully",
      rating: crop.rating,
      total_rating: crop.total_rating
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};