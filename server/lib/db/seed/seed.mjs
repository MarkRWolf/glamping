import { stubActivities, stubContacts, stubReviews, stubStays } from "./seed.data.js";
import { seedActivity, seedContact, seedReview, seedStay, seedUser } from "./seed.helper.js";
import bcrypt from "bcrypt";

export const seedUsers = async () => {
  // Seeding Admin User
  const user = await seedUser({
    name: "admin",
    email: "admin@seeduser.dk",
    picture: "/users/default.png",
    role: "admin",
    hashedPassword: await bcrypt.hash("admin", 10),
  });

  // Seeding Guest User
  const guest = await seedUser({
    name: "guest",
    email: "guest@mediacollege.dk",
    picture: "/users/default.png",
    role: "guest",
    hashedPassword: await bcrypt.hash("guest", 10),
  });

  return true;
};

export const seedReviews = async () => {
  for (let i = 0; i < stubReviews.length; i++) {
    await seedReview(stubReviews[i]);
  }
};

export const seedStays = async () => {
  for (let i = 0; i < stubStays.length; i++) {
    await seedStay(stubStays[i]);
  }
};

export const seedActivities = async () => {
  for (let i = 0; i < stubActivities.length; i++) {
    await seedActivity(stubActivities[i]);
  }
};

export const seedContacts = async () => {
  for (let i = 0; i < stubContacts.length; i++) {
    await seedContact(stubContacts[i]);
  }
};
