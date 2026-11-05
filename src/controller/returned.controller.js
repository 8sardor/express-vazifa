import { getData, setData } from "../helpers/filedata.js";

const fileName = "returned.json";

class ReturnedController {
  // Hamma mahsulotlarni olish
  async getAll(req, res) {
    try {
      const products = await getData(fileName);
      return res.status(200).json({ success: true, data: products });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  // ID bo'yicha bitta mahsulotni olish
  async getId(req, res) {
    try {
      const id = +req.params.id;
      const products = await getData(fileName);
      const product = products.find((el) => el.id === id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product topilmadi",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Ma'lumot topildi",
        data: product,
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: `Error: ${err.message}`,
      });
    }
  }

  // POST - Yangi product qo'shish
  async create(req, res) {
    try {
      const products = await getData(fileName);

      const newProduct = {
        id: products.length ? products.at(-1).id + 1 : 1,
        ...req.body,
      };

      products.push(newProduct);
      await setData(fileName, products); // Fayl nomi va yangi massiv uzatildi

      return res.status(201).json({
        success: true,
        message: "Yangi product qo'shildi",
        data: newProduct, // newUser o'rniga to'g'ri o'zgaruvchi
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: `Error: ${err.message}`,
      });
    }
  }

  // PUT/PATCH - Productni o'zgartirish
  async update(req, res) {
    try {
      const id = +req.params.id;
      const products = await getData(fileName);
      const index = products.findIndex((el) => el.id === id);

      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: `Not found id: ${id}`,
        });
      }

      products[index] = {
        id: id,
        ...products[index],
        ...req.body,
      };

      await setData(fileName, products); // Fayl nomi va yangilangan massiv uzatildi

      return res.status(200).json({
        success: true,
        message: "Muvaffaqiyatli o'zgartirildi",
        data: products[index],
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: `Error: ${err.message}`,
      });
    }
  }

  // DELETE - Productni o'chirish
  async delete(req, res) {
    try {
      const id = +req.params.id;
      const products = await getData(fileName);
      const index = products.findIndex((el) => el.id === id);

      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: "Product topilmadi",
        });
      }

      products.splice(index, 1);
      await setData(fileName, products); // Fayl nomi va qolgan massiv uzatildi

      return res.status(200).json({
        success: true,
        message: "Product o'chirildi",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: `Error: ${err.message}`,
      });
    }
  }
}

export default new ReturnedController();