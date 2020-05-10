const {
    Dresses
} = require('../data');

const add = async (image, title, description, price) => {
    const newDress = new Dresses({
        image,
        title,
        description,
        price
    });
    await newDress.save();
};

const getAll = async () => {
    const dresses = await Dresses.find();
    return dresses;
};

const updateSelected = async (id, imp) => {
    const dress = await Dresses.findById(id);
    await Dresses.findByIdAndUpdate(id, { selected: !dress.selected });
}

const deleteById = async (id) => {
    await Dresses.findByIdAndDelete(id);
};

module.exports = {
    add,
    getAll,
    updateSelected,
    deleteById
}