const express = require("express");
const pool = require("./db");
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 5000;
const fs = require("fs"); 
app.use(express.json());
const bodyParser = require('body-parser');
app.use(fileUpload());
app.use(bodyParser.json({ limit: '10mb' }));

//insert user

app.post('/users', async (req, res) => {
    const { name, job } = req.body; // Assuming you send these fields in the request body

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
      return res.status(400).json({ error: 'No image file was uploaded.' });
    }
  
    const image = req.files.image;
    const uploadPath = __dirname + '/uploads/' + image.name;
  
    image.mv(uploadPath, async function(err) {
      if (err) {
        console.error('Error moving uploaded file:', err);
        return res.status(500).json({ error: 'Error moving uploaded file.' });
      }
  
    try {
        console.log(uploadPath)
      // Store image and other data in PostgreSQL
      const imageResponse = await pool.query(
        'INSERT INTO public.user (name, job_desc, image) VALUES ($1, $2, $3) RETURNING *',
        [name, job, image.name]
      );

      res.status(201).json({ message: 'Image uploaded successfully', data: imageResponse.rows[0] });
    } catch (error) {
      console.error('Error inserting data into PostgreSQL:', error);
      res.status(500).json({ error: 'Error uploading image.' });
    }
  });
});


//  get all users

app.get("/users", async (req, res) => {
    try {
        const returnUsers =  await pool.query("SELECT * FROM public.user");
        res.json(returnUsers.rows)
    } catch (error) {
        console.error(error.message)
    }
})

// get a user

app.get("/users/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [id])
        res.json(user.rows)
    } catch (error) {
        console.error(error.message)
    }
})

// update user 
app.put("/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name, job, image } = req.body;
      
      const updateUser = await pool.query(
        "UPDATE public.user SET name = $1, job_desc = $2, image = $3 WHERE user_id = $4",
        [name, job, image, id]
    );
  
      res.json({ message: "User updated successfully" });
    } catch (error) {
        console.error(error.message)
    }

})

app.delete("/users/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id); // Parse the ID as an integer
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const deleteUser = await pool.query("DELETE FROM public.user WHERE user_id = $1", [id]);

        if (deleteUser.rowCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json('User was deleted successfully');
    } catch (error) {
        console.error(error.message);
    }
});

//uploads

app.get("/uploads/:name", async (req, res) => {
    try {
        console.log(req.params.name)
      const directoryPath = __dirname + `/uploads/${req.params.name}`;
      fs.readFile(directoryPath, function (err, files) {
        if (err) {
          return console.error(err);
        }
        res.send(files); // Send the list of filenames as a JSON response
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});