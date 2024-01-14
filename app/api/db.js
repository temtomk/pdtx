import { sql,db, createPool } from '@vercel/postgres';
// import { createKysely } from '@vercel/postgres-kysely'; 

// export function createTestTable() {
//   return sql`
//     CREATE TABLE IF NOT EXISTS Tests (
//       Address VARCHAR(255) PRIMARY KEY,
//       Token INT NOT NULL,
//       Txhash TEXT[] NOT NULL
//     );
//   `;
// }

// export function createMintingTable() {
//   return sql`
//   CREATE TABLE IF NOT EXISTS Mints (
//     Address VARCHAR(255) PRIMARY KEY,
//     Token INT NOT NULL,
//     Txhash TEXT[] NOT NULL
//   );
// `;
// }

export async function postMinting(tx) {
  return pool.sql`
    INSERT INTO Mints (Address, Token, Txhash)
    VALUES (${tx.address}, ${tx.token}, ${tx.txhash})
    ON CONFLICT (Address)
    DO UPDATE SET 
    Token = Mints.Token + 1000, 
    Txhash = array_append(Mints.Txhash, ${tx.txhash});
  `;
}

export async function getMintings() {
  const {rows} = await pool.sql`SELECT * FROM Mints;`;
  return rows;
}

export async function getMintingByAddress(address) {
  const {rows} = await pool.sql`SELECT * FROM Mints WHERE Address = ${address};`;
  return rows[0];
}
