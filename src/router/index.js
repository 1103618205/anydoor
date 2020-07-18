const chalk=require('chalk')
const handler=require('handlebars')
const fs=require('fs')
const promisify=require('util').promisify
const fileState=promisify(fs.stat)
const fileReaddir=promisify(fs.readdir)
const path=require('path')
const templatPath=path.join(__dirname,'../template/dirtemplate.hbs')
let srouce=fs.readFileSync(templatPath)
const tempalte=handler.compile(srouce.toString())
const {getMime}=require('./mime')
const {Compress}=require('./../helper/compress')
const {Cache}=require('./../helper/caches')
module.exports.routers=async (req,res,filePath)=>{
        try{
            let state=await fileState(filePath)
            if(Cache(req,res,state)){
                res.statusCode=304;
                console.log("我进来了")
                res.end();
                return;
            }
            if(state.isFile()){
                res.statusCode=200
                res.setHeader('Content-Type',getMime(filePath))
                let rz=fs.createReadStream(filePath)
                if(filePath.match(this.config.compress)){
                    rz=Compress(rz,res,req)
                }
                rz.pipe(res) 
            }else if(state.isDirectory()){
                let data=await fileReaddir(filePath)
                let dir=path.relative(process.cwd()+"/src",filePath)
                console.log(dir)
                let list={
                    title:path.basename(filePath),
                    dir:dir?`/${dir}`:'',
                    list:data
                }
                
                res.statusCode=200
                res.setHeader('Content-Type','text/html')
                res.end(tempalte(list))
               
            }
        }catch(e){
            res.statusCode=404
            res.setHeader('Content-Type','text/html')
            res.end("<h1>NOT FOUND</h1>")
            return 
        }
}