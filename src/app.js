const http=require('http')
const chalk=require('chalk')
const path=require('path')
// const defulConfi=require('./config/config')
const {routers}=require('./router/index')
const openUrl=require('./helper/openUrl')
class Server{
    constructor(conf){
        this.config=Object.assign({},conf)
    }
    start(){
        let _this=this
        const server=http.createServer((req , res)=>{
            let filePath=path.join(__dirname,req.url)
            if(req.url!=='favicon.ico'){
                routers.call(_this,req,res,filePath)
            }
            
           
            
        })
        server.listen(this.config.port,this.config.hostName,()=>{
            console.log(`http://${this.config.hostName}:${this.config.port}`)
            console.log(this.config.paths);
            openUrl(`http://${this.config.hostName}:${this.config.port}`)
        })
    }
}
module.exports.Server=Server