import PropertyModel from '../models/property/property.schema.js';
export const authorizeSeller = (req, res, next) => {
  if (!req.user || req.user.role !== 'seller') {
    return res.send('Unauthorized', 401);
  }
  next();
};

export const checkPropertyOwner = async (req, res, next) => {
  try {
    const propertyId = req.params.id;
    const property = await PropertyModel.findById(propertyId);
    if (!property || property.seller.toString() !== req.user._id.toString()) {
      return res.send('Unauthorized', 401);
    }
    next();
  } catch (error) {
    res.send('Internal Server Error', 500);
  }
};
