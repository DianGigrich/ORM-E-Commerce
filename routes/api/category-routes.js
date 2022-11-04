const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get('/', (req, res) => {
  Category.findAll({
    include: [Product]
  }).then(allCategorys => {
    res.json(allCategorys)
  }).catch(err => {
    console.log(err);
    res.status(500).json({ err: err })
  })
});

// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id, {
    include: [{
      model: Product,
      attributes: ["product_name"]
    }]
  }).then(oneCategory => {
    res.json(oneCategory)
  }).catch(err => {
    console.log(err);
    res.status(500).json({ err: err })
  })
});

// create a new category
router.post('/', (req, res) => {
  console.log(req.body)
  Category.create({
    id: req.body.id,
    category_name: req.body.category_name
  }).then(data => {
    res.json(data)
  }).catch(err => {
    console.log(err);
    res.status(500).json({ err: err })
  })
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(req.body,
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      if (updatedCategory[0] === 0) {
        return res.status(404).json({ msg: "no category found!" });
      }
      res.json(updatedCategory);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((delCategory) => {
      if (delCategory === 0) {
        return res.status(404).json({ msg: "no Category found!" });
      }
      res.json(delCategory);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

module.exports = router;
