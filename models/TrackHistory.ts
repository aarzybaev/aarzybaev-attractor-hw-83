import mongoose from "mongoose";
import config from "../config";
import {TrackHistoryFields} from "../types";

const Schema = mongoose.Schema;
const TrackHistorySchema = new Schema<TrackHistoryFields>({
    user: {
        type: String,
        required: true,
    },
    track: {
        type: String,
        required: true,
    },
    datetime: {
        type: Date,
        required: true,
    }
}, config.mongoose.versionKey);

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);

export default TrackHistory;