import { getData, setData } from "../helpers/filedata.js";

const fileName = "newProducts.json";

class newProductController {
  // Hamma mahsulotlarni olish
  async getAllProducts(req, res){
    try {
      const products = await getData(fileName);
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
  async getProductById(req,res) {
    try{
       const id=  +req.params.id
        const products = await getData(fileName)
        const product = products.find(el=>el.id===id)

        if(!product){
            res.status(404).json({
                succes:false,
                message:`Error:${err.message}`
            })
        }
        res.status(200).json({
            success:true,
            message:'malumot topildi',
            data:product
        })
    }
    catch(err){
         res.status(400).json({
            succes:false,
            message:`Error : ${err.message}`
        })
    }
    
  }
  ///////POST product qo'shish
async createProduct(req,res){
  try{   
  const products = await getData(fileName);
            
        
            const newProduct = {
                id: products.length ? products.at(-1).id + 1 : 1,
                ...req.body
              }

         products.push(newProduct)
            await setData(fileName)
            
            res.writeHead(201);
            return res.status(201).json({
                succes:true,
                message:"Yangi product qo'shildi ",
                user:newUser

            })
          }
            catch(err){
           res.status(400).json({
            succes:false,
            message:`Error : ${err.message}`
        })

            }


}
///////PUT product nom ini o'zgartirish
async  updateProduct(req,res){
const id=+req.params.id
        const products=await getData(fileName)
        const index=products.findIndex(el=>el.id===id)
        if(index!=-1){
            products[index]={
                id:id,
                ...req.body
            }
            await setData(products)
            return res.status(201).json({
                succes:true,
                message:`Muvofaqiyatli o'zgartirildi`
                
            })
           
        }
         return res.status(404).json({
                succes:false,
                message:`Not found id:${id}`
                
            })

}
//////?Delete product
async deleteProduct(req,res){
const id=+req.params.id
        const products=await getData(fileName)
        const index=products.findIndex(el=>el.id===id)
       if(index===-1){
        res.status(400).json({
            succes:false,
            message:`Product topilmadi`
        })
       }
        products.splice(index,1)
        await setData(products)
        return res.status(200).json({
            succes:true,
            message:`Product o'chirildi`
        })   
    }
}


export default new newProductController();