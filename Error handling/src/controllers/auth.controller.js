export async function register(req,res,next){
  try {
    console.log(use);
    
  } catch (error) {
    error.status=400
    next(error)
  }
    
}