import db from "../../models/index.js";
import fs from "fs";
import { geocodeAddress } from '../../utils/geocode.js'; 
import moment from "moment-timezone";

export const addProperty = async (req, res) => {
  try {
    const {
      propertyStatus, 
      region,
      subregion,
      uniqueFields,
      info,
      contactInfo,
      propertyId,
      price,
      currency,
      rentalPeriod,
      lat,
      lng
    } = req.body;

    const category = req.params.category;
    const photos = req.files.map(file => file.path);

    let coordinates = { lat: null, lng: null };

    // Проверка на корректность координат
    if (lat && !isNaN(parseFloat(lat)) && lng && !isNaN(parseFloat(lng))) {
      coordinates = { lat: parseFloat(lat), lng: parseFloat(lng) };
    } else {
      const address = `${subregion}, ${region}`;
      coordinates = await geocodeAddress(address);
    }

    // Проверка и преобразование price
    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber)) {
      return res.status(400).json({ error: 'Invalid price value' });
    }

    const currentTime = moment.tz('Asia/Yerevan').format('YYYY-MM-DD HH:mm:ss');
    console.log('Current Time:', currentTime);

    const propertyData = {
      category,
      propertyStatus, 
      propertyId,
      region,
      subregion,
      uniqueFields: JSON.parse(uniqueFields),
      info,
      price: priceNumber, // Используем преобразованное значение
      currency,
      photos,
      contactInfo,
      lat: coordinates.lat,
      lng: coordinates.lng,
      createdAt: currentTime,
      updatedAt: currentTime,
    };

    const rentalCategories = ["rent-house", "rent-apartment", "rent-commercial"];
    if (rentalCategories.includes(category)) {
      propertyData.rentalPeriod = rentalPeriod;
    }

    const newProperty = await db.Property.create(propertyData);
    console.log(newProperty);
    res.status(201).json(newProperty);
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ error: error.message });
  }
};






export const getAdminProperties = async (req, res) => {
  try {
    const properties = await db.Property.findAll({raw: true});
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      region,
      subregion,
      uniqueFields,
      info,
      contactInfo,
      propertyId,
      price,
      currency,
      rentalPeriod,
      oldPhotos,
      lat,
      lng,
      propertyStatus // Добавленное поле "Статус"
    } = req.body;

    const newPhotos = req.files.map(file => file.path);
    const property = await db.Property.findByPk(id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    let coordinates = { lat: property.lat, lng: property.lng };

    if (lat && !isNaN(parseFloat(lat)) && lng && !isNaN(parseFloat(lng))) {
      coordinates = { lat: parseFloat(lat), lng: parseFloat(lng) };
    }  else {
      const address = `${subregion}, ${region}`;
      coordinates = await geocodeAddress(address);
    }

    const rentalCategories = ["rent-house", "rent-apartment", "rent-commercial"];
    const updateData = {
      region,
      subregion,
      uniqueFields: JSON.parse(uniqueFields),
      info,
      contactInfo,
      propertyId,
      price,
      currency,
      photos: [...JSON.parse(oldPhotos), ...newPhotos],
      lat: coordinates.lat,
      lng: coordinates.lng,
      propertyStatus // Добавленное поле "Статус"
    };

    if (rentalCategories.includes(property.category)) {
      updateData.rentalPeriod = rentalPeriod;
    }

    await property.update(updateData);

    const oldPhotosArray = JSON.parse(oldPhotos);
    oldPhotosArray.forEach(photo => {
      if (!updateData.photos.includes(photo)) {
        fs.unlink(photo, (err) => {
          if (err) {
            console.error(`Error deleting photo: ${photo}`, err);
          }
        });
      }
    });

    res.status(200).json(property);
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ error: error.message });
  }
};


export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await db.Property.findByPk(id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }


    property.photos.forEach(photo => {
      fs.unlink(photo, (err) => {
        if (err) {
          console.error(`Error deleting photo: ${photo}`, err);
        }
      });
    });

    await property.destroy();
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ error: error.message });
  }
};
