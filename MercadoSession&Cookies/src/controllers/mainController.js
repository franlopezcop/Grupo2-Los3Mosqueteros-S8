
const universalModel = require('../models/universalModel');
const productModel = universalModel('products');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const mainController = {
	
    index : (req,res)=>{
        const visited = productModel.visited('visited');
        const inSale = productModel.inSale('in-sale');
        res.render('index', { visited, inSale,toThousand})
    },

    search: (req, res) => {
		let search = req.query.keywords;
		let productsToSearch = products.filter(product => product.name.toLowerCase().includes(search));	
		res.render('results', { 
			products: productsToSearch, 
			search,
			toThousand,
		});
	}
}


module.exports = mainController;
