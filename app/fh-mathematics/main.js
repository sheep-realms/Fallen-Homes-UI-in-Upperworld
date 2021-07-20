var infoMathematics = {
    name: "Mathematics",
    version: "1.0",
    author: "Sheep-realms",
    license: "GPL 2.0",
    description: "数学工具包",
    config: {
        
    }
}

fh.pushAPP(infoMathematics);

function limitAngle(angle, maxAngle=360, minAngle=0) {
    if (angle > maxAngle) return maxAngle;
    if (angle < minAngle) return minAngle;
    return angle;
}