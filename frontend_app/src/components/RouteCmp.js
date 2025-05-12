import React, { useEffect } from "react";
import * as turf from "@turf/turf"

const RouteCmp=(one,two)=>{
useEffect(()=>{
    const r1=turf.lineString(one)
    const r2=turf.lineString(two)

    const d1=turf.length(r1,{units:"kilometers"})
    const d2=turf.length(r2,{units:"kilometers"})
    const sim=Math.abs(d1-d2)<5 //5km

    if(sim){
        return  true
    }
    return false
})


}

export default RouteCmp