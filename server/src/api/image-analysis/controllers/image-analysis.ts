import { Context } from "koa";
import { analyzeImage } from "../services/gemini";


export default {


 async analyze(ctx: Context) {
   
  console.log("FILES:", ctx.request.files);   // 👈 add this
  console.log("BODY:", ctx.request.body);     // 👈 add this

  let file: any = ctx.request.files?.image;

  if (Array.isArray(file)) {
    file = file[0];
  }

  console.log("FILE:", file);  // 👈 add this

  if (!file) {
    return ctx.badRequest("No image uploaded");
  }

  const filePath = file.path || file.filepath;

  console.log("PATH:", filePath); // 👈 add this

  if (!filePath) {
    return ctx.badRequest("File path not found");
  }

  try {
    const result = await analyzeImage(filePath);
    return ctx.send({ success: true, result });
  } catch (error: any) {
    ctx.internalServerError("Analysis failed", { error: error.message });
  }
}
    // async analyze(ctx: Context){
    
    //     const file = ctx.request.files?.image as any;
    //     if(!file) return ctx.badRequest('No image uploaded')
        
    //     const filePath = file.filePath;

    //     try {
    //         const result = await analyzeImage(filePath)
    //         return ctx.send({success: true, result})
    //     } catch (error) {
    //         ctx.internalServerError("Analysis failed", {error: error.message})
    //     }

    // }
}