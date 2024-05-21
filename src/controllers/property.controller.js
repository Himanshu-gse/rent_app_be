import PropertyRepository from '../models/property/property.repository.js';

const PropertyController = {
  async createProperty(req, res, next) {
    try {
      console.log(req.user);
      const bodyData = req.body;
      const seller = req.user._id;
      const propertyData = { seller: seller, ...bodyData };
      const result = await PropertyRepository.createProperty(propertyData);

      // Check if result is an error message
      if (typeof result === 'string') {
        // If it's an error message, send it in the response
        return res.status(400).json({ success: false, error: result });
      }

      // If no error, property was created successfully
      return res.status(201).json({
        success: true,
        message: 'Property created successfully',
        data: result,
      });
    } catch (error) {
      // Handle any unexpected errors
      return res
        .status(500)
        .json({ success: false, error: 'Internal Server Error' });
    }
  },
  async getPropertiesForSeller(req, res, next) {
    try {
      // Get the seller's user ID from req.user
      const sellerId = req.user._id;
      // Call the repository method to fetch properties for the seller
      const properties = await PropertyRepository.getAllPropertiesForSeller(
        sellerId
      );

      // Send the properties in the response
      res.status(200).json({
        success: true,
        data: properties,
      });
    } catch (error) {
      // Handle any errors that occur
      next(error);
    }
  },
  async updateProperty(req, res, next) {
    try {
      const { propertyId } = req.params;
      const updates = req.body;

      // Call the repository method to update the property
      const updatedProperty = await PropertyRepository.updateProperty(
        propertyId,
        updates
      );

      // Send the updated property in the response
      res.status(200).json({
        success: true,
        data: updatedProperty,
      });
    } catch (error) {
      // Handle any errors that occur
      next(error);
    }
  },
  async deleteProperty(req, res, next) {
    try {
      const { propertyId } = req.params;

      // Call the repository method to delete the property
      await PropertyRepository.deleteProperty(propertyId);

      // Send success message in the response
      res.status(200).json({
        success: true,
        message: 'Property deleted successfully',
      });
    } catch (error) {
      // Handle any errors that occur
      next(error);
    }
  },
  async getAllProperties(req, res, next) {
    try {
      // Call the repository method to fetch all properties
      const properties = await PropertyRepository.getAllProperties();

      // Send the properties in the response
      res.status(200).json({
        success: true,
        data: properties,
      });
    } catch (error) {
      // Handle any errors that occur
      next(error);
    }
  },
  async filterProperties(req, res, next) {
    console.log(req.query);
    try {
      const filters = {
        minPrice: req.query.minPrice,
        maxPrice: req.query.maxPrice,
        minBathrooms: req.query.minBathrooms,
        minBhk: req.query.minBhk,
        minArea: req.query.minArea,
        location: req.query.location,
        // Add more filters as needed
      };

      // Call the repository method to filter properties by price range
      const filteredProperties =
        await PropertyRepository.filterPropertiesByPrice(filters);

      // Send the filtered properties in the response
      res.status(200).json({
        success: true,
        data: filteredProperties,
      });
    } catch (error) {
      // Handle any errors that occur
      next(error);
    }
  },
  async getPropertyDetails(req, res, next) {
    try {
      const { propertyId } = req.params;

      // Call the repository method to fetch property details
      const property = await PropertyRepository.getPropertyDetails(propertyId);

      if (!property) {
        return res
          .status(404)
          .json({ success: false, error: 'Property not found' });
      }

      // Extract seller details from the property
      const sellerDetails = {
        name: `${property.seller.firstName} ${property.seller.lastName}`,
        email: property.seller.email,
        phoneNumber: property.seller.phoneNumber,
      };

      // Send the property details along with seller details in the response
      res.status(200).json({
        success: true,
        data: {
          property,
          seller: sellerDetails,
        },
      });
    } catch (error) {
      // Handle any errors that occur
      next(error);
    }
  },
};

export default PropertyController;
