const mysql = require("./index");


const process = async ()=> {

  const con = mysql.createConnection({
    "host": "localhost",
    "user": "root",
    "password": "226Surette",
    "database": "cora_api",
  });

  await con.beginTransactionP();
  console.log("Transaction started.");

  let users = await con.queryP("SELECT * FROM users");
  if (!users) throw new Error("Users not found");
  users = users[0];

  try {

    await con.commitP();
    console.log("Migration Complete!");
  } catch (err) {
    console.error("Migration Error: ", err);
    await con.rollbackP();
  }

}

process().then(()=>{
  console.log("done")
}).catch(err => {
  console.error(err)
});
