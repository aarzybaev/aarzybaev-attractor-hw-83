import mongoose, {Model} from "mongoose";

export interface artistsApi {
    _id: string;
    name: string;
    photo: string | null;
    information: string;
    __v?: number;
}

export interface  albumsApi {
    _id: string;
    title: string;
    artist: string;
    releaseDate: string;
    coverImage: string | null;
}

export interface tracksApi {
    _id: string;
    title: string;
    album: string;
    duration: string;
}

export interface ArtistFields {
    name: string;
    photo: string | null;
    information: string;
}

export interface AlbumFields {
    title: string;
    artist: mongoose.Types.ObjectId;
    releaseDate: string;
    coverImage: string | null;
}

export interface TrackFields {
    title: string;
    album: mongoose.Types.ObjectId;
    duration: string;
}

export interface UserFields {
    username: string;
    password: string;
    token: string;
}

export interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;

export interface TrackHistoryFields {
    user: string;
    track: string;
    datetime: Date;
}