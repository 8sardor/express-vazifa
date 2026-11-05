import { getData, setData } from "../helpers/filedata.js";

const fileName = "products.json";

export class ProductsController {
  // Hamma mahsulotlarni olish
  static async getAllProduct(req, res) {
    try {
      const products = await getData(fileName);
      return res.status(200).json({ success: true, data: products });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  // ID bo'yicha mahsulotni olish
  static async getProductById(req, res) {
    try {
      const id = +req.params.id;
      const products = await getData(fileName);
      const product = products.find((el) => el.id === id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `ID: ${id} bo'lgan mahsulot topilmadi`,
        });
      }

      return res.status(200).json({
        success: true,
        message: "Ma'lumot topildi",
        data: product,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: `Xatolik: ${err.message}`,
      });
    }
  }

  // Yangi mahsulot qo'shish
  static async createProduct(req, res) {
    try {
      const products = await getData(fileName);

      const newProduct = {
        id: products.length ? products.at(-1).id + 1 : 1,
        ...req.body,
      };

      products.push(newProduct);
      await setData(fileName, products);

      return res.status(201).json({
        success: true,
        message: "Yangi mahsulot qo'shildi",
        data: newProduct,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: `Xatolik: ${err.message}`,
      });
    }
  }

  // Mahsulotni yangilash
  static async updateProduct(req, res) {
    try {
      const id = +req.params.id;
      const products = await getData(fileName);
      const index = products.findIndex((el) => el.id === id);

      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: `ID: ${id} bo'lgan mahsulot topilmadi`,
        });
      }

      products[index] = {
        id: id,
        ...req.body,
      };

      await setData(fileName, products);

      return res.status(200).json({
        success: true,
        message: "Muvaffaqiyatli o'zgartirildi",
        data: products[index],
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: `Xatolik: ${err.message}`,
      });
    }
  }

  // Mahsulotni o'chirish
  static async deleteProduct(req, res) {
    try {
      const id = +req.params.id;
      const products = await getData(fileName);
      const index = products.findIndex((el) => el.id === id);

      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: "Mahsulot topilmadi",
        });
      }

      products.splice(index, 1);
      await setData(fileName, products);

      return res.status(200).json({
        success: true,
        message: "Mahsulot o'chirildi",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: `Xatolik: ${err.message}`,
      });
    }
  }
}