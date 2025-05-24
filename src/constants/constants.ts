/**
 * Constants for project
 *
 * @author gvivas on 2025/23/05
 */

export const constants = {
  SYSTEM_ID: 'bank_front',
  VERSION: '1.0.0-RELEASE',
  SERVICES: {
    PRODUCT_SERVICES: {
      APIV1: {
        PATH: '/bp/products',
        CONTROLLERS: {
          VERIFITCATION: '/verification/',
        }
      }
    }
  },
  RESPONSES:{
    PRODUCTS:{
      SAVE_CORRECT: 'Product added successfully',
      UPDATE_CORRECT: 'Product updated successfully'
    },
  },
  MESSAGES: {
    PRODUCTS:{
      ERROR_SERVICE:'Ha ocurrido un error al consumir el servicio, comuníquese con el equipo administrador.',
      ID_EXIST:'Ese ID ya existe, ingrese uno diferente.',
      NO_DATA: 'No existen datos para mostrar.',
      SAVE: 'Registro exitoso, se ha guardado correctamente el producto.',
      ERROR_SAVE: 'No se ha podido guardar el producto',
      ERROR_UPDATE: 'No se ha podido actualizar el producto.',
      UPDATE: 'Registro exitoso, se ha actualizado correctamente el producto.',
      DELETE: 'Producto eliminado con éxito.',
      CONFIRM_DELETE: '<br>¿Está seguro de eliminar este elemento?'
    },
  }
};
