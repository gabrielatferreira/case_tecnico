//lendo o arquivo data.json
const fs = require('fs');
const jsonData = fs.readFileSync('./data.json', 'utf-8');
const jsonDataParse = JSON.parse(jsonData);

//buscando os valores de cada objeto principal
const myProducts = jsonDataParse.products;
const myCategories = jsonDataParse.categories;
const myEstablishments = jsonDataParse.establishments;

//transformando os objetos em array e tirando valores repetidos do array
let establishmentsProducts = [];
let establishmentsCategories = new Set();
let establishmentsOutput = [];


myEstablishments.forEach(element => {
    //limpando os produtos e categorias a cada iteração
    establishmentsProducts = [];
    establishmentsCategories = new Set();

    //buscando os productsId em establishments e comparando com o id em products
    //responsável por criar a lista de produtos do estabelecimento
    element.productsId.forEach(id => {
        for(var index in myProducts) {
            if(id === myProducts[index].id) {
                establishmentsProducts.push(myProducts[index]);
                break;
            }
        }
    });
 
    //buscando os categoriesId em products
    //responsável por criar a lista de categorias do estabelecimento
    establishmentsProducts.forEach(product => {
        product.categoriesId.forEach(id => {
            establishmentsCategories.add(id);
        });
    });

    //criando um subconjunto de categorias de cada estabelecimento
    let categoriesOutput = [];
    establishmentsCategories.forEach(id => {
        myCategories.forEach(category => {
            if(id === category.id) {
                categoriesOutput.push(category);
            }
        });
    });

    //compondo cada estabelecimento com as informaçõe de suas respectivas categorias
    let establishmentOutput = {};
    establishmentOutput[element.name] = {};
    categoriesOutput.forEach(category => {
        establishmentOutput[element.name][category.name] = {};
        establishmentsProducts.forEach(product => {
            product.categoriesId.forEach(id => {
                if(category.id === id) {
                    console.log(product.price);
                    establishmentOutput[element.name][category.name][product.name] = {};
                    establishmentOutput[element.name][category.name][product.name]['price'] = product.price;
                };
            });
        });
    });

    console.log(establishmentOutput);

    establishmentsOutput.push({
        name: element.name,
    });
});

function transformingPriceValue() {
    
}