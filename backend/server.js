import app from './app.js';

const port = process.env.PORT || 3000; // Fallback to port 3000 if process.env.PORT is not set

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
