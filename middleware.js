import { NextResponse } from "next/server";

// Array to compare value of urls later to protect all at the same time (indexOf() on array, if is if 0 or lager it means it is in the array )
// const protectedRoutes = [
//       "http://localhost:3000/dashboard",
//       "http://localhost:3000/chats",
//       "http://localhost:3000/profile"
// ]

export default function middleware(req){
      let verify = req.cookies.get("loggedIn")
      let url = req.url
      if(!verify && url.includes("/dashboard")){
            return NextResponse.redirect("http://localhost:3000/")
      }
      else if(verify && url === "http://localhost:3000/" || url === "http://localhost:3000/signup"){
            return NextResponse.redirect("http://localhost:3000/dashboard")
      }
} 
