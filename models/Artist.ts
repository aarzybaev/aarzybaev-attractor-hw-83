import mongoose from "mongoose";
import config from "../config";
import {ArtistFields} from "../types";

const Schema = mongoose.Schema;

const ArtistSchema = new Schema<ArtistFields>({
    name: {
        type: String,
        unique: true,
        required: true
    },
    photo: String || null,
    information: String

}, config.mongoose.versionKey);

const Artist = mongoose.model('Artist', ArtistSchema);
export default Artist;