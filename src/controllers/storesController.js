import { Nearest } from "../models/nearest";
import { Pharmacy } from "../models/pharmacy";

export const getPharmacies = async (req, res) => {
  const pharmacies = await Pharmacy.find();
  res.status(200).json(pharmacies);
};

export const getNearest = async (req, res) => {
  const nearest = await Nearest.find();
  res.status(200).json(nearest);
};
