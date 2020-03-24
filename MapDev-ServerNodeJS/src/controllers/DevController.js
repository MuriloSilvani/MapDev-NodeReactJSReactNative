const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async store(req, res) {
        const { github_username, techs, latitude, longitude } = req.body;
        let dev = await Dev.findOne({ github_username });
        if (!dev) {
            try {
                const response = await axios.get(`https://api.github.com/users/${github_username}`);
                let { name = login, avatar_url, bio } = response.data
                const techsArray = await parseStringAsArray(techs);

                const location = await {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                };
                dev = await Dev.create({
                    github_username,
                    name,
                    avatar_url,
                    bio,
                    techs: techsArray,
                    location
                });
            } catch (error) {
                dev = null;
            }
        }
        return res.json(dev);
    },
    async index(req, res) {
        const devs = await Dev.find();
        return res.json(devs);
    },




    async update(req, res) {
        const { github_username } = req.params;
        const { techs, longitude, latitude } = req.body;

        const techsArray = parseStringAsArray(techs);
        const location = await {
            type: 'Point',
            coordinates: [longitude, latitude],
        };

        const { nModified } = await Dev.updateOne({ github_username }, {
            $set: {
                techs: techsArray,
                location
            }
        });

        if (nModified > 0) {
            return res.json({ success: true });
        } else {
            return res.json({ success: false });
        }
    },


    async destroy(req, res) {
        const { github_username } = req.params;
        const { deletedCount } = await Dev.deleteOne({ github_username });

        if (deletedCount > 0) {
            return res.json({ success: true });
        } else {
            return res.json({ success: false });
        }
    },
}