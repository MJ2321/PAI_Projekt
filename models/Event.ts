import mongoose, { Schema } from "mongoose";

const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    require: false,
  },
  price: {
    type: Number,
    require: true,
    default: 0,
  },
  slug: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  }
});

EventSchema.set("collection", "events");

const Event =
  mongoose.models.Events || (mongoose.model("Events", EventSchema) as any);

export default Event;
