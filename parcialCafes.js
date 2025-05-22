use('cafeteria')

db.cafesEspeciales.drop()

// 1) Crear el script .js con la creación de la base de datos y las colecciones.

db.cafesEspeciales.insertMany(
    [
        {
            tipo: 'espresso', 
            ingredientes: ['chocolate', 'crema'], 
            peso: 230, 
            intensidad: 'baja',      
            tiene_leche: true, 
            tostador: {
                localidad: 'wilde', 
                nombre: 'cafitiria', 
                cuit: '20489938181'
            },
            precio: [
                {tipo: 'efectivo', precio: 500},
                {tipo: 'tarjeta', precio: 550}
            ]   
        },
        {
            tipo: 'cold brew', 
            ingredientes: ['vainilla', 'caramelo'], 
            peso: 280, 
            intensidad: 'media',      
            tiene_leche: false, 
            tostador: {
                localidad: 'wilde', 
                nombre: 'cafitiria', 
                cuit: '20489938181'
            },
            precio: [
                {tipo: 'efectivo', precio: 600},
                {tipo: 'tarjeta', precio: 660}
            ]    
        },
        {
            tipo: 'latte', 
            ingredientes: ['vainilla', 'crema', 'chocolate amargo'], 
            peso: 350, 
            intensidad: 'media',      
            tiene_leche: true, 
            tostador: {
                localidad: 'quilmes', 
                nombre: 'chafeteria', 
                cuit: '38984058423'
            },
            precio: [
                {tipo: 'efectivo', precio: 750},
                {tipo: 'tarjeta', precio: 825}
            ]    
        },
        {
            tipo: 'filtrado', 
            ingredientes: ['caramelo'], 
            peso: 250, 
            intensidad: 'alta',      
            tiene_leche: true, 
            tostador: {
                localidad: 'wilde', 
                nombre: 'cafitiria', 
                cuit: '20489938181'
            },
            precio: [
                {tipo: 'efectivo', precio: 400},
                {tipo: 'tarjeta', precio: 440}
            ]    
        },
        {
            tipo: 'cold brew', 
            ingredientes: ['caramelo', 'cacao'], 
            peso: 260, 
            intensidad: 'baja',      
            tiene_leche: true, 
            tostador: {
                localidad: 'san justo', 
                nombre: 'cafeteria injusto', 
                cuit: '49124208141'
            },
            precio: [
                {tipo: 'efectivo', precio: 450},
                {tipo: 'tarjeta', precio: 500}
            ]    
        },
        {
            tipo: 'latte', 
            ingredientes: ['chocolate', 'vainilla', 'crema'], 
            peso: 300, 
            intensidad: 'alta',      
            tiene_leche: true, 
            tostador: {
                localidad: 'santa lucia', 
                nombre: 'cafeteria almendra', 
                cuit: '49124208141'
            },
            precio: [
                {tipo: 'efectivo', precio: 410},
                {tipo: 'tarjeta', precio: 450}
            ]    
        },
        {
            tipo: 'comun', 
            ingredientes: [], 
            peso: 200, 
            intensidad: 'media',      
            tiene_leche: true, 
            tostador: {
                localidad: 'caba', 
                nombre: 'cafeteria palermitana', 
                cuit: '67494128841'
            },
            precio: [
                {tipo: 'efectivo', precio: 1000},
                {tipo: 'tarjeta', precio: 1200}
            ]    
        },
        {
            tipo: 'descafeinado', 
            ingredientes: ['crema'], 
            peso: 190, 
            intensidad: 'baja',      
            tiene_leche: false, 
            tostador: {
                localidad: 'caba', 
                nombre: 'cafeteria palermitana', 
                cuit: '67494128841'
            },
            precio: [
                {tipo: 'efectivo', precio: 900},
                {tipo: 'tarjeta', precio: 1200}
            ]    
        },
        {
            tipo: 'cold brew', 
            ingredientes: ['vainilla'], 
            peso: 210, 
            intensidad: 'baja',      
            tiene_leche: false, 
            tostador: {
                localidad: 'san cayetano', 
                nombre: 'cafeteria san cayetano', 
                cuit: '12939193931'
            },
            precio: [
                {tipo: 'efectivo', precio: 200},
                {tipo: 'tarjeta', precio: 500}
            ]    
        },
        {
            tipo: 'espresso', 
            ingredientes: ['vainilla', 'chocolate', 'caramelo', 'crema'], 
            peso: 400, 
            intensidad: 'alta',      
            tiene_leche: true, 
            tostador: {
                localidad: 'san cayetano', 
                nombre: 'cafeteria san cayetano', 
                cuit: '12939193931'
            },
            precio: [
                {tipo: 'efectivo', precio: 1000},
                {tipo: 'tarjeta', precio: 1300}
            ]    
        },
    ]
)

// 2) Buscar cuántos cafés contienen chocolate entre sus ingredientes.

db.cafesEspeciales.find(
    {
        ingredientes: {$in: ['chocolate']}
    }
)

// 3) Buscar cuántos cafés son de tipo “cold brew”· y contienen “vainilla” entre sus ingredientes

db.cafesEspeciales.find(
    {
        tipo: {$eq: 'cold brew'},
        ingredientes: {$in: ['vainilla']}
    }
)

// 4) Listar tipo y peso de los cafés que tienen una intensidad “media”

db.cafesEspeciales.aggregate(
    [
        {
            $match: {
                intensidad: 'media'
            }
        },
        {
            $project: {
                _id: 0,
                tipo: 1,
                peso: 1
            }
        }
    ]
)

// 5) Obtener tipo, peso e intensidad de los cafés cuyo peso se encuentre entre 200 y 260 inclusive

db.cafesEspeciales.aggregate(
    [
        {
            $match: {
                peso: {$gte: 200, $lte: 260}
            }
        }
    ]
)

// 6) Mostrar los cafés que fueron tostados en localidades que contengan “san”, permitiendo buscar por “san”
// y que se muestren también los de “santos”, “san justo”, etc. Ordenar el resultado por peso de manera
// descendente.

db.cafesEspeciales.aggregate(
    [
        {
            $match: {
                'tostador.localidad': {
                    $regex: /san/
                }
            }
        },
        {
            $sort: {
                peso: -1
            }
        }
    ]
)

// 7) Mostrar la sumar del peso de cada tipo de Café.

db.cafesEspeciales.aggregate(
    [
        {
            $group: {
                _id: '$tipo',
                suma_de_pesos: {
                    $sum: '$peso'
                }
            }
        }
    ]
)

// 8) Agregar el ingrediente “whisky” todos los cafés cuya intensidad es alta.

db.cafesEspeciales.updateMany(
    {
        intensidad: 'alta'
    },
    {
        $push: {ingredientes: 'whisky'}
    }
)

// 9) Sumarle 10 al peso de los cafés cuyo peso se encuentre entre 200 y 260 inclusive.

db.cafesEspeciales.updateMany(
    {
        peso: {$gt: 200, $lte: 260}
    },
    {
        $inc: {peso: 10}
    }
)

// 10) Eliminar los cafés cuyo peso sea menor o igual a 210.

db.cafesEspeciales.deleteMany(
    {
        peso: {$lte: 210}
    }
)