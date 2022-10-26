import ItemModel from '../models/ItemModel.js';

// CRUD

//Создание записи для таблицы
export const create = async (req, res, next) => {
  // Генерация уникального ID
  let ID = 0;
  const Items = (await ItemModel.find()).map((item) => Number(item.ID));
  while (Items.includes(ID)) {
    ID++;
  }

  try {
    const doc = new ItemModel({
      ID: ID,
      name: req.body.name,
      weight: req.body.weight,
      available: req.body.available,
      date: req.body.date,
      customer: req.body.customer,
    });
    const post = await doc.save();
    res.json(post);
  } catch (err) {
    next(err);
  }
};

export const getSingleItem = async (req, res, next) => {
  try {
    const item = await ItemModel.findById(req.params.id);
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
};

export const deleteItem = async (req, res, next) => {
  const itemId = req.body.id;
  try {
    await ItemModel.findByIdAndDelete(itemId);
    res.status(200).json('Item has been deleted.');
  } catch (err) {
    next(err);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const updatedItem = await ItemModel.findByIdAndUpdate(
      req.body._id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedItem);
  } catch (err) {
    next(err);
  }
};

// Получение всех записей
// Также прямо тут реализована фильтрация
// q - query
// c - column (name, amount, distance)
// l - logic (<, =, >)
export const getAllItems = async (req, res, next) => {
  try {
    const { q, c, l } = req.query;

    const Items = await ItemModel.find();
    const search = (data) => {
      return data.filter((item) => {
        if (
          c === 'name' ||
          c === 'customer' ||
          c === 'weight' ||
          l === 'include'
        ) {
          return [c].some((key) =>
            item[key].toLowerCase().includes(q.toLowerCase())
          );
        } else {
          switch (l) {
            case 'less':
              return item[c] - q < 0;
            case 'equal':
              return item[c] == q;
            case 'greater':
              return item[c] - q > 0;
          }
        }
      });
    };

    q ? res.json(search(Items)) : res.json(Items);
  } catch (err) {
    next(err);
  }
};
