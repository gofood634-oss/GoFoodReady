const Wishlist = require('../models/Wishlist');

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ userId: req.userId })
      .populate('itemId', 'name price image restaurantId')
      .sort({ createdAt: -1 });
    res.json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
};

exports.addToWishlist = async (req, res) => {
  try {
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({ error: 'Item ID is required' });
    }

    const exists = await Wishlist.findOne({ userId: req.userId, itemId });
    if (exists) {
      return res.status(400).json({ error: 'Item already in wishlist' });
    }

    const wishlist = new Wishlist({
      userId: req.userId,
      itemId,
    });

    await wishlist.save();
    res.status(201).json({ message: 'Added to wishlist', wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add to wishlist' });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findByIdAndDelete(req.params.id);

    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist item not found' });
    }

    res.json({ message: 'Removed from wishlist' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to remove from wishlist' });
  }
};
