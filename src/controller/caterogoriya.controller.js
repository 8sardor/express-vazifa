import { getData, setData } from "../helpers/filedata.js";

const fileName = "categories.json";

class ProductController {
  // Hamma kategoriyalarni olish
  async getAllCategories(req, res) {
    try {
      const categories = await getData(fileName);
      res.status(200).json({ success: true, data: categories });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // ID bo'yicha bitta kategoriyani olish
  async getCategoryById(req, res) {
    try {
      const categories = await getData(fileName);
      const category = categories.find(
        (item) => item.id === parseInt(req.params.id),
      );

      if (!category) {
        return res
          .status(404)
          .json({ success: false, error: "Kategoriya topilmadi" });
      }

      res.status(200).json({ success: true, data: category });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // Yangi kategoriya qo'shish
  async createCategory(req, res) {
    try {
      const { name } = req.body;

      if (!name) {
        return res
          .status(400)
          .json({ success: false, error: "Name kiritish majburiy" });
      }

      const categories = await getData(fileName);

      const newCategory = {
        id: categories.length > 0 ? categories[categories.length - 1].id + 1 : 1,
        name,
      };

      categories.push(newCategory);
      await setData(fileName, categories);

      res.status(201).json({ success: true, data: newCategory });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // Kategoriyani yangilash
  async updateCategory(req, res) {
    try {
      const categories = await getData(fileName);
      const index = categories.findIndex(
        (item) => item.id === parseInt(req.params.id),
      );

      if (index === -1) {
        return res
          .status(404)
          .json({ success: false, error: "Kategoriya topilmadi" });
      }

      const { name } = req.body;

      categories[index] = {
        id: categories[index].id,
        name: name !== undefined ? name : categories[index].name,
      };

      await setData(fileName, categories);

      res.status(200).json({ success: true, data: categories[index] });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // Kategoriyani o'chirish
  async deleteCategory(req, res) {
    try {
      const categories = await getData(fileName);
      const index = categories.findIndex(
        (item) => item.id === parseInt(req.params.id),
      );

      if (index === -1) {
        return res
          .status(404)
          .json({ success: false, error: "Kategoriya topilmadi" });
      }

      const deletedItem = categories.splice(index, 1);
      await setData(fileName, categories);

      res.status(200).json({
        success: true,
        message: "Kategoriya o'chirildi",
        data: deletedItem[0],
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

export default new ProductController();