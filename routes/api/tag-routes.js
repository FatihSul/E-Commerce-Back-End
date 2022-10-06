const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The /api/tags endpoint

// GET all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      // JOIN with products, using the productTag through table
      include: [{ 
        model: Product, 
        through: ProductTag
        }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET to find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      // JOIN with products, using the producttag through table
      include: [{ 
        model: Product, 
        through: ProductTag
        }]
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE product data
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    res.status(200).json(updatedTag);
  }
  catch(err){
    res.status(400).json(err)
  }
});

// DELETE one tag by its id value
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
