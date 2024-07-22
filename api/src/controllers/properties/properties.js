import db from "../../models/index.js";
import { Op } from "sequelize";
import moment from "moment-timezone";


const Property = db.Property;

export const getProperties = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 9,
      search,
      propertyId,
      region,
      subregion,
      priceRange,
      currency,
      searchFields,
      sortBy = "",
      propertyStatus, // Фильтр по статусу недвижимости
    } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = {};

    if (search) {
      whereClause[Op.or] = [
        { propertyId: search },
        { region: { [Op.like]: `%${search}%` } },
        { subregion: { [Op.like]: `%${search}%` } },
      ];
    }

    if (propertyId) {
      whereClause.propertyId = propertyId;
    }

    if (region) {
      whereClause.region = {
        [Op.like]: `%${region}%`,
      };
    }

    if (subregion) {
      whereClause.subregion = {
        [Op.like]: `%${subregion}%`,
      };
    }

    if (priceRange && priceRange !== "null" && priceRange !== "{}") {
      try {
        const parsedPriceRange = JSON.parse(priceRange);
        if (parsedPriceRange.from && parsedPriceRange.to) {
          whereClause.price = {
            [Op.between]: [
              Number(parsedPriceRange.from),
              Number(parsedPriceRange.to)
            ],
          };
        } else if (parsedPriceRange.from) {
          whereClause.price = { [Op.gte]: Number(parsedPriceRange.from) };
        } else if (parsedPriceRange.to) {
          whereClause.price = { [Op.lte]: Number(parsedPriceRange.to) };
        }
      } catch (error) {
        return res.status(400).json({ message: "Invalid price range format" });
      }
    }

    if (currency) {
      whereClause.currency = currency;
    }

    if (propertyStatus) {
      whereClause.propertyStatus = propertyStatus; // Фильтр по статусу недвижимости
    }

    const uniqueFieldsWhere = {};

    if (searchFields && searchFields !== "null" && searchFields !== "{}") {
      try {
        const parsedSearchFields = JSON.parse(searchFields);
        for (const [key, value] of Object.entries(parsedSearchFields)) {
          if (value && value !== "null") {
            if (
              typeof value === "object" &&
              value.from !== undefined &&
              value.to !== undefined
            ) {
              uniqueFieldsWhere[`uniqueFields.${key}`] = {
                [Op.between]: [Number(value.from), Number(value.to)],
              };
            } else if (typeof value === "object" && value.from !== undefined) {
              uniqueFieldsWhere[`uniqueFields.${key}`] = {
                [Op.gte]: Number(value.from),
              };
            } else if (typeof value === "object" && value.to !== undefined) {
              uniqueFieldsWhere[`uniqueFields.${key}`] = {
                [Op.lte]: Number(value.to),
              };
            } else if (Array.isArray(value)) {
              uniqueFieldsWhere[`uniqueFields.${key}`] = { [Op.or]: value };
            } else {
              uniqueFieldsWhere[`uniqueFields.${key}`] = value;
            }
          }
        }
      } catch (error) {
        return res
          .status(400)
          .json({ message: "Invalid search fields format" });
      }
    }

    let order = [["createdAt", "desc"]]; // Default order

    if (sortBy) {
      if (sortBy === "price-asc") {
        order = [["price", "asc"]];
      } else if (sortBy === "price-desc") {
        order = [["price", "desc"]];
      } else if (sortBy === "createdAt-asc") {
        order = [["createdAt", "asc"]];
      } else if (sortBy === "createdAt-desc") {
        order = [["createdAt", "desc"]];
      }
    }

    const { count, rows: properties } = await Property.findAndCountAll({
      where: {
        ...whereClause,
        ...uniqueFieldsWhere,
      },
      offset,
      limit: Number(limit),
      order,
    });

    res.status(200).json({
      totalCount: count,
      properties,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPropertiesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { search, page = 1, limit = 9, sortBy = "", ...filters } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = { category };

    if (filters.region && filters.region !== "null") {
      whereClause.region = { [Op.like]: `%${filters.region}%` };
    }

    if (filters.subregion && filters.subregion !== "null") {
      whereClause.subregion = { [Op.like]: `%${filters.subregion}%` };
    }

    if (filters.priceRange && filters.priceRange !== "{}") {
      try {
        const priceRange = JSON.parse(filters.priceRange);
        if (priceRange.from && priceRange.to) {
          whereClause.price = {
            [Op.between]: [Number(priceRange.from), Number(priceRange.to)],
          };
        } else if (priceRange.from) {
          whereClause.price = { [Op.gte]: Number(priceRange.from) };
        } else if (priceRange.to) {
          whereClause.price = { [Op.lte]: Number(priceRange.to) };
        }
      } catch (error) {
        return res.status(400).json({ message: "Invalid price range format" });
      }
    }

    if (filters.currency && filters.currency !== "null") {
      whereClause.currency = filters.currency;
    }

    const uniqueFieldsWhere = {};

    if (filters.searchFields && filters.searchFields !== "{}") {
      try {
        const searchFields = JSON.parse(filters.searchFields);
        for (const [key, value] of Object.entries(searchFields)) {
          if (value && value !== "null") {
            if (
              typeof value === "object" &&
              value.from !== undefined &&
              value.to !== undefined
            ) {
              uniqueFieldsWhere[`uniqueFields.${key}`] = {
                [Op.between]: [Number(value.from), Number(value.to)],
              };
            } else if (typeof value === "object" && value.from !== undefined) {
              uniqueFieldsWhere[`uniqueFields.${key}`] = {
                [Op.gte]: Number(value.from),
              };
            } else if (typeof value === "object" && value.to !== undefined) {
              uniqueFieldsWhere[`uniqueFields.${key}`] = {
                [Op.lte]: Number(value.to),
              };
            } else if (Array.isArray(value)) {
              uniqueFieldsWhere[`uniqueFields.${key}`] = { [Op.or]: value };
            } else {
              uniqueFieldsWhere[`uniqueFields.${key}`] = value;
            }
          }
        }
      } catch (error) {
        console.error("Invalid search fields format:", error);
        return res
          .status(400)
          .json({ message: "Invalid search fields format" });
      }
    }

    if (search) {
      whereClause[Op.or] = [
        { propertyId: { [Op.like]: `%${search}%` } },
        { region: { [Op.like]: `%${search}%` } },
        { subregion: { [Op.like]: `%${search}%` } },
      ];
    }

    let order = [["createdAt", "desc"]]; // Default order

    if (sortBy) {
      if (sortBy === "price-asc") {
        order = [["price", "asc"]];
      } else if (sortBy === "price-desc") {
        order = [["price", "desc"]];
      } else if (sortBy === "createdAt-asc") {
        order = [["createdAt", "asc"]];
      } else if (sortBy === "createdAt-desc") {
        order = [["createdAt", "desc"]];
      }
    }

    const { count, rows: properties } = await Property.findAndCountAll({
      where: {
        ...whereClause,
        ...uniqueFieldsWhere,
      },
      offset,
      limit: Number(limit),
      order,
    });

    res.status(200).json({
      totalCount: count,
      properties,
    });
  } catch (error) {
    console.error("Error fetching properties by category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const getPropertyDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await db.Property.findByPk(id);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Преобразование временных данных в нужную временную зону
    const propertyData = property.toJSON();
    propertyData.createdAt = moment(propertyData.createdAt).tz('Asia/Yerevan').format('YYYY-MM-DD HH:mm:ss');
    propertyData.updatedAt = moment(propertyData.updatedAt).tz('Asia/Yerevan').format('YYYY-MM-DD HH:mm:ss');

    console.log(propertyData);
    res.status(200).json(propertyData);
  } catch (error) {
    console.error('Error fetching property details:', error);
    res.status(500).json({ error: error.message });
  }
};




export const getTopProperties = async (req, res) => {
  try {
    const properties = await Property.findAll({
      where: {
        propertyStatus: 'top',
      },
      limit: 10, // Ограничиваем количество топовых объектов недвижимости
      order: [["createdAt", "desc"]],
    });

    res.status(200).json({ properties });
  } catch (error) {
    console.error("Error fetching top properties:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};











