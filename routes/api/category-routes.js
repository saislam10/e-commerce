const router = require('express').Router();
const { Category, Product, Tag, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Product data
  Category.findAll({
    include: [
      Product, {
        model: Tag,
        through: ProductTag
      }
    ],
  })
    .then((categories) => res.json(categories))
    .catch((err) => res.json(err))
});

router.get('/:id', (req, res) => {
  // find a single category by its `id`
  // be sure to include its associated Product data
  Category.findByPk({
    where: [{
      id: req.params.id
    }],
    include: [
      Product, {
        model: Tag,
        through: ProductTag
      },
    ],
  })
    .then((categories) => res.json(categories))
    .catch((err) => res.json(err))

});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a category's name by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id);
    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;