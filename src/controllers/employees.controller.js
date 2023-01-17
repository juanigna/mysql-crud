import { pool } from "../db.js"

export const getEmployees = async (req, res) => {
    try{
        const [rows] = await pool.query('SELECT * FROM employee');
        res.json(rows);
    }catch (e){
        res.json({"error": e.message});
    }
}

export const createEmployee = async (req, res) => {
    try{
        const {name, salary} = req.body;
        const [rows] = await pool.query('INSERT INTO employee (name, salary) VALUES (?, ?)', [name, salary])
        console.log(rows)
        res.send({
            id: rows.insertId,
            name,
            salary,
        });
    }catch(err){
        res.json({"error": err.message})
    }
}


export const getEmployee = async (req, res) => {
    try{
        const {id} = req.params;
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])
        if(rows.length === 0){
            res.status(404).json({"error": "There is no employee with the id provided"});
            return;
        }
        res.json({
            "employee": rows[0]
        })
    }catch(err){
        res.json({"error": err.message})
    }

}

export const deleteEmployee = async (req, res) => {
    try{    
        const [result] = await pool.query('DELETE FROM employee WHERE id = ?', req.params.id);
        console.log(result);
        if(result.affectedRows <= 0){
            return res.status(404).json({"error": "Employee not found"})
        }
        res.status(200).json({
            "message": "Employee deleted"
        })
    }catch(err){
        res.status(404).json({"error": err.message});
    }
}

export const updateEmployee = async (req, res) => {
    try{
        const {id} = req.params;
        const {name, salary} = req.body;

        const [result] = await pool.query('UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?',[name, salary, id])
        if(result.affectedRows <= 0){
            return res.status(404).json({"error": "Employee not found"})
        }
        res.status(200).json({
            "message":"Employee updated!"
        })
    }catch(err){
        res.status(404).json({"error": err.message});
    }
}