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
 
    //calculando a média aritmética de cada estabelecimento
    let establishmentAvgPrice = 0;

    establishmentsProducts.forEach(product => {
        establishmentAvgPrice += parseInt(product.price);
        product.categoriesId.forEach(id => {
            establishmentsCategories.add(id);
        });
    });
    establishmentAvgPrice = ((establishmentAvgPrice / establishmentsProducts.length) /100).toFixed(2);

    //responsável por criar a lista de categorias do estabelecimento
    //criando um subconjunto de categorias de cada estabelecimento
    let categoriesOutput = [];
    establishmentsCategories.forEach(id => {
        myCategories.forEach(category => {
            if(id === category.id) {
                categoriesOutput.push(category);
            }
        });
    });

    //compondo cada estabelecimento com as informações de suas respectivas categorias e produtos
    let establishmentOutput = {};
   
    establishmentOutput[element.name] = {};
    categoriesOutput.forEach(category => {
        establishmentOutput[element.name][category.name] = {};  
        establishmentsProducts.forEach(product => {
            
            product.categoriesId.forEach(id => {
                if(category.id === id) {
                    establishmentOutput[element.name][category.name][product.name] = {};
                    establishmentOutput[element.name][category.name][product.name]['price'] = ( product.price / 100 ).toFixed(2);
                };
            });
        });
    });
    establishmentOutput['avgPrice'] = establishmentAvgPrice;
    establishmentsOutput.push(establishmentOutput);
});

//organizando a saída e gerando um conteúdo .txt
let text = JSON.stringify(establishmentsOutput, undefined, 4).replace("[","").replace("]","");

//criando o arquivo .txt e preenchendo com o conteúdo
fs.writeFile('./output.txt', text, function (err) {
    if (err) return console.log(err);
});

//criando o arquivo .txt e preenchendo com o conteúdo do avgPrice em ordem crescente
establishmentsOutput.sort(function(a, b){return a.avgPrice-b.avgPrice});
text = JSON.stringify(establishmentsOutput, undefined, 4).replace("[","").replace("]","");
fs.writeFile('./output-ordered.txt', text, function (err) {
    if (err) return console.log(err);
});

//criando o arquivo .txt e preenchendo com o conteúdo do avgPrice em ordem decrescente
establishmentsOutput.reverse();
text = JSON.stringify(establishmentsOutput, undefined, 4).replace("[","").replace("]","");
fs.writeFile('./output-reversed.txt', text, function (err) {
    if (err) return console.log(err);
});