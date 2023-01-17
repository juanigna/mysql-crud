import express from 'express';
import { PORT } from './config.js';
import employeesRouter from "./routes/employees.routes.js";

const app = express();

// Middlewares
app.use(express.json());

// Setting port
app.set('port', PORT);

// Routes
app.use('/api/employees', employeesRouter);

app.use((req, res, next) => {
    res.status(404).json({
        message: "endpoint not found"
    })
})

// Starting server
app.listen(app.get('port'), () => {
    console.log('Server listening on port ' + app.get('port'))
});