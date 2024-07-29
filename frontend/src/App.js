import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Checkbox, Grid, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5001/getTasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async () => {
        if (newTask.trim() === '') return;
        try {
            await axios.post('http://localhost:5001/addTask', { description: newTask });
            setNewTask('');
            fetchTasks();
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const updateTask = async (id, completed) => {
        try {
            await axios.put(`http://localhost:5001/updateTask/${id}`, { completed });
            fetchTasks();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/deleteTask/${id}`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
            <Paper style={{ padding: '1rem' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Todo List
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={9}>
                        <TextField
                            fullWidth
                            label="New Task"
                            variant="outlined"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" color="primary" onClick={addTask}>
                            Add
                        </Button>
                    </Grid>
                </Grid>
                <List>
                    {tasks.map((task) => (
                        <ListItem key={task.id} button onClick={() => updateTask(task.id, !task.completed)}>
                            <Checkbox
                                edge="start"
                                checked={task.completed}
                                tabIndex={-1}
                                disableRipple
                            />
                            <ListItemText primary={task.description} style={{ textDecoration: task.completed ? 'line-through' : 'none' }} />
                            <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(task.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default App;
