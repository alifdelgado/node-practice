import { Request, Response } from 'express';
import { Product, products } from "../data/products";
import Products from '../db/schemas/product';

const getProducts = async (req: Request, res: Response): Promise<void> => {
    const itemsPerPage: number = 3;
    const page: number = parseInt(req.query.page as string);
    const start: number = (page - 1) * itemsPerPage;
    const total: number = await Products.count();
    const products = await Products.find().skip(start).limit(itemsPerPage);
    res.send({
        page: page,
        per_page: itemsPerPage,
        total: total,
        total_pages: Math.ceil(total / itemsPerPage),
        data: products,
    });
};

const getProductById = async (req:Request, res: Response): Promise<void> => {
    const { productId } = req.params;
    const product = await Products.findById(productId).populate({
        path: 'user',
        select: {
            password: 0,
            __v: 0
        }
    });
    if (product) {
        res.send({ data: product });
        return;
    }
    res.status(404).send({});
};

const createProduct = async (req:Request, res: Response): Promise<void> => {
    const { name, year, price, description, user } = req.body;
    const product = await Products.create({ name, year, price, description, user });
    res.send(product);
};

const updateProduct = async (req:Request, res: Response): Promise<void> => {
    const id: string = req.params.productId;
    const { name, year, description, price, user } = req.body;
    const product = await Products.findByIdAndUpdate(id, { name, year, description, price, user });
    if(product) {
        res.send({data: product});
        return;
    }
    res.status(404).send({});
};

const partialUpdateProduct = async (req:Request, res: Response): Promise<void> => {
    const id: string = req.params.productId;
    const { name, year, description, price, user } = req.body;
    const product = await Products.findById(id);
    if (product) {
        product.name = name || product.name;
        product.year = year || product.year;
        product.price = price || product.price;
        product.description = description || product.description;
        product.user = user || product.user;
        await product.save();
        res.send({ data: product });
        return;
    }
    res.status(404).send({});
};

const updateProductAndNotify = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.productId;
    const { name, year, description, price, user } = req.body;
    const product = await Products.findById(id);
    if (product) {
        product.name = name || product.name;
        product.year = year || product.year;
        product.price = price || product.price;
        product.description = description || product.description;
        product.user = user || product.user;
        await product.save();
        res.send({ data: product, message: `Email sent to ${user.email}` });
        return;
    }
    res.status(404).send({});
};

const deleteProductById = async (req:Request, res: Response): Promise<void> => {
    try {
        const id: string = req.params.productId;
        const product = await Products.deleteOne({_id: id});
        if (product) {
            res.send({});
            return;
        }
        res.status(404).send({});
    } catch(e) {
        res.status(500).send(e);
    }
};

export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    partialUpdateProduct,
    updateProductAndNotify,
    deleteProductById,
};
