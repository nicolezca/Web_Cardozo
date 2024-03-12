// Importación de módulos
const express = require('express');
const router = express.Router();
const fs = require('fs');
const helmet = require('helmet');

// Leer el archivo JSON
const jsonData = JSON.parse(fs.readFileSync('./Data/data.json', 'utf8'));

// Función para obtener un material por ID
function obtenerMaterialPorId(materialId) {
    return jsonData.find(material => material.id_product === materialId);
}

// Elementos ordenados alfabéticamente
const marcas = Array.from(new Set(jsonData.map(item => item.marca))).sort();
const categorias = Array.from(new Set(jsonData.map(item => item.categoria))).sort();
const tipos = Array.from(new Set(jsonData.map(item => item.tipo))).sort();
const materiales = Array.from(new Set(jsonData.map(item => item.material))).sort();

// Middleware de seguridad con Helmet
router.use(helmet());

// Ruta para la página de inicio
router.get('/', (req, res) => {
    res.render('index', { marcas, categorias, tipos, materiales, jsonData });
});

// Ruta para generar páginas individuales para cada material
router.get('/materials/:materialName', (req, res) => {
    try {
        // Obtener el nombre del material desde los parámetros de la URL
        const materialName = req.params.materialName;

        // Buscar el material en los datos
        const material = jsonData.find(material => 
            material.nombre.toLowerCase().replace(/\s+/g, '-') === materialName
        );

        // Verificar si el material existe
        if (!material) {
            res.status(404).send('Material no encontrado');
            return;
        }

        // Renderizar la página individual del material
        res.render('materialPage', { material });
    } catch (error) {
        // Manejar errores internos del servidor
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

// Exportar el router para su uso en otros archivos
module.exports = router;
