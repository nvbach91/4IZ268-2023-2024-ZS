import express from 'express';
import cors from 'cors';
import { TodoistApi } from "@doist/todoist-api-typescript";
const app = express();
const PORT = process.env.PORT || 443;
app.use(express.json());
app.use(cors());
app.use(express.static('public')); 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const api = new TodoistApi("1191db6d76082d2f8ac72f67f8b29e95c01175cc"); 
app.post('/addTask', async (req, res) => {
    try {
       
        const { content } = req.body;
        const response = await api.addTask({ content });
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.delete('/deleteTask/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params; 
        const response = await api.deleteTask(taskId); 
        res.status(200).json({ success: true, response: response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

