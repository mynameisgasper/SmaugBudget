const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *  schemas:
 *   Categories:
 *    type: object
 *    description: Vsi podatki o kategoriji
 *    properties:
 *     name:
 *      type: string
 *      description: Ime kategorije
 *     color:
 *      type: string
 *      description: Barva kategorije
 *     basic:
 *      type: boolean
 *      description: Ali je kategorija ena izmed osnovnih?
 *    required:
 *     - name
 *     - color
 *     - basic
 *   changeColorCategory:
 *    type: object
 *    description: Vsi podatki za spremembo barve kategorije
 *    properties:
 *     category_id:
 *      type: string
 *      description: Id kategorije
 *     colorPicker:
 *      type: string
 *      description: RGB koda nove barve
 *     user_id:
 *      type: string
 *      description: Id uporabnika
 *    required:
 *     - category_id
 *     - colorPicker
 *     - user_id
 *   deleteCategory:
 *    type: object
 *    description: Vsi podatki za izbris kategorije
 *    properties:
 *     category_id:
 *      type: string
 *      description: Id kategorije
 *     user_id:
 *      type: string
 *      description: Id uporabnika
 *    required:
 *     - category_id
 *     - user_id
 */

const categorySchema = new mongoose.Schema();

categorySchema.add({
    name: { type: String, required: true },
    color: { type: String, required: true, default: 'rgb(47, 201, 30)' },
    basic: { type: Boolean, required: true, default: false }
});

mongoose.model('Categories', categorySchema, 'Categories');

module.exports = {
    categorySchema: categorySchema
}
/*
 CategoryName:
  type: object
  description: Ime kategorije
  properties:
   name:
    type: string
   required:
    - name
  CategoryId:
   type: object
   description: Id kategorije
   properties:
    id:
     type: string    
     required:
    - id*/