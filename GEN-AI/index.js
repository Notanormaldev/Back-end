import readline from 'readline';


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("what is your name:",(name)=>{
    console.log(`hello ${name}!`);
    rl.close()
})