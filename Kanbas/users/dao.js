import model from "./model.js";
export const createUser = (user) => {
    delete user._id
    return model.create(user);
  }
  
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByEmail = (email) => model.findOne({email});
export const findUserByUsername = (username) =>  model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>  model.findOne({ username, password });
export const updateUser = (userId, user) => {
    return model.updateOne({ _id: userId }, { $set: user });
    };
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
export const findUsersByRole = (role) => model.find({ role: role });

