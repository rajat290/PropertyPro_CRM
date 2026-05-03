import pool from '../config/db.js';

//ownership check query

export const getPropertyOwner = async (propertyId) => {
//asking agent only ageent_id to check security

const result = await pool.query(
    'SELECT agent_id FROM properties WHERE id = $1',
    [propertyId]
);
    return result.rows[0]; // Sirf pehla result bhejo (ya undefined agar nahi mila)
};

//find all properties of an agent

export const findPropertiesByAgentId = async (agentId) => {
    const result = await pool.query(
        'SELECT * FROM properties WHERE agent_id = $1',
        [agentId]
    );
    return result.rows;
};