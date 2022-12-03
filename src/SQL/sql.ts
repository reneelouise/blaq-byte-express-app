const createDatabase = `CREATE TABLE blaqbyte_members (
   id SERIAL PRIMARY KEY,
   full_name VARCHAR(50) NOT NULL,
   email_address VARCHAR(255) NOT NULL
)`;

export const createSubscriptionMember = `
INSERT INTO blaqbyte_members
(full_name,email_address)
VALUES ($1, $2)
RETURNING *`;
