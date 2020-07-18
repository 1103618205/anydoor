const path=require('path')
const mimeType={
    "js":"application/javascript",
    "css":'text/css',
    'html':'text/html',
}
module.exports.getMime=(filename)=>{
    let extname=path.extname(filename)
    .split('.')
    .pop()
    if(extname){
        return mimeType[extname]||'text/plain'
    }else{
        return 'text/plain'
    }
}