import { SecretVaultWrapper } from "nillion-sv-wrappers";
import { orgConfig } from "./nillionOrgConfig.js";

// Testing Schema_ID
// const SCHEMA_ID = "6c646572-6b55-4f09-a0e6-7dd8d0b95134";
// YAAA URL Schema_ID
const SCHEMA_ID = "24f23de0-ce15-4006-b790-31df0377e830";

const data = [
  {
    user_wallet_id: { "0x" }, // user_ID
    url_scraped: { $allot:  }, // encrypted URL
    responses: [
      { url_scraped: { $allot: "https://yaaa.com" }},
      { url_scraped: { $allot: "https://yahoo.com" }}
    ], 
  },
];

async function main() {
  try {
    // Create a secret vault wrapper and initialize the SecretVault collection to use
    const collection = new SecretVaultWrapper(
      orgConfig.nodes,
      orgConfig.orgCredentials,
      SCHEMA_ID
    );
    await collection.init();

    // //WRITE
    // // Write collection data to nodes encrypting the specified fields ahead of time
    // const dataWritten = await collection.writeToNodes(data);
    // console.log(
    //   "👀 Data written to nodes:",
    //   JSON.stringify(dataWritten, null, 2)
    // );

    // // Get the ids of the SecretVault records created
    // const newIds = [
    //   ...new Set(dataWritten.map((item) => item.result.data.created).flat()),
    // ];
    // console.log("uploaded record ids:", newIds);
    // // WRITE

    // READ: Read all collection data from the nodes, decrypting the specified fields
    const decryptedCollectionData = await collection.readFromNodes({});

    // Log first 5 records
    console.log(
      "Most recent records",
      decryptedCollectionData
    );
    // READ
  } catch (error) {
    console.error("❌ SecretVaultWrapper error:", error.message);
    process.exit(1);
  }
}

main();