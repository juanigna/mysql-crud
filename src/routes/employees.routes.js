import { Router } from "express";
import { getEmployees, createEmployee, deleteEmployee, updateEmployee, getEmployee } from "../controllers/employees.controller.js";


const router = Router();

router.get('/', getEmployees)

router.get('/:id', getEmployee)

router.post('/', createEmployee)

router.delete('/:id', deleteEmployee)

router.patch('/:id', updateEmployee)

export default router;