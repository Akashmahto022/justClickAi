import sql from "../config/db.js"

// GET USER CREATIONS
export const getUserCreations = async (req, res) => {
    try {
        const { userId } = req.auth()
        const creations = await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`

        res.json({ success: true, creations });

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// GET PUBLISHED CREATION
export const getPublishedCreations = async (req, res) => {
    try {
        const creations = await sql`SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`
        console.log("creations", creations)
        res.json({ success: true, creations })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


// TOGGLE LIKE CREATION
export const toggleLikeCreation = async (req, res) => {
    try {
        const { userId } = req.auth
        const { id } = req.body

        const [creation] = await sql`SELECT * FROM creations WHERE id = ${id}`

        if (!creation) {
            res.json({ success: false, message: 'CREATION NOT FOUND' })
        }

        const currentLikes = creation.likes;
        const userIdStr = userId.toString();
        let updatedLikes;
        let message;

        if (currentLikes.includes(userIdStr)) {
            updatedLikes = currentLikes.filter((user) => user != userIdStr);
            message = 'Creation Unliked'
        } else {
            updatedLikes = [...currentLikes, userIdStr]
            message = "Creation Liked"
        }

        const formattedArray = `{${updatedLikes.join(",")}}`

        await sql`UPDATE creations SET likes = ${formattedArray}::text[] WHERE id = ${id}`;

        res.json({ success: true, message })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}



