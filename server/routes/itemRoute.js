const { ItemController } = require("../controllers");
const { auth, upload } = require("../middlewares");

const itemRoute = require("express").Router();

itemRoute.get("/", auth, ItemController.getItems);
itemRoute.get("/:id", auth, ItemController.getItemsByAccountId);
itemRoute.post("/add", auth, upload.single("image"), ItemController.add);
itemRoute.put("/edit/:id", auth, ItemController.editNoImage);
itemRoute.put("/edit/image/:id", auth, upload.single("image"), ItemController.editWithImage);
itemRoute.get("/delete/:id", auth, ItemController.delete);

module.exports = itemRoute;
