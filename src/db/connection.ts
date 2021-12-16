import mongoose from 'mongoose';

const connection = async(): Promise<boolean> => {
    try {
        await mongoose.connect('');
        return true;
    } catch(e) {
        console.error(e);
        return false;
    }
};

export default connection;