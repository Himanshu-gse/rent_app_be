import express from "express";
import Controller from "../controllers/property.controller.js";
import authenticateUser from "../middleware/auth.middleware.js";
import { authorizeSeller } from "../middleware/property.middleware.js";
const Router = express.Router();

// Route to create a new property
Router.post("/create", Controller.createProperty);
Router.get("/", Controller.getPropertiesForSeller);
Router.get("/all", Controller.getAllProperties);
Router.get("/filter", Controller.filterProperties);

// Route to fetch property details along with seller information
Router.get("/:propertyId", Controller.getPropertyDetails);
// Route to update a property
Router.put("/update/:propertyId", authorizeSeller, Controller.updateProperty);
// Route to delete a property
Router.delete(
  "/delete/:propertyId",
  authorizeSeller,
  Controller.deleteProperty
);

export default Router;
