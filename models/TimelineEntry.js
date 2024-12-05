import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

const timelineEntrySchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['work', 'education', 'achievement', 'personal'],
    },
    icon: {
      type: String,
      default: '📌',
    },
    media: [{
      type: String,
      trim: true,
    }],
    isPublic: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

timelineEntrySchema.plugin(toJSON);

export default mongoose.models.TimelineEntry || mongoose.model("TimelineEntry", timelineEntrySchema);