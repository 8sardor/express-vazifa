import { getData, setData } from '../helpers/filedata.js';

const calculateDiscount = (data) => {
    const narx = +data.narx || 0;
    const foyiz = +data.foyiz || 0;
    const discountprice = +(narx * foyiz / 100).toFixed(2);
    return {
        ...data,
        discountprice,
        finalcost: +(narx - discountprice).toFixed(2)
    };
};

class DiscountController {
    async getAll(req, res) {
        try {
            const items = await getData('discount.json');
            if (!items.length) {
                return res.status(404).json({
                    success: false,
                    message: 'Malumotlar topilmadi'
                });
            }
            return res.status(200).json({
                success: true,
                data: items
            });
        } catch (err) {
            console.log(`Error is on get all function: ${err.message}`);
            return res.status(500).json({
                success: false,
                message: `Serverda xatolik`
            });
        }
    }

    async getId(req, res) {
        try {
            const items = await getData('discount.json');
            const id = +req.params.id;
            // findIndex o'rniga find ishlatildi
            const item = items.find((el) => el.id === id);

            if (!item) {
                return res.status(404).json({
                    success: false,
                    message: "Chegirma topilmadi"
                });
            }
            return res.status(200).json({
                success: true,
                message: "Topildi",
                data: item
            });
        } catch (err) { // error o'rniga err qilindi
            console.log(`getId da xatolik bor: ${err.message}`);
            return res.status(500).json({ success: false, message: "Serverda xatolik" });
        }
    }

    async create(req, res) {
        try { // try qo'shildi
            const items = await getData('discount.json'); // items olib kelindi
            const bodyData = req.validatedData || req.body;

            const newItem = {
                id: items.length ? items.at(-1).id + 1 : 1,
                ...calculateDiscount(bodyData)
            };

            items.push(newItem);
            await setData('discount.json', items);

            return res.status(201).json({
                success: true,
                message: "Muvaffaqiyatli qo'shildi",
                data: newItem
            });
        } catch (err) {
            console.log(`Create da xatolik bor: ${err.message}`)
            return res.status(500).json({ success: false, message: "Serverda xatolik" })
        }
    }

    async update(req, res) {
        try {
            const id = +req.params.id;
            const items = await getData('discount.json');
            const index = items.findIndex(el => el.id === id);

            if (index === -1) {
                return res.status(404).json({ success: false, message: "Chegirma topilmadi" })
            }

            const bodyData = req.validatedData || req.body;
            const mergedData = { ...items[index], ...bodyData }

            items[index] = {
                ...calculateDiscount(mergedData),
                id: id
            };

            await setData('discount.json', items);
            return res.status(200).json({
                success: true,
                message: "O'zgartirildi",
                data: items[index]
            });
        } catch (err) {
            console.log(`Update da xatolik bor: ${err.message}`);
            return res.status(500).json({ success: false, message: "Serverda xatolik" });
        }
    }

    async deleteItem(req, res) {
        try {
            const id = +req.params.id;
            const items = await getData('discount.json');
            const index = items.findIndex(el => el.id === id);

            if (index === -1) {
                return res.status(404).json({ success: false, message: "Chegirma topilmadi" });
            }

            items.splice(index, 1);
            await setData('discount.json', items);

            return res.status(200).json({
                success: true,
                message: "O'chirildi"
            });
        } catch (err) {
            console.log(`Delete da xatolik bor: ${err.message}`);
            return res.status(500).json({ success: false, message: "Serverda xatolik" });
        }
    }
}

export default new DiscountController();