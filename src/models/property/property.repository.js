import PropertyModel from './property.schema.js';

const PropertyRepository = {
  async createProperty(propertyData) {
    try {
      // Check if required fields are provided
      if (
        !propertyData.title ||
        !propertyData.description ||
        !propertyData.price ||
        !propertyData.location
      ) {
        return 'Required fields are missing';
      }

      // Validate price
      if (propertyData.price <= 0) {
        return 'Price must be greater than 0';
      }
      // Create a new property using the provided data
      const newProperty = await PropertyModel.create(propertyData);
      return newProperty;
    } catch (error) {
      // Handle any errors that occur during property creation
      return 'Failed to create property: ' + error.message;
    }
  },
  async getAllPropertiesForSeller(sellerId) {
    try {
      // Query properties where sellerId matches the provided sellerId
      const properties = await PropertyModel.find({ seller: sellerId });
      return properties;
    } catch (error) {
      // Handle any errors that occur during property retrieval
      throw new Error('Failed to fetch properties: ' + error.message);
    }
  },
  async updateProperty(propertyId, updates) {
    try {
      // Find the property by ID and update it with the provided updates
      const updatedProperty = await PropertyModel.findByIdAndUpdate(
        propertyId,
        updates,
        { new: true }
      );
      return updatedProperty;
    } catch (error) {
      // Handle any errors that occur during property update
      throw new Error('Failed to update property: ' + error.message);
    }
  },
  async deleteProperty(propertyId) {
    try {
      // Find the property by ID and delete it
      const deletedProperty = await PropertyModel.findByIdAndDelete(propertyId);
      return deletedProperty;
    } catch (error) {
      // Handle any errors that occur during property deletion
      throw new Error('Failed to delete property: ' + error.message);
    }
  },
  async getAllProperties() {
    try {
      // Find all properties in the database
      const properties = await PropertyModel.find();
      return properties;
    } catch (error) {
      // Handle any errors that occur during property retrieval
      throw new Error('Failed to fetch properties: ' + error.message);
    }
  },
  async filterPropertiesByPrice(filters) {
    try {
      const query = {};

      if (filters.minPrice && filters.maxPrice) {
        query.price = { $gte: filters.minPrice, $lte: filters.maxPrice };
      }

      if (filters.minBathrooms) {
        query.bathrooms = { $gte: filters.minBathrooms };
      }

      if (filters.minBhk) {
        query.bhk = { $gte: filters.minBhk };
      }

      if (filters.minArea) {
        query.area = { $gte: filters.minArea };
      }

      if (filters.location) {
        query.location = filters.location;
      }

      // Find properties based on the constructed query
      const properties = await PropertyModel.find(query);
      return properties;
    } catch (error) {
      // Handle any errors that occur during property retrieval
      throw new Error('Failed to filter properties: ' + error.message);
    }
  },
  async getPropertyDetails(propertyId) {
    try {
      // Find the property by ID and populate the 'seller' field to get the seller details
      const property = await PropertyModel.findById(propertyId).populate(
        'seller',
        'firstName lastName email phoneNumber'
      );
      return property;
    } catch (error) {
      // Handle any errors that occur during property retrieval
      throw new Error('Failed to fetch property details: ' + error.message);
    }
  },
};

export default PropertyRepository;
