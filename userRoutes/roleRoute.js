const express = require('express');
const router = express.Router();
const Role = require('../models/Role');
const Joi = require('joi');

// Joi schema for role validation
const roleSchema = Joi.object({
    name: Joi.string().valid('Customer', 'Employee', 'Manager').required()
});

// Create a new role
router.post('/', async (req, res) => {
    const { error, value } = roleSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const { name } = value;
        let role = await Role.findOne({ name });

        if (role) {
            return res.status(400).json({ message: 'Role already exists' });
        }

        role = new Role({ name });
        await role.save();

        res.status(201).json({ message: 'Role created successfully', role });
    } catch (error) {
        console.error('Role Creation error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all roles
router.get('/', async (req, res) => {
    try {
        const roles = await Role.find({});
        res.status(200).json(roles);
    } catch (error) {
        console.error('Fetch Roles Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a role by ID
router.get('/:roleId', async (req, res) => {
    try {
        const role = await Role.findOne({ roleId: req.params.roleId });

        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        res.status(200).json(role);
    } catch (error) {
        console.error('Fetch Role Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a role by ID
router.put('/:roleId', async (req, res) => {
    const { error, value } = roleSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const role = await Role.findOneAndUpdate(
            { roleId: req.params.roleId },
            { name: value.name },
            { new: true, runValidators: true }
        );

        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        res.status(200).json({ message: 'Role updated successfully', role });
    } catch (error) {
        console.error('Update Role Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a role by ID
router.delete('/:roleId', async (req, res) => {
    try {
        const role = await Role.findOneAndDelete({ roleId: req.params.roleId });

        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        console.error('Delete Role Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
