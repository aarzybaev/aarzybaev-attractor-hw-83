import express from "express";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";

const trackHistoriesRouter = express.Router();

trackHistoriesRouter.post('/', async (req, res, next) => {
    const tokenData = req.get('Authorization');
    const track = req.body.track;

    if (!tokenData) {
        return res.status(401).send({error: 'No token present'});
    }

    const [_, token] = tokenData.split(' ');
    const user = await User.findOne({token});

    if (!user) {
        return res.status(401).send({error: 'Wrong token!'});
    }

    if (track === undefined || (/^\s*$/.test(track))) {
        return res.status(400).json({"error": "TrackID must be present in the request"});
    }

    const trackHistory = new TrackHistory({
        user: user._id,
        track,
        datetime: new Date().toISOString()
    });

    try {
        const data = await trackHistory.save();
        return res.send(data);
    } catch (e) {
        next(e);
    }
});

export default trackHistoriesRouter;