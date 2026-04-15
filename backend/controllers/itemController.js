const Item = require('../models/Item');

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate('restaurantId', 'name address');
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};

exports.getItemsByRestaurant = async (req, res) => {
  try {
    const items = await Item.find({ restaurantId: req.params.restaurantId });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};

exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('restaurantId', 'name address');
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch item' });
  }
};

exports.createItem = async (req, res) => {
  try {
    const { restaurantId, name, description, price, image, category } = req.body;

    if (!restaurantId || !name || !price) {
      return res.status(400).json({ error: 'RestaurantId, name, and price are required' });
    }

    const item = new Item({
      restaurantId,
      name,
      description: description || '',
      price,
      image: image || '',
      category: category || '',
    });

    await item.save();
    res.status(201).json({ message: 'Item created successfully', item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create item' });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { name, description, price, image, category },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item updated successfully', item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update item' });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
};
