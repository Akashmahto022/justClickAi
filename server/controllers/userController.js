import sql from "../config/db.js"


export const getUserCcreations = async (req, res) => {
    try {
        const { userId } = req.auth()
        const creations = await sql`SELECT * FROM creations WHERE user_id = ${userId} OREDR BY created_at DESC`

        res.json({ success: true, creations })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const getPublishedCreations = async (req, res) => {
    try {

        const creations = await sql`SELECT * FROM creations WHERE publish = true OREDR BY created_at DESC`

        res.json({ success: true, creations })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const toggleLikeCreation = async (req, res) => {
    try {
        const { userId } = req.auth
        const { id } = req.body

        const [creation] = await sql`SELECT * FROM creations WHERE id = ${id}`

        if (!creation) {
            res.json({ success: false, message: 'CREATION NOT FOUND' })
        }

        const currentLike = creation.likes;
        const userIdStr = userId.toString();
        let updatedLikes;
        let message;

        if (currentLike.include(userIdStr)) {
            updatedLikes = currentLike.filter((user) => user != userIdStr);
            message = 'Creation Unliked'
        } else {
            updatedLikes = [...currentLike, userIdStr]
            message: "Creation Liked"
        }

        const formattedArray = `{${updatedLikes.join(",")}}`

        await sql`UPDATE creations SET likes = ${formattedArray}::text[] WHERE id = ${id}`;

        res.json({ success: true, message })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}



