console.log('hello');
const a='hello'
const b=5

console.log(a+b);
// console.log(a-b);

const c:string='hello world'
console.log(c);


const d:number = 11;
console.log(d);



const e:boolean =true;
console.log(e);



const f:Array<number>=[1,2,3]
console.log(f);


const g:number[]=[1,2,3,4,5]
g.push(9)
// g.push('hello')
console.log(g);


const h:string[]=["hii",'hello','hey']
console.log(h);

const tuple:[number,string,number]=[1,"hii",2]
console.log(tuple);



const t2:[number,string]=[1,'hi']
console.log(t2);


const t3:[number,number,number]=[1,2,3]
console.log(t3);

function greet(name:string):void{
    console.log('hello '+name);
}
greet('doremon');



function sum(a:number,b:number):number{
    console.log(a+b);
    return a+b;
    
}

console.log(sum(2,3));


function hello(name:string):string{
  return "hello"+name
}

console.log(hello('doramon'));



function error():never{
    throw new Error('error hai bhai error');
}
// error()

type USER={name:string,age:Number,verify:boolean}

const user:USER={
    name:'test',
    age:22,
    verify:true
}

function greeto(data:USER):string{
    return data.name +" "+data.age+" "+data.verify
}
console.log(greeto(user));


let ab:any
ab='hello'
console.log(ab.toUpperCase());


let cd:unknown
cd="hellooooooo"

if((typeof cd)=='string'){
    console.log(cd.toUpperCase())
}

   


