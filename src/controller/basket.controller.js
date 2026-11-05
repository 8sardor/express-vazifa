import { getData,setData } from "../helpers/filedata.js"


class BasketController{
    async getAll(req,res){
        try{
            const items = await getData('basket.json')
            if(!items.length){
                return res.status(404).json({
                    success:false,
                    message:"malumotlar topilmadi"
                })
            }
            return res.status(200).json({
                success:true,
                data:items
            })
        }catch(err){
            console.log(`get da xatolik bor: ${err.message}`)
            return res.status(500).json({success:false,message:"Serverda xatolik"})
        }
    }
    async getId(req,res){
        try{
            const items = await getData('basket.json')
            const id = +req.params.id
            const item = items.find((el) => el.id === id)

            if(!item){
                return res.status(404).json({
                    success:false,
                    message:'mahsulot topilmadi'
                })
            }

            return res.status(200).json({
                success:true,
                message:"topildi",
                data:item
            })
        }catch(err){
            console.log(`getId da xatolik bor: ${err.message}`)
            return res.status(500).json({success:false,message:"Serverda xatolik"})
        }
    }
    async create(req,res){
        try{
            const items = await getData('basket.json')
            const newItem = {
                ...req.body,
                id:items.length ? items.at(-1).id+1: 1
            }
            items.push(newItem)
            await setData('basket.json',items)
            return res.status(201).json({
                success:true,
                message:"muvaffaqiyatli qo'shildi",
                data:newItem
            })
        }catch(err){
            console.log(`Create da xatolik bor : ${err.message}`)
            return res.status(500).json({success:false,message:"Serverda xatolik"})
        }
    }
    async update(req,res){
        try{
            const id = +req.params.id
            const items = await getData('basket.json')
            const index = items.findIndex(el=>el.id===id)

            if(index===-1){
                return res.status(404).json({success:false,message:"mahsulot topilmadi"})
            }
            items[index]={
                ...req.body,
                id:id
            }
            await setData('basket.json',items)
            return res.status(200).json({
                success:true,
                message:"o'zgartirildi",
                data:items[index]
            })
        }catch(err){
            console.log(`updateda xatolik bor: ${err.message}`)
            return res.status(500).json({success:false,message:"Serverda xatolik"})
        }
    }
    async delete(req,res){
        try{
            const id = +req.params.id
            const items = await getData('basket.json')
            const index = items.findIndex(el=>el.id===id)

            if(index===-1){
                return res.status(404).json({success:false,message:"mahsulot topilmadi"})
            }
            items.splice(index,1)
            await setData('basket.json',items)
            return res.status(200).json({
                success:true,
                message:"o'chirildi"
            })
        }catch(err){
            console.log(`deleteda xatolik bor: ${err.message}`)
            return res.status(500).json({success:false,message:"Serverda xatolik"})
        }
    }

}


export default new BasketController()