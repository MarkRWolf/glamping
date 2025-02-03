import userModel from "../models/user.model.mjs";
import dbConnect from "../dbConnect.js";
import reviewModel from "../models/review.model.mjs";
import stayModel from "../models/stay.model.mjs";
import activityModel from "../models/activity.model.mjs";
import contactModel from "../models/contact.model.mjs";

/*

    Create new User

*/
export const seedUser = async (user) => {
  console.log("-- User --");
  console.log(user);
  console.log("--\n");

  await dbConnect();

  try {
    user.pictureUrl = process.env.SERVER_HOST + user.picture;
    let newUser = await userModel.create(user);

    return newUser;
  } catch (error) {
    console.log(error);
  }
};

/*

    Create new User

*/
export const seedReview = async (review) => {
  console.log("-- Review --");
  console.log(review);
  console.log("--\n");

  await dbConnect();

  try {
    review.image = process.env.SERVER_HOST + review.image;

    let newReview = await reviewModel.create(review);

    return newReview;
  } catch (error) {
    console.log(error);
  }
};

/*

    Create new Stay

*/
export const seedStay = async (stay) => {
  console.log("-- Stay --");
  console.log(stay);
  console.log("--\n");

  await dbConnect();

  try {
    stay.image = process.env.SERVER_HOST + stay.image;

    let newStay = await stayModel.create(stay);

    return newStay;
  } catch (error) {
    console.log(error);
  }
};

/*

    Create new Activity

*/
export const seedActivity = async (activity) => {
  console.log("-- Activity --");
  console.log(activity);
  console.log("--\n");

  await dbConnect();

  try {
    activity.image = process.env.SERVER_HOST + activity.image;

    let newActivity = await activityModel.create(activity);

    return newActivity;
  } catch (error) {
    console.log(error);
  }
};

/*

    Create new Contact

*/
export const seedContact = async (contact) => {
  console.log("-- Contact --");
  console.log(contact);
  console.log("--\n");

  await dbConnect();

  try {
    let newContact = await contactModel.create(contact);

    return newContact;
  } catch (error) {
    console.log(error);
  }
};
