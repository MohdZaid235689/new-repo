import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], required: true },
    adminCode: { type: String } // Optional for admin
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

// Static method to find an admin
userSchema.statics.findAdmin = function () {
    return this.findOne({ role: 'admin' });
};

// Static method to create a new admin
userSchema.statics.createAdmin = async function (adminData) {
    const existingAdmin = await this.findAdmin();
    if (existingAdmin) throw new Error('An admin already exists');

    return this.create(adminData);
};

const User = mongoose.model('User', userSchema);

export default User;
