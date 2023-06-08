const deleteFile = require("../helpers/deleteFile");
const models = require("../models");
const item = models.item;

class ItemController {
  static async add(req, res) {
    try {
      const accountId = +req.accountData.id;
      const { name, purchasePrice, sellingPrice, stock } = req.body;
      const image = req.file.filename || "";
      const result = await item.create({
        image,
        name,
        purchasePrice,
        sellingPrice,
        stock,
        accountId,
      });

      if (result != null) {
        res.status(201).json({
          status: true,
          message: "item has been added!",
          data: result,
        });
      } else {
        res.status(400).json({
          status: false,
          error: "item failed to added!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async getItems(req, res) {
    try {
      const items = await item.findAll();

      res.status(200).json({
        status: true,
        count: items.length,
        data: items,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async getItemsByAccountId(req, res) {
    try {
      const accountId = +req.params.id;
      const items = await item.findAll({ where: { accountId } });

      res.status(200).json({
        status: true,
        count: items.length,
        data: items,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async editWithImage(req, res) {
    try {
      const id = +req.params.id;
      const { name, purchasePrice, sellingPrice, stock } = req.body;
      const _item = await item.findOne({ where: { id } });
      const image = req.file.filename;
      const result = await item.update(
        {
          image,
          name,
          purchasePrice,
          sellingPrice,
          stock,
        },
        { where: { id } }
      );
      if (result[0] === 1) {
        deleteFile(_item.image);
        res.status(201).json({
          status: true,
          message: "update item successful!",
        });
      } else {
        deleteFile(image);
        res.status(400).json({
          status: false,
          error: "update item unsuccessful!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async editNoImage(req, res) {
    try {
      const id = +req.params.id;
      const { name, purchasePrice, sellingPrice, stock } = req.body;
      const result = await item.update(
        {
          name,
          purchasePrice,
          sellingPrice,
          stock,
        },
        { where: { id } }
      );
      if (result[0] === 1) {
        res.status(201).json({
          status: true,
          message: "update item successful!",
        });
      } else {
        res.status(400).json({
          status: false,
          error: "update item unsuccessful!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.id;
      const _item = await item.findOne({ where: { id } });
      const result = await item.destroy({ where: { id } });

      if (result === 1) {
        deleteFile(_item.image);

        res.status(201).json({
          status: true,
          message: "delete item successful!",
        });
      } else {
        res.status(400).json({
          status: false,
          message: "delete item unsuccessful",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error,
      });
    }
  }
}

module.exports = ItemController;
